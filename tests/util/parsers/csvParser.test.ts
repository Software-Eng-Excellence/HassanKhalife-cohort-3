import path from 'path';
import fs from 'fs';
import parseCSV from '../../../src/util/parsers/csvParser';

describe('CSV Parser', () => {
  const testDir = path.resolve(__dirname, '../src/data/testingData');
  const validCSVPath = path.join(testDir, 'valid_orders.csv');
  const emptyCSVPath = path.join(testDir, 'empty_orders.csv');
  const invalidFilePath = path.join(testDir, 'invalid_orders.xml');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Create valid CSV file
    fs.writeFileSync(validCSVPath, '101,Cake,5\n102,Pie,3');

    // Create empty CSV file
    fs.writeFileSync(emptyCSVPath, '');

    // Create invalid non-CSV file
    fs.writeFileSync(invalidFilePath, '<orders><order id="101">Cake</order></orders>');
  });

  afterEach(() => {
    [validCSVPath, emptyCSVPath, invalidFilePath].forEach((file) => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });
  });

  it('should parse valid CSV into array of arrays', async () => {
    const result = await parseCSV(validCSVPath);
    expect(result).toEqual([
      ['101', 'Cake', '5'],
      ['102', 'Pie', '3']
    ]);
  });

  it('should return an empty array for an empty CSV file', async () => {
    const result = await parseCSV(emptyCSVPath);
    expect(result).toEqual([]);
  });

  it('should throw an error for non-CSV content', async () => {
    await expect(parseCSV(invalidFilePath)).rejects.toThrow('Invalid CSV format.');
  });
});
