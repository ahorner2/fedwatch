import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/general.js';

//data imports 
import FedBalance from "./models/fedBalance.js";
import { FedNumbers, newData} from "./data/index.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/general", generalRoutes);

/* DATA UPDATES */
// async function updateData(newData) {
//   for (const data of newData) {
//     try {
//       await FedBalance.updateOne({ date: data.date }, data, { upsert: true });
//       console.log(`Updated/Inserted data for date: ${data.date}`)
//     } catch (error) {
//       console.error(`Error updating/inserting data for date: ${data.date}`);
//     } 
//   }
// }

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    // Call the data update function
    // updateData(newData)
      // .then(() => {
      //   console.log("Data update completed");
       
      // })
      // .catch((error) => {
      //   console.error("Data update error:", error);
      //   mongoose.disconnect(); // Disconnect from MongoDB in case of an error
      // });

  }).catch((error) => console.error(`${error} did not connect`));

// .then(() => {
//   app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   /* ONLY ADD ONCE */
//   // FedBalance.insertMany(FedNumbers);
// }).catch((error) => console.log(`${error} did not connect`));