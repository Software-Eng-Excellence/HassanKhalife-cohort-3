import { IItem, ItemCategory } from "./item.model";

// Enums for structured values
export enum CakeType {
    BIRTHDAY = "birthday",
    WEDDING = "wedding",
    ANNIVERSARY = "anniversary",
    GRADUATION = "graduation",
    CUSTOM = "custom"
}

export enum Flavor {
    VANILLA = "vanilla",
    CHOCOLATE = "chocolate",
    STRAWBERRY = "strawberry",
    RED_VELVET = "red velvet",
    CUSTOM = "custom"
}

export enum FrostingType {
    BUTTERCREAM = "buttercream",
    FONDANT = "fondant",
    WHIPPED_CREAM = "whipped cream",
    GANACHE = "ganache",
    CUSTOM = "custom"
}

export enum DecorationType {
    SPRINKLES = "sprinkles",
    FRUIT = "fruit",
    FLOWERS = "flowers",
    CUSTOM = "custom"
}

export enum PackagingType {
    BOX = "box",
    WRAP = "wrap",
    PLASTIC_CONTAINER = "plastic container",
    CUSTOM = "custom"
}

export enum Shape {
    ROUND = "round",
    SQUARE = "square",
    HEART = "heart",
    CUSTOM = "custom"
}

interface Decoration {
    type: DecorationType;
    color: string;
}

interface Frosting {
    type: FrostingType;
    flavor: Flavor | string;
}

export class Cake implements IItem {
    private readonly type: CakeType;
    private readonly flavor: Flavor | string;
    private readonly filling: Flavor | string;
    private readonly size: number;
    private readonly layers: number;
    private readonly frosting: Frosting;
    private readonly decoration: Decoration;
    private readonly customMessage: string;
    private readonly shape: Shape;
    private readonly allergies: string[];
    private readonly specialIngredients: string[];
    private readonly packagingType: PackagingType;

    constructor(
        type: CakeType,
        flavor: Flavor | string,
        filling: Flavor | string,
        size: number,
        layers: number,
        frosting: Frosting,
        decoration: Decoration,
        customMessage: string,
        shape: Shape,
        allergies: string[],
        specialIngredients: string[],
        packagingType: PackagingType
    ) {
        this.type = type;
        this.flavor = flavor;
        this.filling = filling;
        this.size = size;
        this.layers = layers;
        this.frosting = frosting;
        this.decoration = decoration;
        this.customMessage = customMessage;
        this.shape = shape;
        this.allergies = allergies;
        this.specialIngredients = specialIngredients;
        this.packagingType = packagingType;
    }

    getCategory(): ItemCategory {
        return ItemCategory.CAKE;
    }

    // Getters
    getType(): CakeType {
        return this.type;
    }
    getFlavor(): Flavor | string {
        return this.flavor;
    }
    getFilling(): Flavor | string {
        return this.filling;
    }
    getSize(): number {
        return this.size;
    }
    getLayers(): number {
        return this.layers;
    }
    getFrosting(): Frosting {
        return this.frosting;
    }
    getDecoration(): Decoration {
        return this.decoration;
    }
    getCustomMessage(): string {
        return this.customMessage;
    }
    getShape(): Shape {
        return this.shape;
    }
    getAllergies(): string[] {
        return this.allergies;
    }
    getSpecialIngredients(): string[] {
        return this.specialIngredients;
    }
    getPackagingType(): PackagingType {
        return this.packagingType;
    }
}
