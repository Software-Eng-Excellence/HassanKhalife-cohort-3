import { 
    Cake, 
    CakeType, 
    Flavor, 
    FrostingType, 
    DecorationType, 
    PackagingType, 
    Shape 
} from '../cake.model';

interface Decoration {
    type: DecorationType;
    color: string;
}

interface Frosting {
    type: FrostingType;
    flavor: Flavor | string;
}

export class CakeBuilder {
    private type: CakeType = CakeType.CUSTOM;
    private flavor!: Flavor | string;
    private filling!: Flavor | string ;
    private size: number = 8;
    private layers: number = 1;
    private frosting!: Frosting;
    private decoration!: Decoration;
    private customMessage!: string;
    private shape: Shape = Shape.ROUND;
    private allergies: string[] = [];
    private specialIngredients: string[] = [];
    private packagingType: PackagingType = PackagingType.BOX;

    setType(type: CakeType): CakeBuilder {
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

    setFrosting(type: FrostingType, flavor: Flavor | string = Flavor.VANILLA): CakeBuilder {
        this.frosting = { type, flavor };
        return this;
    }

    setDecoration(type: DecorationType, color: string = "white"): CakeBuilder {
        this.decoration = { type, color };
        return this;
    }

    setCustomMessage(message: string): CakeBuilder {
        this.customMessage = message;
        return this;
    }

    setShape(shape: Shape): CakeBuilder {
        this.shape = shape;
        return this;
    }

    addAllergy(allergy: string): CakeBuilder {
        this.allergies.push(allergy);
        return this;
    }

    setAllergies(allergies: string[]): CakeBuilder {
        this.allergies = [...allergies];
        return this;
    }

    addSpecialIngredient(ingredient: string): CakeBuilder {
        this.specialIngredients.push(ingredient);
        return this;
    }

    setSpecialIngredients(ingredients: string[]): CakeBuilder {
        this.specialIngredients = [...ingredients];
        return this;
    }

    setPackagingType(packagingType: PackagingType): CakeBuilder {
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
}