import {
    Book,
    BookGenre,
    BookFormat,
    Language,
    PackagingType
} from '../book.model';

export class BookBuilder {
    private title!: string;
    private author!: string;
    private genre!: BookGenre | string;
    private format: BookFormat | string = BookFormat.PAPERBACK;
    private language: Language | string = Language.ENGLISH;
    private publisher!: string;
    private specialEdition: string = "None";
    private packaging: PackagingType | string = PackagingType.NONE;

    setTitle(title: string): BookBuilder {
        this.title = title;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    setGenre(genre: BookGenre | string): BookBuilder {
        this.genre = genre;
        return this;
    }

    setFormat(format: BookFormat | string): BookBuilder {
        this.format = format;
        return this;
    }

    setLanguage(language: Language | string): BookBuilder {
        this.language = language;
        return this;
    }

    setPublisher(publisher: string): BookBuilder {
        this.publisher = publisher;
        return this;
    }

    setSpecialEdition(specialEdition: string): BookBuilder {
        this.specialEdition =specialEdition;
        return this;
    }

    setSpecialEditionDetails(specialEdition: string): BookBuilder {
        this.specialEdition = specialEdition
        return this;
    }

    setPackaging(packaging: PackagingType | string): BookBuilder {
        this.packaging = packaging;
        return this;
    }

    build(): Book {
        const requiredFields = [this.title, this.author, this.genre, this.publisher];
        if (requiredFields.some(field => !field)) {
            throw new Error("Missing required fields: title, author, genre, or publisher.");
        }

        return new Book(
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging
        );
    }

    static create(): BookBuilder {
        return new BookBuilder();
    }
}