import path from 'path';
import logger from './util/logger';

import parseCSV from './util/parsers/csvParser';
import parseJSON from './util/parsers/jsonParser';
import parseXML from './util/parsers/xmlParser';
import config from './config';

const csvPath = path.resolve(__dirname, config.paths.csv);
const xmlPath = path.resolve(__dirname, config.paths.xml);
const jsonPath = path.resolve(__dirname, config.paths.json);

// Parse CSV File
async function parseCSVFile() {
    try {
        const data = await parseCSV(csvPath);
        data.forEach(item => {
            logger.info(`${JSON.stringify(item)}\n`);
        });
    } catch (error) {
        logger.error('Error parsing CSV:', error);
    }
}

// Parse XML File
async function parseXMLFile() {
    try {
        const data = await parseXML(xmlPath);
        if (Array.isArray(data)) {
            data.forEach(item => logger.info(`${JSON.stringify(item)}\n`));
        } else {
            logger.info(`${JSON.stringify(data)}\n`);
        }
    } catch (error) {
        logger.error('Error parsing XML:', error);
    }
}

// Parse JSON File
async function parseJSONFile() {
    try {
        const data = await parseJSON(jsonPath);
        if (Array.isArray(data)) {
            data.forEach(item => logger.info(`${JSON.stringify(item)}\n`));
        } else {
            logger.info(`${JSON.stringify(data)}\n`);
        }
    } catch (error) {
        logger.error('Error parsing JSON:', error);
    }
}

// Run all parsers
async function main() {
    await parseCSVFile();
    await parseXMLFile();
    await parseJSONFile();
}

main();
