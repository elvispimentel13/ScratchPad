console.info("%c scribble.ts", style);

// TESTING GENERICS
class Device {
    storage: number;
    storageUnit: string = 'GB';
    price: number;
    brand: string
    constructor(storage: number, price: number, brand: string, storageUnit?: string) {
        this.storage = storage;
        this.price = price;
        this.brand = brand;
        this.storageUnit = (storageUnit ? storageUnit: this.storageUnit);
    }
}

class Phone extends Device {
    model: string;
    constructor(model: string, device: Device) {
        super(device.storage, device.price, device.brand, device.storageUnit);
        this.model = model;
    }
}
type Laptop = {
    memory: number
}

function merging<T extends Device, U>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);   
}

declare interface Device {
    summary<T extends Device | Phone>(device: T): string;
}
Device.prototype.summary = function <T>(device: T) { 
    if(device instanceof Phone){
        console.info(`${device.brand} ${device.model} ${device.storage}${device.storageUnit} - $${device.price.toLocaleString()}`);
    } else if(device instanceof Device) {
        return `${device.brand}:${device.constructor.name} ${device.storage + device.storageUnit}`;
    }
    return '';
}



let device = new Device(256, 1_299, 'Apple');
let phoneIOS = new Phone('iPhone 12 Pro Max', device);
let obj2: Laptop = {memory: 128};
let resObj = merging(phoneIOS, obj2);

device.summary(phoneIOS);
device.summary(resObj);

function deviceCapacity<T extends Device, U extends keyof T>(device: T, prop: U)
{
    return device[prop] + device.storageUnit;
}

if ('storage' in phoneIOS){
    console.info('Device Capacity: ' + deviceCapacity(phoneIOS, 'storage'));
}

class Electronics<T extends Device> {
    type: string = '';
    inventory: T[] = []

    addToInventory(electronic: T, ...others: T[]) {
        this.inventory.push(electronic);
        if(others)
        {
            this.inventory.push(...others);
        }
    }

    removeFromInventory(electronic: T){
        if (this.inventory.indexOf(electronic) === -1){
            return;
        }
        this.inventory.splice(this.inventory.indexOf(electronic));
    }

    clearInventory(){
        //To clear Array and delete references:
        //IIFE is not neccesary, just to get things fresh in mind :D
        (() => { while (this.inventory.length>0) this.inventory.pop(); })();
    }

    getInventory() {
        return [...this.inventory];
    }
}

let phoneDroid = new Phone('Note 15', new Device(128, 2_325, 'Samsung'));
let phoneDroidCopy = phoneDroid;
let phoneDroidCopy2 = {};
phoneDroidCopy2 = structuredClone(phoneDroidCopy) as Device;
device.summary(phoneDroid);
let electronics = new Electronics();
//phoneDroidCopy2 cannot be added to inventory because is not an instance of Device.
electronics.addToInventory(phoneIOS, phoneDroidCopy);
electronics.addToInventory(phoneDroid);
console.info('Inventory after adding:');
console.info(electronics.getInventory());
electronics.removeFromInventory(phoneDroid);
console.info('Inventory after deleting:');
console.info(JSON.stringify(electronics.getInventory()));
electronics.clearInventory();
console.info('Inventory after cleaning:');
console.info(electronics.getInventory());

type Unit =  'KB' | 'MB' | 'GB';
class Bluetooth
{
    connected: boolean = false;
    transferQuota: number = 0;
    quotaUnitPerSecond: Unit = 'MB';
    device?: Device;
    private static instance: Bluetooth;

    private constructor(connected: boolean, transferQuota: number, quotaUnitPerSecond?: Unit, device?: Device)
    {
        if(device){
            this.device = new Device(device.storage, device.price, device.brand);
        }
        this.connected = connected;
        this.transferQuota = transferQuota;
        this.quotaUnitPerSecond = quotaUnitPerSecond || this.quotaUnitPerSecond;
    }

    static getInstance(): Bluetooth{
        if(this.instance){
            return this.instance;
        }
        return this.instance = new Bluetooth(false, 0);
    }

    connectToBT(){
        if(!this.connected && this.device && this.transferQuota > 0){
            this.connected = true;
            let summary = this.device.summary(device);
            console.info(`Device [${summary}] is now connected to BT and have a transfer quota of: ${this.transferQuota+this.quotaUnitPerSecond} per seconds.`);
        } else {
            throw new Error('There is no device, need to assign one first.');
        }

    }
}

let btConnectionDroid = Bluetooth.getInstance();
btConnectionDroid.transferQuota = 10;
try {
    btConnectionDroid.connectToBT();    
} catch (error) {
    if(error){
        console.info(`There were an error: ${error}, i handle it by assigning a device (phoneDroid).`);
        btConnectionDroid.device = phoneDroid;        
        btConnectionDroid.connectToBT();
    }
}

// With partial you can initialize an object with all same props from type in partial, but there is no constructor class reference.
let deviceGeneric: Partial<Device> = {};
deviceGeneric.brand = 'Motorola';
deviceGeneric.price = 1_199;
deviceGeneric.storage = 64;
let summaryWithPartialObj = device.summary(deviceGeneric as Device);
console.info(`Summary method using Partial<Type> object: [summary]=>${summaryWithPartialObj}, [lenght]=> ${summaryWithPartialObj.length}`);
//Now lets create another object, without using Partial<Type>.
let deviceInstanced = new Device(64, 1_128, 'Nokia');
let summaryDeviceInstanced = device.summary?.(deviceInstanced);
console.info(`Now using an instance of Device Class: [summary]=>${summaryDeviceInstanced}, [lenght]=> ${summaryDeviceInstanced.length}`);
//Better approach would be if: summary() is encapsulated in Device class as a static method, but here im trying to get some new knowledge.


// CHECKING VALUES...
console.info(resObj, typeof resObj);
console.info(phoneIOS.constructor.name);