import { BookBuilder } from '../../src/models/builders/book.builder';
import { BookGenre, BookFormat, Language, PackagingType } from '../../src/models/book.model';

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
        expect(book.getSpecialEdition()).toBe("None");
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

    // Modified tests to match actual builder implementation
    it('should set special edition', () => {
        builder.setTitle("Test").setAuthor("Test").setGenre(BookGenre.FICTION).setPublisher("Test Publisher")
               .setSpecialEdition("Collector's Edition");
        const book = builder.build();
        const specialEdition = book.getSpecialEdition();
        
        expect(specialEdition).toBe("Collector's Edition");
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
            .setSpecialEdition("Deluxe Edition")
            .setPackaging(PackagingType.BOX)
            .build();

        expect(book.getTitle()).toBe("The Hobbit");
        expect(book.getAuthor()).toBe("J.R.R. Tolkien");
        expect(book.getGenre()).toBe(BookGenre.FANTASY);
        expect(book.getFormat()).toBe(BookFormat.HARDCOVER);
        expect(book.getLanguage()).toBe(Language.ENGLISH);
        expect(book.getPublisher()).toBe("George Allen & Unwin");
        expect(book.getSpecialEdition()).toBe("Deluxe Edition");
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
            .setSpecialEdition("Basic Edition")
            .setPackaging(PackagingType.NONE);

        expect(result).toBe(builder);
    });
});