console.info("%c practice.ts", style);
class Dealership {
    private readonly _dealership: string;
    protected _owner: string = '';
    constructor(dealer: string) {
        this._dealership = dealer;
    }   
    get dealership(): string {
        return this._dealership;
    }
    
    get dealerOwner(): string{
        return this._owner;
    }

    set dealerOwner(owner: string) {
        this._owner = owner;
    }

}

class Cars extends Dealership{
    constructor(public make: string, private models?: string[]){
        super('ISS Autos inc.')        
    }

    printMake(this: Cars){
        return `(Distributed by:${this.dealership}) ${this.make} models => ${this.models ?? '(No models defined.)'}`;
    }
}

//#region Dealership and Cars intances
let car = new Cars('Tesla');
car.dealerOwner = 'Elon Musk';
console.info(car.printMake());

let carRelative = { make: 'Mercedes Benz', printMake: car.printMake };

let bmwCars = new Cars("BMW", ['X5', 'M5']);
console.info(bmwCars.printMake());
//Check object instance
console.info(`carRelative is a type: ${carRelative.constructor.name}, and car is type: ${car.constructor.name}. They both are same class instances? ${carRelative.constructor.name === car.constructor.name}`)


//THIS CANNOT BE ACCESED IN TYPESCRIPT
//Adding some properties at runtime.
Object.defineProperties(carRelative, {
    objConstructor: { value: carRelative.constructor.name, writable: true} //if writable is not set, it comes false by default *(as enumerable and configurable too).
});
//#endregion

