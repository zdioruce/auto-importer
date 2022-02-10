// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../db'

export default async function handler(req, res) {

  const { ids } = req.query
  
  ids.split(',').forEach(async id => {
    const productApi = await fetch('https://api.keepa.com/product?key=69i9bc60t6ifrbvnmld3gi6nfrjega1l8lqdhib1t45f05cbnm2qibqoogf12sm6&domain=1&asin=' + id + '&stats=1')
    const productApiResponse = await productApi.json()
    
    if(productApiResponse) {
      const productData = productApiResponse.products[0]
  
      let variants = []
      let tags = []
      let options = []
      
      productData.categoryTree.forEach(category => {
        if(!tags.includes(category.name))
          tags.push(category.name)
      });
      tags.push(productData.productGroup)
    
      productData.variations.map(variation => {
        if(id == variation.asin) {
          variation.attributes.map(attribute => {
            options.push({
              "name": attribute.dimension,
              "values": attribute.value
            })
          })

          variants.push(
            {
              "image": productData.imagesCSV.split(',')[0],
              "sku": productData.asin,
              "option1_name": options[0].name, 
              "option1_value": options[0].values, 
              "option2_name": options.length > 1? options[1].name: null,
              "option2_value": options.length > 1? options[1].values: null,
              "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: "",
              "price": productData.stats.current[0]/100
            }
          )  
        }
      })

      // if(productData.color && productData.size){
      //   variants.push(
      //     {
      //       "sku": productData.asin,
      //       "option1": productData.color, 
      //       "option2": productData.size,
      //       "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
      //     }
      //   )  
      // }else if(productData.color){
      //   variants.push(
      //     {
      //       "sku": productData.asin,
      //       "option1": productData.color, 
      //       "option2": "",
      //       "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
      //     }
      //   )  
      // }else {
      //   variants.push(
      //     {
      //       "sku": productData.asin,
      //       "option1": productData.size,
      //       "option2": "",
      //       "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
      //     }
      //   )  
      // }    
    
      // if(productData.color && !colors.includes(productData.color))
      //   colors.push(productData.color)
    
      // if(productData.size && !size.includes(productData.size))
      //   size.push(productData.size)
    
      // if(colors.length > 0){
      //   options.push({
      //     "name": "Color",
      //     "values": colors.join()
      //   })
      // }
        
      // if(size.length > 0){
      //   options.push({
      //     "name": "Size",
      //     "values": size.join()
      //   })
      // }
        
      let price = 0

      for (var i = 0; i < productData.stats.current.length; i++) {
        if (productData.stats.current[i] > -1) {
          price = productData.stats.current[i] / 100
          break
        }
      }

      const result = await excuteQuery({
        query: 'INSERT INTO products (title, tags, brand, features, description, images, status, upload_time, asin, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        values: [
          productData.title, 
          tags.join(), 
          productData.brand, 
          productData.features.join(), 
          productData.description, 
          productData.imagesCSV, 
          0, 
          new Date(), 
          productData.asin, 
          price,
        ]
      });
      
      options.forEach(async (option) => {
        await excuteQuery({
          query: 'INSERT INTO options (product_id, name, value) VALUES (?, ?, ?)',
          values: [result.insertId, option.name, option.values],
        });
      })
  
      variants.forEach(async (variant) => {
        await excuteQuery({
          query: 'INSERT INTO variants (product_id, sku, image, option1_name, option1_value, option2_name, option2_value, barcode, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          values: [
            result.insertId, 
            variant.sku, 
            variant.image, 
            variant.option1_name, 
            variant.option1_value, 
            variant.option2_name, 
            variant.option2_value, 
            variant.barcode, 
            variant.price
          ],
        });
      })  
    }
  })
  
  const response = await excuteQuery({
    query: 'SELECT * FROM products WHERE status = 0',
    values: [],
  });

  res.status(200).json({ status: 1, response })
}
