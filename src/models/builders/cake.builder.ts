import {
    Cake,
    CakeType,
    Flavor,
    FrostingType,
    DecorationType,
    PackagingType,
    Shape,
    Decoration,
    Frosting
} from '../cake.model';


export class CakeBuilder {
    private type: CakeType | string = CakeType.CUSTOM;
    private flavor!: Flavor | string;
    private filling!: Flavor | string;
    private size: number = 8;
    private layers: number = 1;
    private frosting!: Frosting;
    private decoration!: Decoration;
    private customMessage!: string;
    private shape: Shape | string = Shape.ROUND;
    private allergies: string = 'None';
    private specialIngredients: string = 'None';
    private packagingType: PackagingType | string = PackagingType.BOX;

    setType(type: CakeType | string): CakeBuilder {
        this.type = type;
        return this;
    }

    setFlavor(flavor: Flavor | string): CakeBuilder {
        this.flavor = flavor;
        return this;
    }

    setFilling(filling: Flavor | string): CakeBuilder {
        this.filling = filling;
        return this;
    }

    setSize(size: number): CakeBuilder {
        this.size = size;
        return this;
    }
    setLayers(layers: number): CakeBuilder {
        if (layers <= 0) {
            throw new Error("Layers must be greater than 0.");
        }
        this.layers = layers;
        return this;
    }

    setFrosting(type: FrostingType | string, flavor: Flavor | string = Flavor.VANILLA): CakeBuilder {
        this.frosting = { type, flavor };
        return this;
    }

    setDecoration(type: DecorationType | string, color: string = "white"): CakeBuilder {
        this.decoration = { type, color };
        return this;
    }

    setCustomMessage(message: string): CakeBuilder {
        this.customMessage = message;
        return this;
    }

    setShape(shape: Shape | string): CakeBuilder {
        this.shape = shape;
        return this;
    }

    addAllergy(allergy: string): CakeBuilder {
        this.allergies = allergy;
        return this;
    }

    setAllergies(allergies: string): CakeBuilder {
        this.allergies = allergies;
        return this;
    }

    addSpecialIngredient(ingredient: string): CakeBuilder {
        this.specialIngredients = ingredient;
        return this;
    }

    setSpecialIngredients(ingredients: string): CakeBuilder {
        this.specialIngredients = ingredients;
        return this;
    }

    setPackagingType(packagingType: PackagingType | string): CakeBuilder {
        this.packagingType = packagingType;
        return this;
    }

    build(): Cake {
        const requiredFields = [this.type, this.flavor, this.frosting, this.decoration];
        if (requiredFields.some(field => !field)) {
            throw new Error("Missing required fields: type, flavor, frosting, or decoration.");
        }
        return new Cake(
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frosting,
            this.decoration,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType
        );
    }

    static create(): CakeBuilder {
        return new CakeBuilder();
    }

}