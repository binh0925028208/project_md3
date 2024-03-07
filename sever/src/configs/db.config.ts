import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "b6iddjy3cn0uo7cqpoyx",
  "u8yblj8lj7n8rlm0",
  "GGLdeFXVmZ5jWvxTXKgF",
  {
    host: "b6iddjy3cn0uo7cqpoyx-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export default sequelize;
