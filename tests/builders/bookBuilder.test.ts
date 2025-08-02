import { BookBuilder } from '../../src/models/builders/book.builder';
import { BookGenre, BookFormat, Language, PackagingType, SpecialEditionDetails } from '../../src/models/book.model';

describe('BookBuilder', () => {
    let builder: BookBuilder;

    beforeEach(() => {
        builder = new BookBuilder();
    });

    it('should create a book with default values when all required fields are set', () => {
        const book = builder
            .setTitle("Test Title")
            .setAuthor("Test Author")
            .setGenre(BookGenre.FICTION)
            .setPublisher("Test Publisher")
            .build();

        expect(book.getTitle()).toBe("Test Title");
        expect(book.getAuthor()).toBe("Test Author");
        expect(book.getGenre()).toBe(BookGenre.FICTION);
        expect(book.getPublisher()).toBe("Test Publisher");
        expect(book.getFormat()).toBe(BookFormat.PAPERBACK);
        expect(book.getLanguage()).toBe(Language.ENGLISH);
        expect(book.getSpecialEdition().isSpecialEdition).toBe(false);
        expect(book.getPackaging()).toBe(PackagingType.NONE);
    });

    it('should throw error when missing required fields', () => {
        expect(() => builder.build()).toThrow("Missing required fields: title, author, genre, or publisher.");
    });

    it('should set the title', () => {
        builder.setTitle("The Great Gatsby").setAuthor("F. Scott Fitzgerald").setGenre(BookGenre.FICTION).setPublisher("Scribner");
        const book = builder.build();
        expect(book.getTitle()).toBe("The Great Gatsby");
    });

    it('should set the author', () => {
        builder.setTitle("Test").setAuthor("Jane Austen").setGenre(BookGenre.FICTION).setPublisher("Test Publisher");
        const book = builder.build();
        expect(book.getAuthor()).toBe("Jane Austen");
    });

    it('should set the genre', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.SCIENCE).setPublisher("Test Publisher");
        const book = builder.build();
        expect(book.getGenre()).toBe(BookGenre.SCIENCE);
    });

    it('should set the format with enum value', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setFormat(BookFormat.HARDCOVER);
        const book = builder.build();
        expect(book.getFormat()).toBe(BookFormat.HARDCOVER);
    });

    it('should set the format with custom string', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setFormat("Limited Edition");
        const book = builder.build();
        expect(book.getFormat()).toBe("Limited Edition");
    });

    it('should set the language with enum value', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setLanguage(Language.FRENCH);
        const book = builder.build();
        expect(book.getLanguage()).toBe(Language.FRENCH);
    });

    it('should set the language with custom string', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setLanguage("Portuguese");
        const book = builder.build();
        expect(book.getLanguage()).toBe("Portuguese");
    });

    it('should set the publisher', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Penguin Random House");
        const book = builder.build();
        expect(book.getPublisher()).toBe("Penguin Random House");
    });

    it('should set special edition with all parameters', () => {
        const extras = ["Map", "Signed copy"];
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEdition(true, "Collector's Edition", extras);
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.isSpecialEdition).toBe(true);
        expect(specialEdition.editionName).toBe("Collector's Edition");
        expect(specialEdition.extras).toEqual(extras);
    });

    it('should set special edition with minimal parameters', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEdition(true);
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.isSpecialEdition).toBe(true);
        expect(specialEdition.editionName).toBeUndefined();
        expect(specialEdition.extras).toBeUndefined();
    });

    it('should set special edition details using object', () => {
        const details: SpecialEditionDetails = {
            isSpecialEdition: true,
            editionName: "Anniversary Edition",
            extras: ["Bookmark", "Author interview"]
        };
        
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEditionDetails(details);
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.isSpecialEdition).toBe(true);
        expect(specialEdition.editionName).toBe("Anniversary Edition");
        expect(specialEdition.extras).toEqual(["Bookmark", "Author interview"]);
    });

    it('should add special edition extra to existing extras', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEdition(true, "Special", ["Map"])
               .addSpecialEditionExtra("Poster");
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.extras).toContain("Map");
        expect(specialEdition.extras).toContain("Poster");
        expect(specialEdition.extras).toHaveLength(2);
    });

    it('should add special edition extra when no extras exist', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .addSpecialEditionExtra("Map");
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.extras).toContain("Map");
        expect(specialEdition.extras).toHaveLength(1);
    });

    it('should add multiple special edition extras', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .addSpecialEditionExtra("Map")
               .addSpecialEditionExtra("Bookmark")
               .addSpecialEditionExtra("Poster");
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.extras).toEqual(["Map", "Bookmark", "Poster"]);
    });

    it('should set packaging type', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setPackaging(PackagingType.SHRINK_WRAP);
        const book = builder.build();
        expect(book.getPackaging()).toBe(PackagingType.SHRINK_WRAP);
    });

    it('should chain all methods together', () => {
        const book = builder
            .setTitle("The Hobbit")
            .setAuthor("J.R.R. Tolkien")
            .setGenre(BookGenre.FANTASY)
            .setFormat(BookFormat.HARDCOVER)
            .setLanguage(Language.ENGLISH)
            .setPublisher("George Allen & Unwin")
            .setSpecialEdition(true, "Deluxe Edition")
            .addSpecialEditionExtra("Map of Middle-earth")
            .addSpecialEditionExtra("Illustrations")
            .setPackaging(PackagingType.BOX)
            .build();

        expect(book.getTitle()).toBe("The Hobbit");
        expect(book.getAuthor()).toBe("J.R.R. Tolkien");
        expect(book.getGenre()).toBe(BookGenre.FANTASY);
        expect(book.getFormat()).toBe(BookFormat.HARDCOVER);
        expect(book.getLanguage()).toBe(Language.ENGLISH);
        expect(book.getPublisher()).toBe("George Allen & Unwin");
        expect(book.getSpecialEdition().isSpecialEdition).toBe(true);
        expect(book.getSpecialEdition().editionName).toBe("Deluxe Edition");
        expect(book.getSpecialEdition().extras).toContain("Map of Middle-earth");
        expect(book.getSpecialEdition().extras).toContain("Illustrations");
        expect(book.getPackaging()).toBe(PackagingType.BOX);
    });

    it('should maintain fluent interface for all methods', () => {
        const result = builder
            .setTitle("Test")
            .setAuthor("Test Author")
            .setGenre(BookGenre.FICTION)
            .setFormat(BookFormat.PAPERBACK)
            .setLanguage(Language.ENGLISH)
            .setPublisher("Test Publisher")
            .setSpecialEdition(false)
            .setPackaging(PackagingType.NONE);

        expect(result).toBe(builder);
    });

    it('should handle special edition details with empty extras array', () => {
        const details: SpecialEditionDetails = {
            isSpecialEdition: true,
            editionName: "Basic Edition",
            extras: []
        };
        
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEditionDetails(details);
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition.extras).toEqual([]);
    });

    it('should create deep copy of extras array when setting special edition details', () => {
        const originalExtras = ["Map"];
        const details: SpecialEditionDetails = {
            isSpecialEdition: true,
            extras: originalExtras
        };
        
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEditionDetails(details);
        
        originalExtras.push("New Item");
        
        const book = builder.build();
        expect(book.getSpecialEdition().extras).toEqual(["Map"]);
        expect(book.getSpecialEdition().extras).not.toContain("New Item");
    });
});