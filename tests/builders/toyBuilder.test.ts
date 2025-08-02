import { ToyBuilder } from '../../src/models/builders/toy.builder';
import { ToyType, AgeGroup, MaterialType } from '../../src/models/toy.model';

describe('ToyBuilder', () => {
    let builder: ToyBuilder;

    beforeEach(() => {
        builder = new ToyBuilder();
    });

    it('should create a toy with default values when all required fields are set', () => {
        const toy = builder
            .setType(ToyType.ACTION_FIGURE)
            .setBrand("Test Brand")
            .setMaterial(MaterialType.PLASTIC)
            .build();

        expect(toy.getType()).toBe(ToyType.ACTION_FIGURE);
        expect(toy.getBrand()).toBe("Test Brand");
        expect(toy.getMaterial()).toBe(MaterialType.PLASTIC);
        expect(toy.getAgeGroup()).toBe(AgeGroup.ALL_AGES);
        expect(toy.isBatteryRequired()).toBe(false);
        expect(toy.isEducational()).toBe(false);
    });

    it('should throw error when missing required fields - no type', () => {
        builder.setBrand("Test Brand").setMaterial(MaterialType.PLASTIC);
        expect(() => builder.build()).toThrow("Missing required fields: type, brand, or material.");
    });

    it('should throw error when missing required fields - no brand', () => {
        builder.setType(ToyType.ACTION_FIGURE).setMaterial(MaterialType.PLASTIC);
        expect(() => builder.build()).toThrow("Missing required fields: type, brand, or material.");
    });

    it('should throw error when missing required fields - no material', () => {
        builder.setType(ToyType.ACTION_FIGURE).setBrand("Test Brand");
        expect(() => builder.build()).toThrow("Missing required fields: type, brand, or material.");
    });

    it('should throw error when missing all required fields', () => {
        expect(() => builder.build()).toThrow("Missing required fields: type, brand, or material.");
    });

    it('should set the toy type', () => {
        builder.setType(ToyType.DOLL).setBrand("Barbie").setMaterial(MaterialType.PLASTIC);
        const toy = builder.build();
        expect(toy.getType()).toBe(ToyType.DOLL);
    });

    it('should set different toy types', () => {
        const types = [
            ToyType.ACTION_FIGURE,
            ToyType.DOLL,
            ToyType.PUZZLE,
            ToyType.BOARD_GAME,
            ToyType.EDUCATIONAL_TOY,
            ToyType.STUFFED_ANIMAL
        ];

        types.forEach(type => {
            const toy = new ToyBuilder()
                .setType(type)
                .setBrand("Test Brand")
                .setMaterial(MaterialType.PLASTIC)
                .build();
            expect(toy.getType()).toBe(type);
        });
    });

    it('should set the age group with enum value', () => {
        builder.setType(ToyType.PUZZLE)
               .setBrand("Test Brand")
               .setMaterial(MaterialType.WOOD)
               .setAgeGroup(AgeGroup.PRESCHOOL);
        const toy = builder.build();
        expect(toy.getAgeGroup()).toBe(AgeGroup.PRESCHOOL);
    });

    it('should set the age group with custom string', () => {
        builder.setType(ToyType.PUZZLE)
               .setBrand("Test Brand")
               .setMaterial(MaterialType.WOOD)
               .setAgeGroup("6-10 years");
        const toy = builder.build();
        expect(toy.getAgeGroup()).toBe("6-10 years");
    });

    it('should set different age groups', () => {
        const ageGroups = [
            AgeGroup.INFANT,
            AgeGroup.TODDLER,
            AgeGroup.PRESCHOOL,
            AgeGroup.CHILD,
            AgeGroup.PRETEEN,
            AgeGroup.TEEN,
            AgeGroup.ALL_AGES
        ];

        ageGroups.forEach(ageGroup => {
            const toy = new ToyBuilder()
                .setType(ToyType.EDUCATIONAL_TOY)
                .setBrand("Test Brand")
                .setMaterial(MaterialType.PLASTIC)
                .setAgeGroup(ageGroup)
                .build();
            expect(toy.getAgeGroup()).toBe(ageGroup);
        });
    });

    it('should set the brand', () => {
        builder.setType(ToyType.ACTION_FIGURE)
               .setBrand("LEGO")
               .setMaterial(MaterialType.PLASTIC);
        const toy = builder.build();
        expect(toy.getBrand()).toBe("LEGO");
    });

    it('should set the material with enum value', () => {
        builder.setType(ToyType.PUZZLE)
               .setBrand("Melissa & Doug")
               .setMaterial(MaterialType.WOOD);
        const toy = builder.build();
        expect(toy.getMaterial()).toBe(MaterialType.WOOD);
    });

    it('should set the material with custom string', () => {
        builder.setType(ToyType.STUFFED_ANIMAL)
               .setBrand("Build-A-Bear")
               .setMaterial("Premium Plush");
        const toy = builder.build();
        expect(toy.getMaterial()).toBe("Premium Plush");
    });

    it('should set different material types', () => {
        const materials = [
            MaterialType.PLASTIC,
            MaterialType.WOOD,
            MaterialType.METAL,
            MaterialType.FABRIC,
            MaterialType.FOAM,
            MaterialType.MIXED,
            MaterialType.CUSTOM
        ];

        materials.forEach(material => {
            const toy = new ToyBuilder()
                .setType(ToyType.EDUCATIONAL_TOY)
                .setBrand("Test Brand")
                .setMaterial(material)
                .build();
            expect(toy.getMaterial()).toBe(material);
        });
    });

    it('should set battery required to true', () => {
        builder.setType(ToyType.ACTION_FIGURE)
               .setBrand("Hasbro")
               .setMaterial(MaterialType.PLASTIC)
               .setBatteryRequired(true);
        const toy = builder.build();
        expect(toy.isBatteryRequired()).toBe(true);
    });

    it('should set battery required to false', () => {
        builder.setType(ToyType.PUZZLE)
               .setBrand("Ravensburger")
               .setMaterial(MaterialType.MIXED)
               .setBatteryRequired(false);
        const toy = builder.build();
        expect(toy.isBatteryRequired()).toBe(false);
    });

    it('should set educational to true', () => {
        builder.setType(ToyType.EDUCATIONAL_TOY)
               .setBrand("LeapFrog")
               .setMaterial(MaterialType.PLASTIC)
               .setEducational(true);
        const toy = builder.build();
        expect(toy.isEducational()).toBe(true);
    });

    it('should set educational to false', () => {
        builder.setType(ToyType.ACTION_FIGURE)
               .setBrand("Mattel")
               .setMaterial(MaterialType.PLASTIC)
               .setEducational(false);
        const toy = builder.build();
        expect(toy.isEducational()).toBe(false);
    });

    it('should chain all methods together', () => {
        const toy = builder
            .setType(ToyType.EDUCATIONAL_TOY)
            .setAgeGroup(AgeGroup.PRESCHOOL)
            .setBrand("VTech")
            .setMaterial(MaterialType.PLASTIC)
            .setBatteryRequired(true)
            .setEducational(true)
            .build();

        expect(toy.getType()).toBe(ToyType.EDUCATIONAL_TOY);
        expect(toy.getAgeGroup()).toBe(AgeGroup.PRESCHOOL);
        expect(toy.getBrand()).toBe("VTech");
        expect(toy.getMaterial()).toBe(MaterialType.PLASTIC);
        expect(toy.isBatteryRequired()).toBe(true);
        expect(toy.isEducational()).toBe(true);
    });

    it('should maintain fluent interface for all methods', () => {
        const result = builder
            .setType(ToyType.PUZZLE)
            .setAgeGroup(AgeGroup.CHILD)
            .setBrand("Test Brand")
            .setMaterial(MaterialType.WOOD)
            .setBatteryRequired(false)
            .setEducational(true);

        expect(result).toBe(builder);
    });

    it('should create different toy configurations', () => {
        // Electronic educational toy
        const electronicToy = new ToyBuilder()
            .setType(ToyType.EDUCATIONAL_TOY)
            .setAgeGroup(AgeGroup.TODDLER)
            .setBrand("Fisher-Price")
            .setMaterial(MaterialType.PLASTIC)
            .setBatteryRequired(true)
            .setEducational(true)
            .build();

        expect(electronicToy.getType()).toBe(ToyType.EDUCATIONAL_TOY);
        expect(electronicToy.isBatteryRequired()).toBe(true);
        expect(electronicToy.isEducational()).toBe(true);

        // Simple wooden puzzle
        const woodenPuzzle = new ToyBuilder()
            .setType(ToyType.PUZZLE)
            .setAgeGroup(AgeGroup.PRESCHOOL)
            .setBrand("Melissa & Doug")
            .setMaterial(MaterialType.WOOD)
            .setBatteryRequired(false)
            .setEducational(true)
            .build();

        expect(woodenPuzzle.getType()).toBe(ToyType.PUZZLE);
        expect(woodenPuzzle.getMaterial()).toBe(MaterialType.WOOD);
        expect(woodenPuzzle.isBatteryRequired()).toBe(false);

        // Stuffed animal
        const stuffedAnimal = new ToyBuilder()
            .setType(ToyType.STUFFED_ANIMAL)
            .setAgeGroup(AgeGroup.ALL_AGES)
            .setBrand("Ty")
            .setMaterial(MaterialType.FABRIC)
            .setBatteryRequired(false)
            .setEducational(false)
            .build();

        expect(stuffedAnimal.getType()).toBe(ToyType.STUFFED_ANIMAL);
        expect(stuffedAnimal.getMaterial()).toBe(MaterialType.FABRIC);
        expect(stuffedAnimal.isEducational()).toBe(false);
    });

    it('should handle custom values properly', () => {
        const toy = builder
            .setType(ToyType.BOARD_GAME)
            .setAgeGroup("Special needs children")
            .setBrand("Custom Toy Maker")
            .setMaterial("Eco-friendly bamboo")
            .setBatteryRequired(false)
            .setEducational(true)
            .build();

        expect(toy.getAgeGroup()).toBe("Special needs children");
        expect(toy.getMaterial()).toBe("Eco-friendly bamboo");
    });
});