import { IMapper } from '../interfaces/mapper.interface';
import { ToyBuilder } from '../builders/toy.builder';
import { Toy } from '../toy.model';

export class ToyMapper implements IMapper<string[], Toy> {

    map(data: string[]): Toy {
        return ToyBuilder.create()
            .setType(data[1])
            .setAgeGroup(data[2])
            .setBrand(data[3])
            .setMaterial(data[4])
            .setBatteryRequired(data[5].toLowerCase() === 'yes' || data[5].toLowerCase() === 'true')
            .setEducational(data[6].toLowerCase() === 'yes' || data[6].toLowerCase() === 'true')
            .build();
    }

    reverseMap(toy: Toy): string[] {
        return [
            toy.getType(),
            toy.getAgeGroup(),
            toy.getBrand(),
            toy.getMaterial(),
            toy.isBatteryRequired() ? 'Yes' : 'No',
            toy.isEducational() ? 'Yes' : 'No'
        ];

    }
}