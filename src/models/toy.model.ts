import { IItem, ItemCategory } from "./interfaces/item.interface";

// Enums for controlled values
export enum ToyType {
    ACTION_FIGURE = "action figure",
    DOLL = "doll",
    PUZZLE = "puzzle",
    BOARD_GAME = "board game",
    EDUCATIONAL_TOY = "educational toy",
    STUFFED_ANIMAL = "stuffed animal"
}

export enum AgeGroup {
    INFANT = "0-1 years",
    TODDLER = "1-3 years",
    PRESCHOOL = "3-5 years",
    CHILD = "5-8 years",
    PRETEEN = "8-12 years",
    TEEN = "12+ years",
    ALL_AGES = "all ages"
}

export enum MaterialType {
    PLASTIC = "plastic",
    WOOD = "wood",
    METAL = "metal",
    FABRIC = "fabric",
    FOAM = "foam",
    MIXED = "mixed",
    CUSTOM = "custom"
}

export class Toy implements IItem {
    private readonly type: ToyType | string;
    private readonly ageGroup: AgeGroup | string;
    private readonly brand: string;
    private readonly material: MaterialType | string;
    private readonly batteryRequired: boolean;
    private readonly educational: boolean;

    constructor(
        type: ToyType | string,
        ageGroup: AgeGroup | string,
        brand: string,
        material: MaterialType | string,
        batteryRequired: boolean,
        educational: boolean
    ) {
        this.type = type;
        this.ageGroup = ageGroup;
        this.brand = brand;
        this.material = material;
        this.batteryRequired = batteryRequired;
        this.educational = educational;
    }

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }

    // Getters
    getType(): ToyType | string{
        return this.type;
    }
    getAgeGroup(): AgeGroup | string {
        return this.ageGroup;
    }
    getBrand(): string {
        return this.brand;
    }
    getMaterial(): MaterialType | string {
        return this.material;
    }
    isBatteryRequired(): boolean {
        return this.batteryRequired;
    }
    isEducational(): boolean {
        return this.educational;
    }
}
