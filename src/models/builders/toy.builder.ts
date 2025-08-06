import {
    Toy,
    ToyType,
    AgeGroup,
    MaterialType
} from '../toy.model';

export class ToyBuilder {
    private type!: ToyType | string;
    private ageGroup: AgeGroup | string = AgeGroup.ALL_AGES;
    private brand!: string;
    private material!: MaterialType | string;
    private batteryRequired: boolean = false;
    private educational: boolean = false;

    setType(type: ToyType | string): ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: AgeGroup | string): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: MaterialType | string): ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: boolean): ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: boolean): ToyBuilder {
        this.educational = educational;
        return this;
    }

    build(): Toy {
        const requiredFields = [this.type, this.brand, this.material];
        if (requiredFields.some(field => !field)) {
            throw new Error("Missing required fields: type, brand, or material.");
        }

        return new Toy(
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational
        );
    }

    static create(): ToyBuilder {
        return new ToyBuilder();
    }

}