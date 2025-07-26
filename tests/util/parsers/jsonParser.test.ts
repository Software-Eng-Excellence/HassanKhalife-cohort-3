import path from 'path';
import fs from 'fs';
import parseJSON from '../../../src/util/parsers/jsonParser';

describe('JSON Parser', () => {
  const testDir = path.resolve(__dirname, '../src/data/testingData');
  const validJSONPath = path.join(testDir, 'valid_books.json');
  const emptyJSONPath = path.join(testDir, 'empty_books.json');
  const invalidJSONPath = path.join(testDir, 'invalid_books.csv');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Valid JSON content
    const validData = [
      {
        id: 'B001',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 29.99,
        quantity: 2
      }
    ];
    fs.writeFileSync(validJSONPath, JSON.stringify(validData));

    // Empty file
    fs.writeFileSync(emptyJSONPath, '');

    // Invalid JSON (CSV content)
    fs.writeFileSync(invalidJSONPath, 'id,title,price\n1,Refactoring,30');
  });

  afterEach(() => {
    [validJSONPath, emptyJSONPath, invalidJSONPath].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  });

  it('should parse valid JSON correctly', async () => {
    const result = await parseJSON(validJSONPath);
    expect(result).toEqual([
      {
        id: 'B001',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 29.99,
        quantity: 2
      }
    ]);
  });

  it('should throw error for invalid (non-JSON) file', async () => {
    await expect(parseJSON(invalidJSONPath)).rejects.toThrow(/Invalid JSON format/);
  });

  it('should throw error for empty JSON file', async () => {
    await expect(parseJSON(emptyJSONPath)).rejects.toThrow(/Invalid JSON format/);
  });
});
