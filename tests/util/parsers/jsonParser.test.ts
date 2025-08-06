import path from 'path';
import fs from 'fs';
import parseJSON from '../../../src/util/parsers/jsonParser';

describe('JSON Parser', () => {
  const testDir = path.resolve(__dirname, '../src/data/testingData');
  const validJSONPath = path.join(testDir, 'valid_books.json');
  const emptyJSONPath = path.join(testDir, 'empty_books.json');
  const invalidJSONPath = path.join(testDir, 'invalid_books.csv');
  const primitiveJSONPath = path.join(testDir, 'primitive_data.json');
  const singleObjectJSONPath = path.join(testDir, 'single_book.json');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Valid JSON content (array of objects)
    const validData = [
      {
        id: 'B001',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: '29.99',
        quantity: '2'
      },
      {
        id: 'B002',
        title: 'Refactoring',
        author: 'Martin Fowler',
        price: '35.50',
        quantity: '1'
      }
    ];
    fs.writeFileSync(validJSONPath, JSON.stringify(validData));

    // Single object JSON
    const singleObject = {
      id: 'B001',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: '29.99',
      quantity: '2'
    };
    fs.writeFileSync(singleObjectJSONPath, JSON.stringify(singleObject));

    // Primitive value JSON
    fs.writeFileSync(primitiveJSONPath, JSON.stringify(['item1', 'item2', 'item3']));

    // Empty file
    fs.writeFileSync(emptyJSONPath, '');

    // Invalid JSON (CSV content)
    fs.writeFileSync(invalidJSONPath, 'id,title,price\n1,Refactoring,30');
  });

  afterEach(() => {
    [validJSONPath, emptyJSONPath, invalidJSONPath, primitiveJSONPath, singleObjectJSONPath].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  });

  it('should parse valid JSON array into string[][] format', async () => {
    const result = await parseJSON(validJSONPath);
    expect(result).toEqual([
      ['id', 'title', 'author', 'price', 'quantity'], // Headers
      ['B001', 'Clean Code', 'Robert C. Martin', '29.99', '2'], // First row
      ['B002', 'Refactoring', 'Martin Fowler', '35.50', '1'] // Second row
    ]);
  });

  it('should parse single JSON object into string[][] format', async () => {
    const result = await parseJSON(singleObjectJSONPath);
    expect(result).toEqual([
      ['id', 'title', 'author', 'price', 'quantity'], // Headers
      ['B001', 'Clean Code', 'Robert C. Martin', '29.99', '2'] // Data row
    ]);
  });

  it('should parse array of primitives into string[][] format', async () => {
    const result = await parseJSON(primitiveJSONPath);
    expect(result).toEqual([
      ['value'], // Header
      ['item1'],
      ['item2'],
      ['item3']
    ]);
  });

  it('shouldthrow error for empty JSON file', async () => {
    await expect(parseJSON(emptyJSONPath)).rejects.toThrow(/Invalid JSON format/);

  });

  it('should throw error for invalid (non-JSON) file', async () => {
    await expect(parseJSON(invalidJSONPath)).rejects.toThrow(/Invalid JSON format/);
  });

  it('should handle file read errors', async () => {
    const nonExistentPath = path.join(testDir, 'non_existent.json');
    await expect(parseJSON(nonExistentPath)).rejects.toThrow(/Failed to read JSON file/);
  });
});
