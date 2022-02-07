// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../db'

export default async function handler(req, res) {

  const { ids } = req.query

  ids.split(',').forEach(async id => {
    const productApi = await fetch('https://api.keepa.com/product?key=69i9bc60t6ifrbvnmld3gi6nfrjega1l8lqdhib1t45f05cbnm2qibqoogf12sm6&domain=1&asin=' + id)
    const productApiResponse = await productApi.json()

    if(productApiResponse) {
      const productData = productApiResponse.products[0]
  
      let variants = []
      let tags = []
      let colors = []
      let size = []
      let options = []
      
      productData.categoryTree.forEach(category => {
        if(!tags.includes(category.name))
          tags.push(category.name)
      });
      tags.push(productData.productGroup)
    
      if(productData.color && productData.size){
        variants.push(
          {
            "sku": productData.asin,
            "option1": productData.color, 
            "option2": productData.size,
            "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
          }
        )  
      }else if(productData.color){
        variants.push(
          {
            "sku": productData.asin,
            "option1": productData.color, 
            "option2": "",
            "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
          }
        )  
      }else {
        variants.push(
          {
            "sku": productData.asin,
            "option1": productData.size,
            "option2": "",
            "barcode": productData.eanList && productData.eanList.length > 0 ? productData.eanList[0]: ""
          }
        )  
      }    
    
      if(productData.color && !colors.includes(productData.color))
        colors.push(productData.color)
    
      if(productData.size && !size.includes(productData.size))
        size.push(productData.size)
    
      if(colors.length > 0){
        options.push({
          "name": "Color",
          "values": colors.join()
        })
      }
        
      if(size.length > 0){
        options.push({
          "name": "Size",
          "values": size.join()
        })
      }
        
      const result = await excuteQuery({
        query: 'INSERT INTO products (title, tags, brand, description, images, status, upload_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [productData.title, tags.join(), productData.brand, productData.description, productData.imagesCSV, 0, new Date()],
      });
      
      options.forEach(async (option) => {
        await excuteQuery({
          query: 'INSERT INTO options (product_id, name, value) VALUES (?, ?, ?)',
          values: [result.insertId, option.name, option.values],
        });
      })
  
      variants.forEach(async (variant) => {
        await excuteQuery({
          query: 'INSERT INTO variants (product_id, sku, option1, option2, barcode) VALUES (?, ?, ?, ?, ?)',
          values: [result.insertId, variant.sku, variant.option1, variant.option2, variant.barcode],
        });
      })  
    }
  })
  
  res.status(200).json({ status: 1 })
}
