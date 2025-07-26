import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dataDir = path.resolve(__dirname, '../data');

export default {
  env: process.env.NODE_ENV || 'development',
  SECRET: process.env.SECRET,

  // File paths
  paths: {
    csv: path.join(dataDir, 'Cake orders.csv'),
    xml: path.join(dataDir, 'toy orders.xml'),
    json: path.join(dataDir, 'book orders.json')
  }
};
