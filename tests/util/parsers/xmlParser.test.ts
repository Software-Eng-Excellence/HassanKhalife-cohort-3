import path from 'path';
import fs from 'fs';
import parseXML from '../../../src/util/parsers/xmlParser';

describe('XML Parser', () => {
    const testDir = path.resolve(__dirname, '../src/data/testingData');
    const validXMLPath = path.join(testDir, 'valid_toys.xml');
    const emptyXMLPath = path.join(testDir, 'empty_toys.xml');
    const invalidXMLPath = path.join(testDir, 'invalid_toys.csv');

    beforeEach(() => {
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }

        // Valid XML content
        fs.writeFileSync(validXMLPath, `<?xml version="1.0"?>
<toys>
  <toy>
    <id>5001</id>
    <name>Teddy Bear</name>
    <brand>PlaySoft</brand>
    <price>29.99</price>
    <quantity>4</quantity>
  </toy>
</toys>`);

        // Empty file
        fs.writeFileSync(emptyXMLPath, '');

        // Invalid file (CSV)
        fs.writeFileSync(invalidXMLPath, 'id,name,price\n1,Car,10');
    });

    afterEach(() => {
        [validXMLPath, emptyXMLPath, invalidXMLPath].forEach((file) => {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        });
    });

    it('should parse valid XML into a JSON object', async () => {
        const result = await parseXML(validXMLPath);
        expect(result).toEqual({
            "?xml": "",
            toys: {
                toy: {
                    id: 5001,
                    name: 'Teddy Bear',
                    brand: 'PlaySoft',
                    price: 29.99,
                    quantity: 4
                }
            }
        });
    });

    it('should return empty object for non-XML file', async () => {
        const result = await parseXML(invalidXMLPath);
        expect(result).toEqual({});
    });

    it('should return empty object for empty XML file', async () => {
        const result = await parseXML(emptyXMLPath);
        expect(result).toEqual({});
    });
});
