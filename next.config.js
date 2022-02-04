module.exports = {
  reactStrictMode: true,
  env: {
    
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
