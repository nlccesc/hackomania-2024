// import { Sequelize } from "sequelize";

// export async function connectToDatabase() {
//   // Connection string to your PostgreSQL database
//   const PSQL = "postgres://postgres:root@localhost:5432/sentiment_words";

//   // Create a new instance of Sequelize with the connection options
//   const sequelize = new Sequelize(PSQL, {
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });

//   try {
//     // Test the database connection
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     // You can perform further operations on the database here
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// // Call the connectToDatabase function
// connectToDatabase();
