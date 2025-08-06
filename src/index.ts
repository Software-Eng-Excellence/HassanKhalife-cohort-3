import path from 'path';
import logger from './util/logger';

import parseCSV from './util/parsers/csvParser';
import parseJSON from './util/parsers/jsonParser';
import parseXML from './util/parsers/xmlParser';
import config from './config';
import { OrderMapper } from './models/mappers/order.mapper';
import { CakeMapper } from './models/mappers/cake.mapper';
import { ToyMapper } from './models/mappers/toy.mapper';
import { BookMapper } from './models/mappers/book.mapper';

const csvPath = path.resolve(__dirname, config.paths.csv);
const xmlPath = path.resolve(__dirname, config.paths.xml);
const jsonPath = path.resolve(__dirname, config.paths.json);

// Parse CSV File
async function parseCSVFile() {
    try {
        const data = await parseCSV(csvPath);
        const cakeMapper = new CakeMapper();
        const orderMapper = new OrderMapper(cakeMapper);
        const cakeOrders = data.map(orderMapper.map.bind(orderMapper));
        cakeOrders.forEach(item => {
            logger.info(`%o \n`, item);
        });
    } catch (error) {
        logger.error('Error parsing CSV:', error);
    }
}

// Parse XML File
async function parseXMLFile() {
    try {
        const data = await parseXML(xmlPath);

        const toyMapper = new ToyMapper();
        const orderMapper = new OrderMapper(toyMapper);
        const toyOrders = data.map(orderMapper.map.bind(orderMapper));
        toyOrders.forEach((item) => {
            logger.info(`%o \n`, item);
        });
    } catch (error) {
        logger.error('Error parsing XML:', error);
    }
}

// Parse JSON File
async function parseJSONFile() {
    try {
        const data = await parseJSON(jsonPath);
        const bookMapper = new BookMapper();
        const orderMapper = new OrderMapper(bookMapper);
        const bookOrders = data.map(orderMapper.map.bind(orderMapper));
        bookOrders.forEach(item => {
            logger.info(`%o \n`, item);
        });
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
