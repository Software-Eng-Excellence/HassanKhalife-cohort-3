import { Cake } from "models/cake.model";
import { IMapper } from "../interfaces/mapper.interface";
import { CakeBuilder } from "../builders/cake.builder";

export class CakeMapper implements IMapper<string[], Cake> {
    map(data: string[]): Cake {
        return CakeBuilder.create()
            .setType(data[1])
            .setFlavor(data[2])
            .setFilling(data[3])
            .setSize(parseInt(data[4]))
            .setLayers(parseInt(data[5]))
            .setFrosting(data[6], data[7])
            .setDecoration(data[8], data[9])
            .setCustomMessage(data[10])
            .setShape(data[11])
            .setAllergies(data[12])
            .setSpecialIngredients(data[13])
            .setPackagingType(data[14])
            .build();
    }

    reverseMap(cake: Cake): string[] {
        return [
            cake.getType(),
            cake.getFlavor(),
            cake.getFilling(),
            cake.getSize().toString(),
            cake.getLayers().toString(),
            cake.getFrosting().type,
            cake.getFrosting().flavor,
            cake.getDecoration().type,
            cake.getDecoration().color,
            cake.getCustomMessage(),
            cake.getShape(),
            cake.getAllergies(),
            cake.getSpecialIngredients(),
            cake.getPackagingType()
        ];
    }
}
