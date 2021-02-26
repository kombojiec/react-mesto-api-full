const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'development',
  JWT__TTL: '7d',
};

module.exports = config;
