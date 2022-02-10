module.exports = {
  reactStrictMode: true,
  env: {
    SHOP: 'egozioruc.myshopify.com',
    IMAGE_PATH: 'https://images-na.ssl-images-amazon.com/images/I/'
  },
  images: {
    domains: ['images-na.ssl-images-amazon.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
