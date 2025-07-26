import { IItem, ItemCategory } from "./item.model";

// Enums for typed constraints
export enum BookGenre {
    FICTION = "fiction",
    NON_FICTION = "non-fiction",
    FANTASY = "fantasy",
    SCIENCE = "science",
    HISTORY = "history",
    BIOGRAPHY = "biography"
}

export enum BookFormat {
    HARDCOVER = "hardcover",
    PAPERBACK = "paperback",
    EBOOK = "ebook",
    AUDIOBOOK = "audiobook",
    CUSTOM = "custom"
}

export enum Language {
    ENGLISH = "English",
    FRENCH = "French",
    SPANISH = "Spanish",
    GERMAN = "German",
    CUSTOM = "custom"
}

export enum PackagingType {
    SHRINK_WRAP = "shrink wrap",
    BOX = "box",
    NONE = "none",
    CUSTOM = "custom"
}

export interface SpecialEditionDetails {
    isSpecialEdition: boolean;
    editionName?: string;
    extras?: string[]; // e.g., maps, signed copy, etc.
}

export class Book implements IItem {
    private readonly title: string;
    private readonly author: string;
    private readonly genre: BookGenre;
    private readonly format: BookFormat | string;
    private readonly language: Language | string;
    private readonly publisher: string;
    private readonly specialEdition: SpecialEditionDetails;
    private readonly packaging: PackagingType;

    constructor(
        title: string,
        author: string,
        genre: BookGenre,
        format: BookFormat | string,
        language: Language | string,
        publisher: string,
        specialEdition: SpecialEditionDetails,
        packaging: PackagingType
    ) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.format = format;
        this.language = language;
        this.publisher = publisher;
        this.specialEdition = specialEdition;
        this.packaging = packaging;
    }

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    // Getters
    getTitle(): string {
        return this.title;
    }
    getAuthor(): string {
        return this.author;
    }
    getGenre(): BookGenre {
        return this.genre;
    }
    getFormat(): BookFormat | string {
        return this.format;
    }
    getLanguage(): Language | string {
        return this.language;
    }
    getPublisher(): string {
        return this.publisher;
    }
    getSpecialEdition(): SpecialEditionDetails {
        return this.specialEdition;
    }
    getPackaging(): PackagingType {
        return this.packaging;
    }
}
