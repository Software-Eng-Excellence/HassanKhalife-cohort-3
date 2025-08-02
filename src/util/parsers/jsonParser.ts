import fs from 'fs'; 
import logger from '../logger';

const parseJSON = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        logger.error("Error reading JSON file %s: %o", filePath, err);
        return reject(new Error("Failed to read JSON file."));
      }
      try {
        const data = JSON.parse(jsonData); // Parse JSON data
        resolve(data); // Resolve with parsed data
      } catch (error) {
        logger.error("Invalid JSON format in file %s: %o", filePath, error);
        reject(new Error("Invalid JSON format.")); // Reject if parsing fails
      }
    })
  );
};

export default parseJSON;