import { CakeBuilder } from '../../src/models/builders/cake.builder';
import { CakeType, Flavor, FrostingType, DecorationType, PackagingType, Shape } from '../../src/models/cake.model';

describe('CakeBuilder', () => {
    let builder: CakeBuilder;

    beforeEach(() => {
        builder = new CakeBuilder();
    });

    it('should create a cake with default values when all required fields are set', () => {
        const cake = builder
            .setFlavor(Flavor.VANILLA)
            .setFrosting(FrostingType.BUTTERCREAM)
            .setDecoration(DecorationType.SPRINKLES)
            .build();

        expect(cake.getType()).toBe(CakeType.CUSTOM);
        expect(cake.getFlavor()).toBe(Flavor.VANILLA);
        expect(cake.getSize()).toBe(8);
        expect(cake.getLayers()).toBe(1);
        expect(cake.getShape()).toBe(Shape.ROUND);
        expect(cake.getAllergies()).toEqual([]);
        expect(cake.getSpecialIngredients()).toEqual([]);
        expect(cake.getPackagingType()).toBe(PackagingType.BOX);
    });

    it('should throw error when missing required fields', () => {
        expect(() => builder.build()).toThrow("Missing required fields: type, flavor, frosting, or decoration.");
    });

    it('should throw error when missing flavor', () => {
        builder.setFrosting(FrostingType.BUTTERCREAM).setDecoration(DecorationType.SPRINKLES);
        expect(() => builder.build()).toThrow("Missing required fields: type, flavor, frosting, or decoration.");
    });

    it('should throw error when missing frosting', () => {
        builder.setFlavor(Flavor.CHOCOLATE).setDecoration(DecorationType.SPRINKLES);
        expect(() => builder.build()).toThrow("Missing required fields: type, flavor, frosting, or decoration.");
    });

    it('should throw error when missing decoration', () => {
        builder.setFlavor(Flavor.CHOCOLATE).setFrosting(FrostingType.BUTTERCREAM);
        expect(() => builder.build()).toThrow("Missing required fields: type, flavor, frosting, or decoration.");
    });

    it('should set the cake type', () => {
        builder.setType(CakeType.BIRTHDAY)
               .setFlavor(Flavor.CHOCOLATE)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getType()).toBe(CakeType.BIRTHDAY);
    });

    it('should set different cake types', () => {
        const types = [
            CakeType.BIRTHDAY,
            CakeType.WEDDING,
            CakeType.ANNIVERSARY,
            CakeType.GRADUATION,
            CakeType.CUSTOM
        ];

        types.forEach(type => {
            const cake = new CakeBuilder()
                .setType(type)
                .setFlavor(Flavor.VANILLA)
                .setFrosting(FrostingType.BUTTERCREAM)
                .setDecoration(DecorationType.SPRINKLES)
                .build();
            expect(cake.getType()).toBe(type);
        });
    });

    it('should set the flavor with enum value', () => {
        builder.setFlavor(Flavor.RED_VELVET)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getFlavor()).toBe(Flavor.RED_VELVET);
    });

    it('should set the flavor with custom string', () => {
        builder.setFlavor("Lemon")
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getFlavor()).toBe("Lemon");
    });

    it('should set the filling', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFilling(Flavor.STRAWBERRY)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getFilling()).toBe(Flavor.STRAWBERRY);
    });

    it('should set the filling with custom string', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFilling("Raspberry jam")
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getFilling()).toBe("Raspberry jam");
    });

    it('should set the size', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setSize(12)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getSize()).toBe(12);
    });

    it('should set the layers', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setLayers(3)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        expect(cake.getLayers()).toBe(3);
    });

    it('should throw error for zero or negative layers', () => {
        expect(() => builder.setLayers(0)).toThrow("Layers must be greater than 0.");
        expect(() => builder.setLayers(-1)).toThrow("Layers must be greater than 0.");
    });

    it('should set frosting with type and flavor', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.GANACHE, Flavor.CHOCOLATE)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        const frosting = cake.getFrosting();
        expect(frosting.type).toBe(FrostingType.GANACHE);
        expect(frosting.flavor).toBe(Flavor.CHOCOLATE);
    });

    it('should set frosting with default vanilla flavor', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.FONDANT)
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        const frosting = cake.getFrosting();
        expect(frosting.type).toBe(FrostingType.FONDANT);
        expect(frosting.flavor).toBe(Flavor.VANILLA);
    });

    it('should set frosting with custom flavor string', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM, "Mint")
               .setDecoration(DecorationType.SPRINKLES);
        const cake = builder.build();
        const frosting = cake.getFrosting();
        expect(frosting.type).toBe(FrostingType.BUTTERCREAM);
        expect(frosting.flavor).toBe("Mint");
    });

    it('should set decoration with type and color', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.FLOWERS, "pink");
        const cake = builder.build();
        const decoration = cake.getDecoration();
        expect(decoration.type).toBe(DecorationType.FLOWERS);
        expect(decoration.color).toBe("pink");
    });

    it('should set decoration with default white color', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.FRUIT);
        const cake = builder.build();
        const decoration = cake.getDecoration();
        expect(decoration.type).toBe(DecorationType.FRUIT);
        expect(decoration.color).toBe("white");
    });

    it('should set custom message', () => {
        const message = "Happy Birthday!";
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setCustomMessage(message);
        const cake = builder.build();
        expect(cake.getCustomMessage()).toBe(message);
    });

    it('should set the shape', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setShape(Shape.HEART);
        const cake = builder.build();
        expect(cake.getShape()).toBe(Shape.HEART);
    });

    it('should set different shapes', () => {
        const shapes = [Shape.ROUND, Shape.SQUARE, Shape.HEART, Shape.CUSTOM];

        shapes.forEach(shape => {
            const cake = new CakeBuilder()
                .setFlavor(Flavor.VANILLA)
                .setFrosting(FrostingType.BUTTERCREAM)
                .setDecoration(DecorationType.SPRINKLES)
                .setShape(shape)
                .build();
            expect(cake.getShape()).toBe(shape);
        });
    });

    it('should add a single allergy', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addAllergy("nuts");
        const cake = builder.build();
        expect(cake.getAllergies()).toContain("nuts");
        expect(cake.getAllergies()).toHaveLength(1);
    });

    it('should add multiple allergies individually', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addAllergy("nuts")
               .addAllergy("dairy");
        const cake = builder.build();
        const allergies = cake.getAllergies();
        expect(allergies).toContain("nuts");
        expect(allergies).toContain("dairy");
        expect(allergies).toHaveLength(2);
    });

    it('should set all allergies at once', () => {
        const allergies = ["nuts", "dairy", "gluten"];
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setAllergies(allergies);
        const cake = builder.build();
        expect(cake.getAllergies()).toEqual(allergies);
    });

    it('should replace existing allergies when setting new ones', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addAllergy("nuts")
               .setAllergies(["dairy", "eggs"]);
        const cake = builder.build();
        const allergies = cake.getAllergies();
        expect(allergies).not.toContain("nuts");
        expect(allergies).toContain("dairy");
        expect(allergies).toContain("eggs");
        expect(allergies).toHaveLength(2);
    });

    it('should add a single special ingredient', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addSpecialIngredient("vanilla extract");
        const cake = builder.build();
        expect(cake.getSpecialIngredients()).toContain("vanilla extract");
        expect(cake.getSpecialIngredients()).toHaveLength(1);
    });

    it('should add multiple special ingredients individually', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addSpecialIngredient("vanilla extract")
               .addSpecialIngredient("rum");
        const cake = builder.build();
        const ingredients = cake.getSpecialIngredients();
        expect(ingredients).toContain("vanilla extract");
        expect(ingredients).toContain("rum");
        expect(ingredients).toHaveLength(2);
    });

    it('should set all special ingredients at once', () => {
        const ingredients = ["vanilla extract", "rum", "fresh berries"];
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setSpecialIngredients(ingredients);
        const cake = builder.build();
        expect(cake.getSpecialIngredients()).toEqual(ingredients);
    });

    it('should replace existing special ingredients when setting new ones', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .addSpecialIngredient("vanilla extract")
               .setSpecialIngredients(["rum", "chocolate chips"]);
        const cake = builder.build();
        const ingredients = cake.getSpecialIngredients();
        expect(ingredients).not.toContain("vanilla extract");
        expect(ingredients).toContain("rum");
        expect(ingredients).toContain("chocolate chips");
        expect(ingredients).toHaveLength(2);
    });

    it('should set packaging type', () => {
        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setPackagingType(PackagingType.WRAP);
        const cake = builder.build();
        expect(cake.getPackagingType()).toBe(PackagingType.WRAP);
    });

    it('should set different packaging types', () => {
        const packagingTypes = [
            PackagingType.BOX,
            PackagingType.WRAP,
            PackagingType.PLASTIC_CONTAINER,
            PackagingType.CUSTOM
        ];

        packagingTypes.forEach(packagingType => {
            const cake = new CakeBuilder()
                .setFlavor(Flavor.VANILLA)
                .setFrosting(FrostingType.BUTTERCREAM)
                .setDecoration(DecorationType.SPRINKLES)
                .setPackagingType(packagingType)
                .build();
            expect(cake.getPackagingType()).toBe(packagingType);
        });
    });

    it('should chain all methods together', () => {
        const cake = builder
            .setType(CakeType.WEDDING)
            .setFlavor(Flavor.RED_VELVET)
            .setFilling(Flavor.CHOCOLATE)
            .setSize(12)
            .setLayers(3)
            .setFrosting(FrostingType.BUTTERCREAM, Flavor.VANILLA)
            .setDecoration(DecorationType.FLOWERS, "red")
            .setCustomMessage("Congratulations!")
            .setShape(Shape.SQUARE)
            .addAllergy("nuts")
            .addSpecialIngredient("edible gold")
            .setPackagingType(PackagingType.BOX)
            .build();

        expect(cake.getType()).toBe(CakeType.WEDDING);
        expect(cake.getFlavor()).toBe(Flavor.RED_VELVET);
        expect(cake.getFilling()).toBe(Flavor.CHOCOLATE);
        expect(cake.getSize()).toBe(12);
        expect(cake.getLayers()).toBe(3);
        expect(cake.getFrosting().type).toBe(FrostingType.BUTTERCREAM);
        expect(cake.getFrosting().flavor).toBe(Flavor.VANILLA);
        expect(cake.getDecoration().type).toBe(DecorationType.FLOWERS);
        expect(cake.getDecoration().color).toBe("red");
        expect(cake.getCustomMessage()).toBe("Congratulations!");
        expect(cake.getShape()).toBe(Shape.SQUARE);
        expect(cake.getAllergies()).toContain("nuts");
        expect(cake.getSpecialIngredients()).toContain("edible gold");
        expect(cake.getPackagingType()).toBe(PackagingType.BOX);
    });

    it('should maintain fluent interface for all methods', () => {
        const result = builder
            .setType(CakeType.BIRTHDAY)
            .setFlavor(Flavor.VANILLA)
            .setFilling(Flavor.STRAWBERRY)
            .setSize(10)
            .setLayers(2)
            .setFrosting(FrostingType.BUTTERCREAM)
            .setDecoration(DecorationType.SPRINKLES)
            .setCustomMessage("Happy Birthday!")
            .setShape(Shape.ROUND)
            .addAllergy("nuts")
            .addSpecialIngredient("vanilla extract")
            .setPackagingType(PackagingType.BOX);

        expect(result).toBe(builder);
    });

    it('should create different cake configurations', () => {
        // Birthday cake
        const birthdayCake = new CakeBuilder()
            .setType(CakeType.BIRTHDAY)
            .setFlavor(Flavor.CHOCOLATE)
            .setSize(10)
            .setLayers(2)
            .setFrosting(FrostingType.BUTTERCREAM, Flavor.VANILLA)
            .setDecoration(DecorationType.SPRINKLES, "rainbow")
            .setCustomMessage("Happy Birthday!")
            .build();

        expect(birthdayCake.getType()).toBe(CakeType.BIRTHDAY);
        expect(birthdayCake.getCustomMessage()).toBe("Happy Birthday!");

        // Wedding cake
        const weddingCake = new CakeBuilder()
            .setType(CakeType.WEDDING)
            .setFlavor(Flavor.VANILLA)
            .setSize(14)
            .setLayers(4)
            .setFrosting(FrostingType.FONDANT)
            .setDecoration(DecorationType.FLOWERS, "white")
            .setShape(Shape.ROUND)
            .build();

        expect(weddingCake.getType()).toBe(CakeType.WEDDING);
        expect(weddingCake.getLayers()).toBe(4);
        expect(weddingCake.getDecoration().type).toBe(DecorationType.FLOWERS);
    });

    it('should create deep copy of arrays when setting allergies and ingredients', () => {
        const originalAllergies = ["nuts"];
        const originalIngredients = ["vanilla"];

        builder.setFlavor(Flavor.VANILLA)
               .setFrosting(FrostingType.BUTTERCREAM)
               .setDecoration(DecorationType.SPRINKLES)
               .setAllergies(originalAllergies)
               .setSpecialIngredients(originalIngredients);

        originalAllergies.push("dairy");
        originalIngredients.push("rum");

        const cake = builder.build();
        expect(cake.getAllergies()).toEqual(["nuts"]);
        expect(cake.getSpecialIngredients()).toEqual(["vanilla"]);
    });
});