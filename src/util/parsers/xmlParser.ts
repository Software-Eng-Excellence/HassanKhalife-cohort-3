import fs from 'fs'; 
import logger from '../logger';
import { XMLParser } from 'fast-xml-parser';

const parseXML = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf-8', (err, XMLdata) => {
      if (err) {
        logger.error("Error reading XML file %s: %o", filePath, err);
        return reject(new Error("Failed to read XML file."));
      }
      try {
        const parser = new XMLParser();
        const jsObject = parser.parse(XMLdata); // Parse XML data to JavaScript object
        resolve(jsObject); // Resolve with parsed data
      } catch (error) {
        logger.error("Invalid XML format in file %s: %o", filePath, error);
        reject(new Error("Invalid XML format.")); // Reject if parsing fails
      }
    })
  );
};

export default parseXML;