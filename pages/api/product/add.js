import excuteQuery from '../db'
import sleep from 'sleep-promise';
import { publishToShopify } from '../import';

const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

function getUrl(asin) {
  return 'https://api.keepa.com/product?key=' + process.env.KEEPA_API_TOKEN + '&domain=1&asin=' + asin + '&stats=1&rating=1&days=1'
}

async function getProductFromKeepa(asin) {      
  try{
    const response = await fetch(getUrl(asin))
    const json = await response.json()
    console.log("tokens left =", json.tokensLeft)
    if(json.tokensLeft <= 0){
      console.log("wait 1 min")
      await sleep(60000)
    }

    return json.products[0]
  } catch(e) {
    console.log('keepa fetch error =', e.message)
    return null
  }
}

async function checkProduct(asin) {
  const products = await excuteQuery({
    query: 'SELECT * FROM products WHERE asin = ?',
    values: [asin],
  });

  const variants = await excuteQuery({
    query: 'SELECT * FROM variants WHERE sku = ?',
    values: [asin],
  });

  if(products.length > 0 || variants.length > 0)
    return true

  return false
}

async function checkCancel(id) {
  const historyObj = await excuteQuery({
    query: 'SELECT * FROM history WHERE id = ?',
    values: [id]
  });

  console.log("-------------------------history id =", id)
  console.log("-------------------------history status =", historyObj[0].status)
  return historyObj[0].status == 2
}

function getBuyBoxPrice(arrPrice) {
  let buyBoxPrice = 0
  for (let i = 0; i < arrPrice.length; i++) {
    if (arrPrice[i] > -1) {
      buyBoxPrice = arrPrice[i] / 100
      break
    }
  }

  return buyBoxPrice
}

function mili2Inch(value) {
  return 0.0393701 * value
}

function gram2Lb(value) {
  return value < 0? 0: 0.00220462 * value
}

// function getVariant(variant, image, options, attributes, fee, unitCost, minOrder, totalQty) {
//   console.log('getVariant')
//   let buyBoxPrice = getBuyBoxPrice(variant.stats.current)
//   let pickAndPackFee = variant.fbaFees? variant.fbaFees.pickAndPackFee / 100: 0
//   let netProfitPerUnit = buyBoxPrice - buyBoxPrice * fee / 100 - unitCost
//   let netProceeds = buyBoxPrice  - buyBoxPrice * fee / 100 - pickAndPackFee
//   let dealProfit = netProfitPerUnit * totalQty;

//   return {
//     "title": variant.title,
//     "description": variant.description,
//     "features": variant.features,
//     "image": image,
//     "sku": variant.asin,
//     "option1_name": options[0].name, 
//     "option1_value": attributes[0].value, 
//     "option2_name": options.length > 1? options[1].name: '',
//     "option2_value": options.length > 1? attributes[1].value: '',
//     "barcode": getBarcode(variant),
//     "availabilityAmazon": variant.availabilityAmazon,
//     "height": mili2Inch(variant.itemHeight),
//     "width": mili2Inch(variant.itemWidth),
//     "length": mili2Inch(variant.itemLength),
//     "weight": gram2Lb(variant.itemWeight),    
//     "rating": getRating(variant),
//     "reviewCount": getReviewCount(variant),
//     "buyBoxPrice": buyBoxPrice,
//     "pickAndPackFee": pickAndPackFee,
//     "fee": fee,
//     "netProfitPerUnit": netProfitPerUnit,
//     "netProfitPerUnitPercent": netProfitPerUnit*100/buyBoxPrice,
//     "netProceeds": netProceeds,
//     "dealProfit": dealProfit,
//     "unitCost": unitCost,
//     "minOrder": minOrder,
//     "totalQty": totalQty
//   }
// }

function getTotalProfit(buyBoxPrice, profit, profitAmount) {
  return profitAmount + buyBoxPrice * profit / 100
}

function getSellPrice(buyBoxPrice, fee, totalProfit) {
  return buyBoxPrice + buyBoxPrice * fee / 100 + totalProfit
}

function getVariant(variant, image, options, attributes, profit, profitAmount, fee) {

  let buyBoxPrice = getBuyBoxPrice(variant.stats.current)
  let totalProfit = getTotalProfit(buyBoxPrice, profit, profitAmount)
  let price = getSellPrice(buyBoxPrice, fee, totalProfit)

  return {
    "title": variant.title,
    "description": variant.description,
    "features": variant.features,
    "image": image,
    "sku": variant.asin,
    "option1_name": options[0].name, 
    "option1_value": attributes[0].value, 
    "option2_name": options.length > 1? options[1].name: '',
    "option2_value": options.length > 1? attributes[1].value: '',
    "barcode": getBarcode(variant),
    "price": price,
    "availabilityAmazon": variant.availabilityAmazon,
    "buyBoxPrice": buyBoxPrice,
    "height": mili2Inch(variant.itemHeight),
    "width": mili2Inch(variant.itemWidth),
    "length": mili2Inch(variant.itemLength),
    "weight": gram2Lb(variant.itemWeight),
    "profit": profit,
    "profitAmount": profitAmount,
    "totalProfit": totalProfit,
    "fee": fee                
  }
}

function getBarcode(product) {
  return product.eanList && product.eanList.length > 0 ? product.eanList[0]: ''
}

function getTags(product) {
  let tags = []      

  tags.push(product.productGroup)
  product.categoryTree && product.categoryTree.forEach(category => {
    if(!tags.includes(category.name))
      tags.push(category.name)
  })   

  return tags
}

function getRating(product) {
  return product.csv[16]? product.csv[16][1] / 10: 0
}

function getReviewCount(product) {
  return product.csv[17]? product.csv[17][1]: 0
}

function getDescription(product) {
  let description = '';

  if(product.features) {
    description += "<ul>";
    product.features.map(element => {
      description += "<li>" + element + "</li>"
    })
    description += "</ul>"  
  }
  description += product.description  

  return description
}

async function updateHistoryItem(historyId, asin, status) {
  await excuteQuery({
    query: "UPDATE history_items SET status = ? WHERE id = ? AND asin=?",
    values: [status, historyId, asin]
  });
}

let running = false

export default async function handler(req, res) {
  const { uploadVariations, ids, action } = req.body
  
  if(!running) {
    running = true

    const stores = await excuteQuery({
      query: 'SELECT * FROM stores WHERE status = 1',
      values: []
    });

    const settingObj = await excuteQuery({
      query: 'SELECT * FROM settings',
      values: [],
    });

    let fee = settingObj[0].fee
    let profit = settingObj[0].profit
    let profitAmount = settingObj[0].profitAmount
    
    const historyObj = await excuteQuery({
      query: 'INSERT INTO history (upload_time, action) VALUES (?, ?)',
      values: [new Date(), action]
    });
  
    let historyItemArr = []
    for(const id of ids)
      historyItemArr.push(`(${historyObj.insertId},'${id.ASIN}', 0)`)     
  
    await excuteQuery({
      query: 'INSERT INTO history_items (history_id, asin, status) VALUES ' + historyItemArr.join(),
      values: []
    });  
  
    console.log('===product add start===')  
    let productDBIds = []

    for(let i = 0; i < ids.length; i++) { 
      const isCancel = await checkCancel(historyObj.insertId)
      console.log('isCancel =', isCancel)
      if(isCancel) {
        running = false
        break
      }

      const id = ids[i]
      console.log('add index =', i)
      console.log('add asin =', id.ASIN)

      const isExist = await checkProduct(id.ASIN)
      if(isExist) {
        console.log('already exist')
        await updateHistoryItem(historyObj.insertId, id.ASIN, 2)
        continue;
      }
  
      const productData = await getProductFromKeepa(id.ASIN)
      if(productData) {
        let variants = []
        let images = []
        let options = []

        if(settingObj[0].upload_first_image_only == 1) {
          const imagesCSV = productData.imagesCSV.split(',')
          images.push(imagesCSV[0]);
        } else {          
          images.push.apply(images, productData.imagesCSV.split(','));
        }          

        console.log("images =", images)
        
        if(productData.variations) {
          if(uploadVariations == 1) { // All Variation Upload
            let optionValues1 = []
            let optionValues2 = []        
            for(const variation of productData.variations) {
              const isExist = await checkProduct(variation.asin)
              if(isExist){
                console.log('already exist1')
                await updateHistoryItem(historyObj.insertId, variation.asin, 2)
                continue;
              }
  
              if(!optionValues1.includes(variation.attributes[0].value))
                optionValues1.push(variation.attributes[0].value)
      
              if(variation.attributes.length > 1 && !optionValues2.includes(variation.attributes[1].value))
                optionValues2.push(variation.attributes[1].value)          
            }
      
            options.push({
              "name": productData.variations[0].attributes[0].dimension,
              "values": optionValues1.join()
            })
      
            if(productData.variations[0].attributes.length > 1){
              options.push({
                "name": productData.variations[0].attributes[1].dimension,
                "values": optionValues2.join()
              })  
            }
            
            for(const variation of productData.variations) {
              const isExist = await checkProduct(variation.asin)
              if(isExist) {
                console.log('already exist2')
                await updateHistoryItem(historyObj.insertId, variation.asin, 2)
                continue;
              }
  
              const variantData = await getProductFromKeepa(variation.asin)
              if(variantData){

                let image = null
                if(variantData.imagesCSV) {
                  image = variantData.imagesCSV.split(',')[0]
      
                  if(!images.includes(image))
                    images.push(image)  
                }
  
                variants.push(getVariant(variantData, image, options, variation.attributes, profit, profitAmount, fee))
                //await sleep(3000);
              }
            }
          } else {
            const variationFoundObj = productData.variations.find(variation => variation.asin == id.ASIN)
            if(variationFoundObj) {
              console.log('variation found =', productData.variations[0].asin)            
              options.push({
                "name": variationFoundObj.attributes[0].dimension,
                "values": variationFoundObj.attributes[0].value
              })
          
              if(variationFoundObj.attributes.length > 1) {
                options.push({
                  "name": variationFoundObj.attributes[1].dimension,
                  "values": variationFoundObj.attributes[1].value
                })  
              }
                
              const image = productData.imagesCSV.split(',')[0]      
              if(!images.includes(image))
                images.push(image)
  
              variants.push(getVariant(productData, image, options, variationFoundObj.attributes, profit, profitAmount, fee))      
            } else {
              console.log('variation not found =', productData.variations[0].asin)              
              const variantData = await getProductFromKeepa(productData.variations[0].asin)
              if(variantData){
                options.push({
                  "name": variantData.variations[0].attributes[0].dimension,
                  "values": variantData.variations[0].attributes[0].value
                })
          
                if(variantData.variations[0].attributes.length > 1) {
                  options.push({
                    "name": variantData.variations[0].attributes[1].dimension,
                    "values": variantData.variations[0].attributes[1].value
                  }) 
                }
                
                const image = variantData.imagesCSV.split(',')[0]
                if(!images.includes(image))
                  images.push(image)
                    
                console.log('process 2')
                variants.push(getVariant(variantData, image, options, variantData.variations[0].attributes, profit, profitAmount, fee))
                //await sleep(3000);
                console.log('process 3')
              }
            }          
          } 
        }           
              
        console.log('variant size =', variants.length)
        let tags = getTags(productData)
        let result = null;

        if(variants.length > 0) {
          const payload = [
            stores[0].id,
            variants[0].title, 
            tags.join(),     
            'Cheapest with tracking',
            'United States',
            'New York',
            productData.brand, 
            getDescription(variants[0]),           
            images.join(), 
            0, 
            new Date(), 
            productData.asin, 
          ]

          result = await excuteQuery({
            query: 'INSERT INTO products (store_id, title, tags, shipping_method, country, city, brand, description, images, status, upload_time, asin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: payload
          });

          let variantValues = []
          for(const variant of variants){
            variantValues.push(
              `(${result.insertId},'${variant.title}','${variant.sku}','${variant.image}','${variant.option1_name}','${variant.option1_value}',` +
              `'${variant.option2_name}','${variant.option2_value}','${variant.barcode}',${variant.availabilityAmazon},` + 
              `${variant.height},${variant.width},${variant.length},${variant.weight},` + 
              `${variant.buyBoxPrice},${variant.profit},${variant.profitAmount},${variant.totalProfit},${variant.fee}, ${variant.price})`)
          }      

          await excuteQuery({
            query: 'INSERT INTO variants (product_id, title, sku, image, option1_name, option1_value, option2_name, option2_value, barcode, availabilityAmazon, height, width, length, weight, buyBoxPrice, profit, profitAmount, totalProfit, fee, price) VALUES ' + variantValues.join(),
            values: [],
          });
        } else {
          let buyBoxPrice = getBuyBoxPrice(productData.stats.current) 
          let totalProfit = getTotalProfit(buyBoxPrice, profit, profitAmount)
          let price = getSellPrice(buyBoxPrice, fee, totalProfit)

          const payload = [
            stores[0].id,
            productData.title, 
            tags.join(),     
            'Cheapest with tracking',
            'United States',
            'New York',
            productData.brand, 
            getDescription(productData),           
            images.join(), 
            0, 
            new Date(), 
            productData.asin, 
            getBarcode(productData),
            buyBoxPrice,
            profit,
            profitAmount,
            fee,
            price
          ]

          result = await excuteQuery({
            query: `INSERT INTO products (store_id, title, tags, shipping_method, country, city, brand, description, images, status, upload_time, asin, barcode, buyBoxPrice, profit, profitAmount, fee, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            values: payload
          });
        }
        
        productDBIds.push(result.insertId)
        let optionValues = []    
        for(const option of options)
          optionValues.push(`(${result.insertId},'${option.name}','${option.values}')`)
  
        await excuteQuery({
          query: 'INSERT INTO options (product_id, name, value) VALUES ' + optionValues.join(),
          values: [],
        });
        
        await excuteQuery({
          query: "UPDATE history_items SET status = 1, title=?, image=? WHERE asin = '" + id.ASIN + "'",
          values: [productData.title, images[0]]
        });
        //await sleep(3000);
      }
    }
  
    if(action == 1) {      
      await publishToShopify(productDBIds)
    }

    await excuteQuery({
      query: "UPDATE history SET status = 1 WHERE id = ?",
      values: [historyObj.insertId]
    });

    running = false
  }
  
  const drafts = await excuteQuery({
    query: 'SELECT * FROM products WHERE status = 0 ORDER BY id DESC',
    values: [],
  });

  for(const draft of drafts){
    const variants = await excuteQuery({
        query: 'SELECT * FROM variants WHERE variants.product_id = ? ORDER BY id ASC',
        values: [draft.id],
    });
    draft['variants'] = variants       
  }

  const draftIds = await excuteQuery({
    query: 'SELECT id FROM products WHERE status = 0',
    values: [],
  });

  const productIds = await excuteQuery({
      query: 'SELECT id FROM products WHERE status = 1',
      values: [],
  });

  console.log('===product add end===')

  res.status(200).json({
    products: drafts, 
    draftIds,
    productIds
  })
}
