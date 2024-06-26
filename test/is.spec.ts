import { Unsure, configGlobalUnsure } from "../src/index";
jest.setTimeout(6000 * 1000);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Is', () => {
  beforeAll(() => {
    const groqApiKey = process.env['GROQ_API_KEY'] as string;
    configGlobalUnsure({ groqApiKey });
  });
  test('should yield true', async () => {
    expect(await Unsure("Lion").is("Mammal")).toBe(true);
    expect(await Unsure("Shark").is("Dangerous")).toBe(true);
    expect(await Unsure("Rose").is("a type of flower")).toBe(true);
    expect(await Unsure("Sun").is("Star")).toBe(true);
    expect(await Unsure("Dog").is("Pet")).toBe(true);
    expect(await Unsure("Apple").is("Fruit")).toBe(true);
    expect(await Unsure("Eagle").is("Bird")).toBe(true);
    expect(await Unsure("Computer").is("Electronic device")).toBe(true);
    expect(await Unsure("Car").is("Vehicle")).toBe(true);
    expect(await Unsure("Tree").is("Plant")).toBe(true);
    expect(await Unsure("Banana").is("Fruit")).toBe(true);
    await wait(30000);
    expect(await Unsure("Whale").is("Mammal")).toBe(true);
    expect(await Unsure("Tulip").is("a type of flower")).toBe(true);
    expect(await Unsure("Earth").is("Planet")).toBe(true);
    expect(await Unsure("Cat").is("Pet")).toBe(true);
    expect(await Unsure("Orange").is("Fruit")).toBe(true);
    expect(await Unsure("Hawk").is("Bird")).toBe(true);
    expect(await Unsure("Laptop").is("Electronic device")).toBe(true);
    expect(await Unsure("Bus").is("Vehicle")).toBe(true);
    expect(await Unsure("Grass").is("Plant")).toBe(true);
    expect(await Unsure("Strawberry").is("Fruit")).toBe(true);
    expect(await Unsure("Dolphin").is("Mammal")).toBe(true);
    await wait(30000);
    expect(await Unsure("Lily").is("a type of flower")).toBe(true);
    expect(await Unsure("Mars").is("Planet")).toBe(true);
    expect(await Unsure("Hamster").is("Pet")).toBe(true);
    expect(await Unsure("Grape").is("Fruit")).toBe(true);
    expect(await Unsure("Penguin").is("Bird")).toBe(true);
    expect(await Unsure("Smartphone").is("Electronic device")).toBe(true);
    expect(await Unsure("Bike").is("Vehicle")).toBe(true);
    expect(await Unsure("Cactus").is("Plant")).toBe(true);
    expect(await Unsure("Blueberry").is("Fruit")).toBe(true);
    expect(await Unsure("Elephant").is("Mammal")).toBe(true);
    expect(await Unsure("Daisy").is("a type of flower")).toBe(true);
    await wait(30000);
    expect(await Unsure("Jupiter").is("Planet")).toBe(true);
    expect(await Unsure("Rabbit").is("Pet")).toBe(true);
    expect(await Unsure("Cherry").is("Fruit")).toBe(true);
    expect(await Unsure("Owl").is("Bird")).toBe(true);
    expect(await Unsure("Television").is("Electronic device")).toBe(true);
    expect(await Unsure("Truck").is("Vehicle")).toBe(true);
    expect(await Unsure("Fern").is("Plant")).toBe(true);
    expect(await Unsure("Raspberry").is("Fruit")).toBe(true);
    expect(await Unsure("Tiger").is("Mammal")).toBe(true);
    expect(await Unsure("Sunflower").is("a type of flower")).toBe(true);
    expect(await Unsure("Saturn").is("Planet")).toBe(true);
    await wait(30000);
    expect(await Unsure("Parrot").is("Pet")).toBe(true);
    expect(await Unsure("Watermelon").is("Fruit")).toBe(true);
    expect(await Unsure("Sparrow").is("Bird")).toBe(true);
    expect(await Unsure("Radio").is("Electronic device")).toBe(true);
    expect(await Unsure("Motorcycle").is("Vehicle")).toBe(true);
    expect(await Unsure("Bamboo").is("Plant")).toBe(true);
    expect(await Unsure("Blackberry").is("Fruit")).toBe(true);
    expect(await Unsure("Bear").is("Mammal")).toBe(true);
    expect(await Unsure("Orchid").is("a type of flower")).toBe(true);
    expect(await Unsure("Neptune").is("Planet")).toBe(true);
    await wait(30000);
    expect(await Unsure("Guinea Pig").is("Pet")).toBe(true);
    expect(await Unsure("Peach").is("Fruit")).toBe(true);
    expect(await Unsure("Falcon").is("Bird")).toBe(true);
    expect(await Unsure("Microwave").is("Electronic device")).toBe(true);
    expect(await Unsure("Van").is("Vehicle")).toBe(true);
    expect(await Unsure("Pine").is("Tree")).toBe(true);
    expect(await Unsure("Plum").is("Fruit")).toBe(true);
    expect(await Unsure("Wolf").is("Mammal")).toBe(true);
    expect(await Unsure("Violet").is("a type of flower")).toBe(true);
    expect(await Unsure("Uranus").is("Planet")).toBe(true);
    expect(await Unsure("Ferret").is("Pet")).toBe(true);
    await wait(30000);
    expect(await Unsure("Pear").is("Fruit")).toBe(true);
    expect(await Unsure("Flamingo").is("Bird")).toBe(true);
    expect(await Unsure("Refrigerator").is("Electronic device")).toBe(true);
    expect(await Unsure("SUV").is("Vehicle")).toBe(true);
    expect(await Unsure("Maple").is("Plant")).toBe(true);
    expect(await Unsure("Kiwi").is("Fruit")).toBe(true);
    expect(await Unsure("Horse").is("Mammal")).toBe(true);
    expect(await Unsure("Daffodil").is("a type of flower")).toBe(true);
    expect(await Unsure("Pluto").is("Dwarf Planet")).toBe(true);
    expect(await Unsure("The box turtle").is("Pet")).toBe(true);
    expect(await Unsure("Pineapple").is("Fruit")).toBe(true);
    await wait(30000);
    expect(await Unsure("Crow").is("Bird")).toBe(true);
    expect(await Unsure("Washing Machine").is("Electronic device")).toBe(true);
    expect(await Unsure("Scooter").is("Vehicle")).toBe(true);
    expect(await Unsure("Cedar").is("Plant")).toBe(true);
    expect(await Unsure("Papaya").is("Fruit")).toBe(true);
    expect(await Unsure("Monkey").is("Mammal")).toBe(true);
    expect(await Unsure("Carnation").is("a type of Flower")).toBe(true);
    expect(await Unsure("Galaxy").is("Collection of Star Systems")).toBe(true);
    expect(await Unsure("Goldfish").is("Pet")).toBe(true);
    expect(await Unsure("Mango").is("Fruit")).toBe(true);
    expect(await Unsure("Pigeon").is("Bird")).toBe(true);
    await wait(30000);
    expect(await Unsure("Dishwasher").is("Electronic device")).toBe(true);
    expect(await Unsure("Tractor").is("Vehicle")).toBe(true);
    expect(await Unsure("Palm").is("Plant")).toBe(true);
    expect(await Unsure("Lemon").is("Fruit")).toBe(true);
    expect(await Unsure("Kangaroo").is("Mammal")).toBe(true);
    expect(await Unsure("Marigold").is("a type of flower")).toBe(true);
  });

  test('should yield false', async () => {
    expect(await Unsure("Lion").is("Reptile")).toBe(false);
    expect(await Unsure("Shark").is("Mammal")).toBe(false);
    expect(await Unsure("Rose").is("Tree")).toBe(false);
    expect(await Unsure("Sun").is("Planet")).toBe(false);
    expect(await Unsure("Dog").is("Reptile")).toBe(false);
    expect(await Unsure("Apple").is("Vegetable")).toBe(false);
    expect(await Unsure("Eagle").is("Mammal")).toBe(false);
    expect(await Unsure("Computer").is("Furniture")).toBe(false);
    expect(await Unsure("Car").is("Animal")).toBe(false);
    expect(await Unsure("Tree").is("a type of Flower")).toBe(false);
    await wait(30000);
    expect(await Unsure("Banana").is("Meat")).toBe(false);
    expect(await Unsure("Whale").is("Bird")).toBe(false);
    expect(await Unsure("Tulip").is("Fruit")).toBe(false);
    expect(await Unsure("Earth").is("Star")).toBe(false);
    expect(await Unsure("Cat").is("Bird")).toBe(false);
    expect(await Unsure("Orange").is("Meat")).toBe(false);
    expect(await Unsure("Hawk").is("Mammal")).toBe(false);
    expect(await Unsure("Laptop").is("Fridge type")).toBe(false);
    expect(await Unsure("Bus").is("Plant")).toBe(false);
    expect(await Unsure("Grass").is("Animal")).toBe(false);
    expect(await Unsure("Strawberry").is("Meat")).toBe(false);
    await wait(30000);
    expect(await Unsure("Dolphin").is("Reptile")).toBe(false);
    expect(await Unsure("Lily").is("Vegetable")).toBe(false);
    expect(await Unsure("Mars").is("Star")).toBe(false);
    expect(await Unsure("Hamster").is("Bird")).toBe(false);
    expect(await Unsure("Grape").is("Meat")).toBe(false);
    expect(await Unsure("Penguin").is("Mammal")).toBe(false);
    expect(await Unsure("Smartphone").is("Fridge type")).toBe(false);
    expect(await Unsure("Bike").is("Animal")).toBe(false);
    expect(await Unsure("Cactus").is("Animal")).toBe(false);
    expect(await Unsure("Blueberry").is("Meat")).toBe(false);
    expect(await Unsure("Elephant").is("Bird")).toBe(false);
    await wait(30000);
    expect(await Unsure("Daisy").is("Tree")).toBe(false);
    expect(await Unsure("Jupiter").is("Star")).toBe(false);
    expect(await Unsure("Rabbit").is("Bird")).toBe(false);
    expect(await Unsure("Cherry").is("Meat")).toBe(false);
    expect(await Unsure("Owl").is("Mammal")).toBe(false);
    expect(await Unsure("Television").is("Furniture")).toBe(false);
    expect(await Unsure("Truck").is("Plant")).toBe(false);
    expect(await Unsure("Fern").is("Animal")).toBe(false);
    expect(await Unsure("Raspberry").is("Meat")).toBe(false);
    expect(await Unsure("Tiger").is("Bird")).toBe(false);
    expect(await Unsure("Sunflower").is("Fruit")).toBe(false);
    await wait(30000);
    expect(await Unsure("Saturn").is("Star")).toBe(false);
    expect(await Unsure("Parrot").is("Mammal")).toBe(false);
    expect(await Unsure("Watermelon").is("Meat")).toBe(false);
    expect(await Unsure("Sparrow").is("Mammal")).toBe(false);
    expect(await Unsure("Radio").is("Furniture")).toBe(false);
    expect(await Unsure("Motorcycle").is("Plant")).toBe(false);
    expect(await Unsure("Bamboo").is("Animal")).toBe(false);
    expect(await Unsure("Blackberry").is("Meat")).toBe(false);
    expect(await Unsure("Bear").is("Bird")).toBe(false);
    expect(await Unsure("Orchid").is("Fruit")).toBe(false);
    expect(await Unsure("Neptune").is("Star")).toBe(false);
    await wait(30000);
    expect(await Unsure("Guinea Pig").is("Bird")).toBe(false);
    expect(await Unsure("Peach").is("Meat")).toBe(false);
    expect(await Unsure("Falcon").is("Mammal")).toBe(false);
    expect(await Unsure("Microwave").is("Furniture")).toBe(false);
    expect(await Unsure("Van").is("Animal")).toBe(false);
    expect(await Unsure("Pine").is("Animal")).toBe(false);
    expect(await Unsure("Plum").is("Meat")).toBe(false);
    expect(await Unsure("Wolf").is("Bird")).toBe(false);
    expect(await Unsure("Violet").is("Tree")).toBe(false);
    expect(await Unsure("Uranus").is("Star")).toBe(false);
    expect(await Unsure("Ferret").is("Bird")).toBe(false);
    await wait(30000);
    expect(await Unsure("Pear").is("Meat")).toBe(false);
    expect(await Unsure("Flamingo").is("Mammal")).toBe(false);
    expect(await Unsure("Refrigerator").is("Food")).toBe(false);
    expect(await Unsure("SUV").is("Plant")).toBe(false);
    expect(await Unsure("Maple").is("Animal")).toBe(false);
    expect(await Unsure("Kiwi").is("Meat")).toBe(false);
    expect(await Unsure("Horse").is("Bird")).toBe(false);
    expect(await Unsure("Daffodil").is("Tree")).toBe(false);
    expect(await Unsure("Pluto").is("Star")).toBe(false);
    expect(await Unsure("Turtle").is("Mammal")).toBe(false);
    expect(await Unsure("Pineapple").is("Meat")).toBe(false);
    await wait(30000);
    expect(await Unsure("Crow").is("Mammal")).toBe(false);
    expect(await Unsure("Washing Machine").is("Furniture")).toBe(false);
    expect(await Unsure("Scooter").is("Animal")).toBe(false);
    expect(await Unsure("Cedar").is("Animal")).toBe(false);
    expect(await Unsure("Papaya").is("Meat")).toBe(false);
    expect(await Unsure("Monkey").is("Bird")).toBe(false);
    expect(await Unsure("Carnation").is("Tree")).toBe(false);
    expect(await Unsure("Galaxy").is("Planet")).toBe(false);
    expect(await Unsure("Goldfish").is("Mammal")).toBe(false);
    expect(await Unsure("Mango").is("Meat")).toBe(false);
    expect(await Unsure("Pigeon").is("Mammal")).toBe(false);
    await wait(30000);
    expect(await Unsure("Dishwasher").is("Furniture")).toBe(false);
    expect(await Unsure("Tractor").is("Animal")).toBe(false);
    expect(await Unsure("Palm").is("Animal")).toBe(false);
    expect(await Unsure("Lemon").is("Meat")).toBe(false);
    expect(await Unsure("Kangaroo").is("Bird")).toBe(false);
    expect(await Unsure("Marigold").is("Tree")).toBe(false);
  });
});