import { 
    Book, 
    BookGenre, 
    BookFormat, 
    Language, 
    PackagingType, 
    SpecialEditionDetails 
} from '../book.model';

export class BookBuilder {
    private title!: string;
    private author!: string;
    private genre!: BookGenre;
    private format: BookFormat | string = BookFormat.PAPERBACK;
    private language: Language | string = Language.ENGLISH;
    private publisher!: string;
    private specialEdition: SpecialEditionDetails = {
        isSpecialEdition: false
    };
    private packaging: PackagingType = PackagingType.NONE;

    setTitle(title: string): BookBuilder {
        this.title = title;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    setGenre(genre: BookGenre): BookBuilder {
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

    setSpecialEdition(isSpecialEdition: boolean, editionName?: string, extras?: string[]): BookBuilder {
        this.specialEdition = {
            isSpecialEdition,
            editionName,
            extras: extras ? [...extras] : undefined
        };
        return this;
    }

    setSpecialEditionDetails(details: SpecialEditionDetails): BookBuilder {
        this.specialEdition = {
            isSpecialEdition: details.isSpecialEdition,
            editionName: details.editionName,
            extras: details.extras ? [...details.extras] : undefined
        };
        return this;
    }

    addSpecialEditionExtra(extra: string): BookBuilder {
        if (!this.specialEdition.extras) {
            this.specialEdition.extras = [];
        }
        this.specialEdition.extras.push(extra);
        return this;
    }

    setPackaging(packaging: PackagingType): BookBuilder {
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
}