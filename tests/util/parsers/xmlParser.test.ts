import path from 'path';
import fs from 'fs';
import parseXML from '../../../src/util/parsers/xmlParser';

describe('XML Parser', () => {
    const testDir = path.resolve(__dirname, '../src/data/testingData');
    const validXMLPath = path.join(testDir, 'valid_toys.xml');
    const multipleToysXMLPath = path.join(testDir, 'multiple_toys.xml');
    const emptyXMLPath = path.join(testDir, 'empty_toys.xml');
    const invalidXMLPath = path.join(testDir, 'invalid_toys.csv');
    const noDataXMLPath = path.join(testDir, 'no_data.xml');

    beforeEach(() => {
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }

        // Valid XML content with single toy
        fs.writeFileSync(validXMLPath, `<?xml version="1.0"?>
<data>
  <row>
    <id>5001</id>
    <name>Teddy Bear</name>
    <brand>PlaySoft</brand>
    <price>29.99</price>
    <quantity>4</quantity>
  </row>
</data>`);

        // Valid XML content with multiple toys
        fs.writeFileSync(multipleToysXMLPath, `<?xml version="1.0"?>
<data>
  <row>
    <id>5001</id>
    <name>Teddy Bear</name>
    <brand>PlaySoft</brand>
    <price>29.99</price>
    <quantity>4</quantity>
  </row>
  <row>
    <id>5002</id>
    <name>Robot</name>
    <brand>TechToys</brand>
    <price>45.00</price>
    <quantity>2</quantity>
  </row>
</data>`);

        // XML with no data rows
        fs.writeFileSync(noDataXMLPath, `<?xml version="1.0"?>
<data>
</data>`);

        // Empty file
        fs.writeFileSync(emptyXMLPath, '');

        // Invalid file (CSV)
        fs.writeFileSync(invalidXMLPath, 'id,name,price\n1,Car,10');
    });

    afterEach(() => {
        [validXMLPath, multipleToysXMLPath, emptyXMLPath, invalidXMLPath, noDataXMLPath].forEach((file) => {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        });
    });

    it('should parse valid XML with single row into string[][] format', async () => {
        const result = await parseXML(validXMLPath);
        expect(result).toEqual([
            ['id', 'name', 'brand', 'price', 'quantity'], // Headers
            ['5001', 'Teddy Bear', 'PlaySoft', '29.99', '4'] // Data row
        ]);
    });

    it('should parse valid XML with multiple rows into string[][] format', async () => {
        const result = await parseXML(multipleToysXMLPath);
        expect(result).toEqual([
            ['id', 'name', 'brand', 'price', 'quantity'], // Headers
            ['5001', 'Teddy Bear', 'PlaySoft', '29.99', '4'], // First row
            ['5002', 'Robot', 'TechToys', '45', '2'] // Second row
        ]);
    });

    it('should return empty array for XML with no data rows', async () => {
        const result = await parseXML(noDataXMLPath);
        expect(result).toEqual([]);
    });

    it('should return empty array for empty XML file', async () => {
        const result = await parseXML(emptyXMLPath);
        expect(result).toEqual([]);
    });

    it('should return empty array for invalid XML format', async () => {
        await expect(parseXML(invalidXMLPath)).resolves.toEqual([]);
    });

    it('should handle file read errors', async () => {
        const nonExistentPath = path.join(testDir, 'non_existent.xml');
        await expect(parseXML(nonExistentPath)).rejects.toThrow(/Failed to read XML file/);
    });
});
