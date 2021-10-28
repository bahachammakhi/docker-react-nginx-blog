/*
 * This is just a quick idea/sketch
*/


const DrinkType = Object.freeze({
    americano: 1,
    latte: 2,
    tea: 3,
    macchiato: 4,
});

class Drink {
    constructor(size, type, count) {
        this.size = size;
        this.type = type;
        this.count = count;
    }
}
