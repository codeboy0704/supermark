const dotenv = require('dotenv');
dotenv.config();

export const config = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  DBURI: process.env.DB_URI,
  port: process.env.PORT,
  userDB: process.env.USERDB,
  productsDB: process.env.PRODUCTDB,
  sessionDB: process.env.SESSIONDB,
  roles: {
    READ: process.env.READ,
    ADMIN: process.env.ADMIN
  }
};
