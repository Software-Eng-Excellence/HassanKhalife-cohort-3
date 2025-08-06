import fs from 'fs'; 
import logger from '../logger';

const parseJSON = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        logger.error("Error reading JSON file %s: %o", filePath, err);
        return reject(new Error("Failed to read JSON file."));
      }
      try {
        const data = JSON.parse(jsonData);
        
        // Convert the parsed JSON to string[][] format
        const result = convertToStringArray(data);
        
        if (result.length === 0) {
          logger.warn('No data found in JSON file: %s', filePath);
          return resolve([]);
        }
        
        logger.info('Successfully parsed JSON file: %s with %d rows', filePath, result.length);
        resolve(result);
      } catch (error) {
        logger.error("Invalid JSON format in file %s: %o", filePath, error);
        reject(new Error("Invalid JSON format.")); // Reject if parsing fails
      }
    })
  );
};

function convertToStringArray(jsonData: any): string[][] {
  const result: string[][] = [];
  
  try {
    if (Array.isArray(jsonData)) {
      // Handle array of objects
      if (jsonData.length > 0) {
        const firstItem = jsonData[0];
        
        if (typeof firstItem === 'object' && firstItem !== null) {
          // Extract headers from the first object
          const headers = Object.keys(firstItem);
          result.push(headers);
          
          // Convert each object to string array
          jsonData.forEach(item => {
            if (item && typeof item === 'object') {
              const rowArray = headers.map(header => {
                const value = item[header];
                return value !== undefined && value !== null ? String(value) : '';
              });
              result.push(rowArray);
            }
          });
        } else {
          // Handle array of primitive values
          const headers = ['value'];
          result.push(headers);
          
          jsonData.forEach(item => {
            result.push([String(item)]);
          });
        }
      }
    } else if (jsonData && typeof jsonData === 'object') {
      // Handle single object
      const headers = Object.keys(jsonData);
      result.push(headers);
      
      const rowArray = headers.map(header => {
        const value = jsonData[header];
        return value !== undefined && value !== null ? String(value) : '';
      });
      result.push(rowArray);
    } else {
      // Handle primitive value
      const headers = ['value'];
      result.push(headers);
      result.push([String(jsonData)]);
    }
  } catch (error) {
    logger.error('Error converting JSON object to string array: %o', error);
    throw new Error('Failed to convert JSON data to string array format');
  }
  
  return result;
}

export default parseJSON;