module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT || 9000,
  SECRET: process.env.SECRET,
  databases: {
    APPDB: {
      PORT: process.env.DB_PORT,
      DIALECT: process.env.DIALECT,
      MAX_DB_CONNECTIONS: 30,
      MIN_DB_CONNECTIONS: 10,
      DATABASE: process.env.DATABASE,
      write: {
        HOST: process.env.HOST,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
      },
      read: {
        HOST: process.env.RD_HOST,
        USERNAME: process.env.RD_DB_USERNAME,
        PASSWORD: process.env.RD_DB_PASSWORD,
      },
    },
  },
};
