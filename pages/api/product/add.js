import excuteQuery from '../db'
import sleep from 'sleep-promise';

const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

function getUrl(asin) {
  console.log('request call url')
  return 'https://api.keepa.com/product?key=' + process.env.KEEPA_API_TOKEN + '&domain=1&asin=' + asin + '&stats=1'
}

async function checkProduct(asin) {
  const AlreadyProductObj = await excuteQuery({
    query: 'SELECT * FROM products WHERE asin = ?',
    values: [asin],
  });

  const AlreadyVariantObj = await excuteQuery({
    query: 'SELECT * FROM variants WHERE sku = ?',
    values: [asin],
  });

  if(AlreadyProductObj.length > 0 || AlreadyVariantObj.length > 0) {    
    return true
  }

  return false
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

function getTotalProfit(buyBoxPrice, profit, profitAmount) {
  return profitAmount + buyBoxPrice * profit / 100
}

function getSellPrice(buyBoxPrice, fee, totalProfit) {
  return buyBoxPrice + buyBoxPrice * fee / 100 + totalProfit
}

function mili2Inch(value) {
  return 0.0393701 * value
}

function gram2Lb(value) {
  return value < 0? 0: 0.00220462 * value
}

export default async function handler(req, res) {

  const { uploadVariations, ids, action } = req.body
  const settingObj = await excuteQuery({
    query: 'SELECT * FROM settings',
    values: [],
  });
  let fee = settingObj[0].fee
  let profit = settingObj[0].profit
  let profitAmount = settingObj[0].profitAmount

  // const historyObj = await excuteQuery({
  //   query: 'INSERT INTO history (upload_time, action) VALUES (?, ?)',
  //   values: [new Date(), action]
  // });

  // let historyItemArr = []
  // for(const id of ids)
  //   historyItemArr.push(`(${historyObj.insertId},'${id}', 0)`)     

  // await excuteQuery({
  //   query: 'INSERT INTO history_items (history_id, asin, status) VALUES ' + historyItemArr.join(),
  //   values: []
  // });  

  console.log('===product add start===')   
  for(let i = 0; i < ids.length; i++) { 
    const id = ids[i]
    console.log('add index =', i)
    console.log('add asin =', id)
    
    const isExist = await checkProduct(id)
    if(isExist) {
      console.log('already exist')
      // ids.splice(i, 1);
      // await excuteQuery({
      //   query: "UPDATE history_items SET status = 2 WHERE id = ? AND asin=?",
      //   values: [historyObj.insertId, id]
      // });
      continue;
    }

    const response = await fetch(getUrl(id))
    
    try{
      const json = await response.json();      
      const productData = json.products[0]
      let variantArr = []
      let optionArr = []
      let option1Arr = []
      let option2Arr = []
      let imgArr = null

      if(settingObj[0].upload_first_image_only == 1)
        imgArr = [productData.imagesCSV.split(',')[0]]
      else
        imgArr = productData.imagesCSV.split(',')

      if(productData.variations) {
        if(uploadVariations == 1) {
          console.log('old variant size =', productData.variations.length)
          for(const element of productData.variations) {
            const isExist = await checkProduct(element.asin)
            if(isExist){
              console.log('already exist1')
              continue;
            }

            if(!option1Arr.includes(element.attributes[0].value))
              option1Arr.push(element.attributes[0].value)
    
            if(element.attributes.length > 1) {
              if(!option2Arr.includes(element.attributes[1].value))
                option2Arr.push(element.attributes[1].value)          
            }
          }
    
          optionArr.push({
            "name": productData.variations[0].attributes[0].dimension,
            "values": option1Arr.join()
          })
    
          if(productData.variations[0].attributes.length > 1){
            optionArr.push({
              "name": productData.variations[0].attributes[1].dimension,
              "values": option2Arr.join()
            })  
          }
          
          for(const element of productData.variations) {
            const isExist = await checkProduct(element.asin)
            if(isExist) {
              console.log('already exist1')
              continue;
            }

            const response1 = await fetch(getUrl(element.asin))
            
            try {
              const json1 = await response1.json();
              const variantData = json1.products[0]
              const image = variantData.imagesCSV.split(',')[0]
    
              if(!imgArr.includes(image))
                imgArr.push(image)

              let buyBoxPrice = getBuyBoxPrice(variantData.stats.current)    
              let totalProfit = getTotalProfit(buyBoxPrice, profit, profitAmount)
              let price = getSellPrice(buyBoxPrice, fee, totalProfit)
              
              variantArr.push({
                "title": variantData.title,
                "image": image,
                "sku": variantData.asin,
                "option1_name": optionArr[0].name, 
                "option1_value": element.attributes[0].value, 
                "option2_name": optionArr.length > 1? optionArr[1].name: '',
                "option2_value": optionArr.length > 1? element.attributes[1].value: '',
                "barcode": variantData.eanList && variantData.eanList.length > 0 ? variantData.eanList[0]: '',
                "price": price,
                "availabilityAmazon": variantData.availabilityAmazon,
                "buyBoxPrice": buyBoxPrice,
                "height": mili2Inch(variantData.itemHeight),
                "width": mili2Inch(variantData.itemWidth),
                "length": mili2Inch(variantData.itemLength),
                "weight": gram2Lb(variantData.itemWeight),
                "profit": profit,
                "profitAmount": profitAmount,
                "totalProfit": totalProfit,
                "fee": fee,
              })       
              
              //await sleep(3000);
            } catch (e) {
              console.log(e.message)
            }
          }
        } else {
          const variationFoundObj = productData.variations.find(element => element.asin == id)
          if(variationFoundObj) {
            option1Arr.push(variationFoundObj.attributes[0].value)
        
            if(variationFoundObj.attributes.length > 1)
              option2Arr.push(variationFoundObj.attributes[1].value)          
  
            optionArr.push({
              "name": productData.variations[0].attributes[0].dimension,
              "values": option1Arr.join()
            })
      
            if(productData.variations[0].attributes.length > 1){
              optionArr.push({
                "name": productData.variations[0].attributes[1].dimension,
                "values": option2Arr.join()
              })  
            }
  
            let buyBoxPrice = getBuyBoxPrice(productData.stats.current)
            let totalProfit = getTotalProfit(buyBoxPrice, profit, profitAmount)
            let price = getSellPrice(buyBoxPrice, fee, totalProfit)

            const image = productData.imagesCSV.split(',')[0]
    
            if(!imgArr.includes(image))
              imgArr.push(image)

            variantArr.push({
              "title": productData.title,
              "image": imgArr[0],
              "sku": productData.asin,
              "option1_name": optionArr[0].name, 
              "option1_value": variationFoundObj.attributes[0].value, 
              "option2_name": optionArr.length > 1? optionArr[1].name: '',
              "option2_value": optionArr.length > 1? variationFoundObj.attributes[1].value: '',
              "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: '',
              "price": price,
              "availabilityAmazon": productData.availabilityAmazon,
              "buyBoxPrice": buyBoxPrice,
              "height": mili2Inch(productData.itemHeight),
              "width": mili2Inch(productData.itemWidth),
              "length": mili2Inch(productData.itemLength),
              "weight": gram2Lb(productData.itemWeight),
              "profit": profit,
              "profitAmount": profitAmount,
              "totalProfit": totalProfit,
              "fee": fee,                
            })
                       
          } else {
            console.log('variation not found =', productData.variations[0].asin)
            const response2 = await fetch(getUrl(productData.variations[0].asin))

            try {
              const json2 = await response2.json();
              const variantData = json2.products[0]

              option1Arr.push(productData.variations[0].attributes[0].value)
        
              if(productData.variations[0].attributes.length > 1)
                option2Arr.push(productData.variations[0].attributes[1].value)          
    
              optionArr.push({
                "name": productData.variations[0].attributes[0].dimension,
                "values": option1Arr.join()
              })
              console.log('process 1')
              if(productData.variations[0].attributes.length > 1){
                optionArr.push({
                  "name": productData.variations[0].attributes[1].dimension,
                  "values": option2Arr.join()
                })  
              }
    
              let buyBoxPrice = getBuyBoxPrice(variantData.stats.current) 
              let totalProfit = getTotalProfit(buyBoxPrice, profit, profitAmount)
              let price = getSellPrice(buyBoxPrice, fee, totalProfit)

              const image = variantData.imagesCSV.split(',')[0]
    
              if(!imgArr.includes(image))
                imgArr.push(image)

              console.log('process 2')
              variantArr.push({
                "title": variantData.title,
                "image": imgArr[0],
                "sku": variantData.asin,
                "option1_name": optionArr[0].name, 
                "option1_value": productData.variations[0].attributes[0].value, 
                "option2_name": optionArr.length > 1? optionArr[1].name: '',
                "option2_value": optionArr.length > 1? productData.variations[0].attributes[1].value: '',
                "barcode": variantData.eanList && variantData.eanList.length > 0 ? variantData.eanList[0]: '',
                "price": price,
                "availabilityAmazon": variantData.availabilityAmazon,
                "buyBoxPrice": buyBoxPrice,
                "height": mili2Inch(variantData.itemHeight),
                "width": mili2Inch(variantData.itemWidth),
                "length": mili2Inch(variantData.itemLength),
                "weight": gram2Lb(variantData.itemWeight),
                "profit": profit,
                "profitAmount": profitAmount,
                "totalProfit": totalProfit,
                "fee": fee,                
              })
              //await sleep(3000);
              console.log('process 3')
            } catch (e) {
              console.log(e.message)
            }              
          }          
        } 
      }           
            
      console.log('variant size =', variantArr.length)

      let tagArr = [productData.productGroup]      
      productData.categoryTree && productData.categoryTree.forEach(category => {
        if(!tagArr.includes(category.name))
          tagArr.push(category.name)
      });      
    
      let description = '';
      if(productData.features) {
        description += "<ul>";
        productData.features.map(element => {
          description += "<li>" + element + "</li>"
        })
        description += "</ul>"  
      }
      description += productData.description

      const result = await excuteQuery({
        query: `INSERT INTO products (title, tags, shipping_method, country, city, brand, description, images, status, upload_time, asin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values: [
          productData.title, 
          tagArr.join(),     
          'Cheapest with tracking',
          'United States',
          'New York',
          productData.brand, 
          description,           
          imgArr.join(), 
          0, 
          new Date(), 
          productData.asin, 
        ]
      });
      
      let optionValues = []    
      for(const option of optionArr){
        optionValues.push(`(${result.insertId},'${option.name}','${option.values}')`)
      }      

      await excuteQuery({
        query: 'INSERT INTO options (product_id, name, value) VALUES ' + optionValues.join(),
        values: [],
      });
      
      let variantValues = []
      for(const variant of variantArr){
        variantValues.push(
          `(${result.insertId},'${variant.title}','${variant.sku}','${variant.image}','${variant.option1_name}','${variant.option1_value}',` +
          `'${variant.option2_name}','${variant.option2_value}','${variant.barcode}',${variant.price},${variant.availabilityAmazon},` + 
          `${variant.buyBoxPrice},${variant.height},${variant.width},${variant.length},${variant.weight},${variant.profit},` + 
          `${variant.profitAmount},${variant.totalProfit},${variant.fee})`)
      }      

      await excuteQuery({
        query: 'INSERT INTO variants (product_id, title, sku, image, option1_name, option1_value, option2_name, option2_value, barcode, price, availabilityAmazon, buyBoxPrice, height, width, length, weight, profit, profitAmount, totalProfit, fee) VALUES '
          + variantValues.join(),
        values: [],
      });
    
      // await excuteQuery({
      //   query: "UPDATE history_items SET status = 1, title=?, image=? WHERE asin = '" + id + "'",
      //   values: [productData.title, imgArr[0]]
      // });

      //await sleep(3000);
    } catch(e) {
      console.log(e.message)
      res.status(500).json(e)
    }    
  }

  if(action == 1) {
    const products = await excuteQuery({
      query: 'SELECT * FROM products WHERE asin IN (?)',
      values: [ids],
    });

    for(const product of products) {     
      const option_arr = await excuteQuery({
        query: 'SELECT name, value FROM options WHERE product_id = ?',
        values: [product.id],
      });

      let optionArr = []
      option_arr.forEach(item => {
        optionArr.push({
          name: item.name,
          values: item.value
        })
      })

      const variant_arr = await excuteQuery({
        query: 'SELECT * FROM variants WHERE product_id = ?',
        values: [product.id],
      });

      let imgArr = []
      let variantArr = []
      let image_indexs = []

      variant_arr.forEach(item => {
        if(item.option2_value && item.option2_value.length > 0){
          variantArr.push({
            sku: item.sku,
            option1: item.option1_value,
            option2: item.option2_value,
            barcode: item.barcode,
            price: item.price.toString(),
            cost: item.buyBoxPrice.toString(),    
            weight: item.weight,
            weight_unit: "lb",                   
          })    
        }else{
          variantArr.push({
            sku: item.sku,
            option1: item.option1_value,
            barcode: item.barcode,                    
            price: item.price.toString(),
            cost: item.buyBoxPrice.toString(),                                                               
            weight: item.weight,
            weight_unit: "lb",
          })    
        }

        image_indexs.push(imgArr.length)
        imgArr.push({"src":process.env.IMAGE_PATH + item.image})
      })        

      const shopify_product = await shopify.product.create({
        "title": product.title,
        "body_html": product.description,
        "vendor": product.brand,
        "tags": product.tags.split(),
        "images": imgArr,
        "status": "draft",
        "options" : optionArr,
        "variants": variantArr
      })

      for(let i = 0; i < shopify_product.variants.length; i++) {              
        await shopify.productVariant.update(
          shopify_product.variants[i].id,
          {
            image_id: shopify_product.images[image_indexs[i]].id
          }
        )    
      }

      await excuteQuery({
        query: "UPDATE products SET shopify_product_id=?, handle=?, status=1 WHERE id = ?",
        values: [shopify_product.id, shopify_product.handle, product.id],
      });
    }
  }

  // await excuteQuery({
  //   query: "UPDATE history SET status = 1 WHERE id = ?",
  //   values: [historyObj.insertId]
  // });

  const drafts = await excuteQuery({
    query: 'SELECT * FROM products WHERE status = 0',
    values: [],
  });

  for(const draft of drafts){
    const variants = await excuteQuery({
        query: 'SELECT * FROM variants WHERE variants.product_id = ?',
        values: [draft.id],
    });

    let prices = []
    for(const variant of variants) {
        prices.push(variant.price)
    }

    var min = Math.min(...prices);
    var max = Math.max(...prices);

    draft['min'] = min
    draft['max'] = max            
    draft['variants'] = variants
  }

  const draftCount = await excuteQuery({
    query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 0',
    values: [],
  });

  const productCount = await excuteQuery({
    query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 1',
    values: [],
  });

  console.log('===product add end===')

  res.status(200).json({
    products: drafts, 
    draftCount: draftCount[0].numberOfProducts,
    productCount: productCount[0].numberOfProducts    
  })
}
