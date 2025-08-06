import { Book } from "../book.model";
import { BookBuilder } from "../builders/book.builder";
import { IMapper } from "../interfaces/mapper.interface";

export class BookMapper implements IMapper<string[], Book> {

    map(data: string[]): Book {
        return BookBuilder.create()
            .setTitle(data[1])
            .setAuthor(data[2])
            .setGenre(data[3])
            .setFormat(data[4])
            .setLanguage(data[5])
            .setPublisher(data[6])
            .setSpecialEdition(data[7])
            .setPackaging(data[8])
            .build();
    }

    reverseMap(data: Book): string[] {
        return [
            data.getTitle(),
            data.getAuthor(),
            data.getGenre(),
            data.getFormat(),
            data.getLanguage(),
            data.getPublisher(),
            data.getSpecialEdition().toString(),
            data.getPackaging().toString()
        ];
    }
}
