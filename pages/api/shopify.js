// shopify.js
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOP,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_SECRET
});
