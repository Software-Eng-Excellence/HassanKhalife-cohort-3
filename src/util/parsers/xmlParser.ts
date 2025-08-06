import fs from 'fs';
import logger from '../logger';
import { XMLParser } from 'fast-xml-parser';

const parseXML = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf-8', (err, XMLdata) => {
      if (err) {
        logger.error("Error reading XML file %s: %o", filePath, err);
        return reject(new Error("Failed to read XML file."));
      }
      try {
        const parser = new XMLParser({
          ignoreAttributes: false,
          parseAttributeValue: true,
          parseTagValue: true,
          trimValues: true
        });
        const jsObject = parser.parse(XMLdata);

        if (!jsObject || typeof jsObject !== 'object' || !jsObject.data) {
          logger.warn('No valid data found in XML file: %s', filePath);
          return resolve([]);
        }

        const result = convertToStringArray(jsObject?.data); // Only pass `data`

        if (result.length === 0) {
          logger.warn('No data found in XML file: %s', filePath);
          return resolve([]);
        }

        logger.info('Successfully parsed XML file: %s with %d rows', filePath, result.length);
        resolve(result);
      } catch (error) {
        logger.error("Invalid XML format in file %s: %o", filePath, error);
        reject(new Error("Invalid XML format."));
      }
    })
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToStringArray(data: any): string[][] {
  const result: string[][] = [];

  if (!data || !data.row) return result;

  const rows = Array.isArray(data.row) ? data.row : [data.row];

  if (rows.length === 0) return result;

  const headers = Object.keys(rows[0]);
  result.push(headers);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows.forEach((row: any) => {
    const rowArray = headers.map(header => {
      const value = row[header];
      return value !== undefined && value !== null ? String(value) : '';
    });
    result.push(rowArray);
  });

  return result;
}

export default parseXML;
