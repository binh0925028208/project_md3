import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "bdglcwdet2wc48k4y5nz",
  "ut2eepzbd3wpsifw",
  "Pm6XoZO7CMEr6HZhdoOw",
  {
    host: "bdglcwdet2wc48k4y5nz-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export default sequelize;
