"use strict";
class Dealership {
    constructor(dealer) {
        this._owner = '';
        this._dealership = dealer;
    }
    get dealership() {
        return this._dealership;
    }
    get dealerOwner() {
        return this._owner;
    }
    set dealerOwner(owner) {
        this._owner = owner;
    }
}
class Cars extends Dealership {
    constructor(make, models) {
        super('ISS Autos inc.');
        this.make = make;
        this.models = models;
    }
    printMake() {
        var _a;
        return `(Distributed by:${this.dealership}) ${this.make} models => ${(_a = this.models) !== null && _a !== void 0 ? _a : '(No models defined.)'}`;
    }
}
let car = new Cars('Tesla');
car.dealerOwner = 'Elon Musk';
console.info(car.printMake());
let carRelative = { make: 'Mercedes Benz', printMake: car.printMake };
let bmwCars = new Cars("BMW", ['X5', 'M5']);
console.info(bmwCars.printMake());
console.info(`carRelative is a type: ${carRelative.constructor.name}, and car is type: ${car.constructor.name}. They both are same class instances? ${carRelative.constructor.name === car.constructor.name}`);
Object.defineProperties(carRelative, {
    objConstructor: { value: carRelative.constructor.name, writable: true }
});
//# sourceMappingURL=practice.js.map