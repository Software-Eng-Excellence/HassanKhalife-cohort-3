import fs from 'fs';
import logger from '../logger';

const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const results: string[][] = [];

    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    readStream.on('data', (chunk: string | Buffer) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
      lines.forEach((line) => {
        const columns = line.split(',').map(value => value.trim().replace(/^"(.*)"$/, '$1'));
        results.push(columns);
      });
    });

    readStream.on('end', () => {
      if (results.length === 0) {
        // Empty file -> resolve empty array
        return resolve([]);
      }

      // For non-empty files, validate rows have >= 2 columns
      const isValidCSV = results.every(row => row.length >= 2);

      if (!isValidCSV) {
        const errorMsg = 'Invalid CSV format.';
        logger.error(errorMsg + ' File: %s', filePath);
        return reject(new Error(errorMsg));
      }

      resolve(results);
    });

    readStream.on('error', (error) => {
      logger.error('Error while reading the stream of file %s: %o', filePath, error);
      reject(error);
    });
  });
};

export default parseCSV;