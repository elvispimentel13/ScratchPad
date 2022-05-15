"use strict";
var _a;
console.info("%c scribble.ts", style);
class Device {
    constructor(storage, price, brand, storageUnit) {
        this.storageUnit = 'GB';
        this.storage = storage;
        this.price = price;
        this.brand = brand;
        this.storageUnit = (storageUnit ? storageUnit : this.storageUnit);
    }
}
class Phone extends Device {
    constructor(model, device) {
        super(device.storage, device.price, device.brand, device.storageUnit);
        this.model = model;
    }
}
function merging(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
Device.prototype.summary = function (device) {
    if (device instanceof Phone) {
        console.info(`${device.brand} ${device.model} ${device.storage}${device.storageUnit} - $${device.price.toLocaleString()}`);
    }
    else if (device instanceof Device) {
        return `${device.brand}:${device.constructor.name} ${device.storage + device.storageUnit}`;
    }
    return '';
};
let device = new Device(256, 1299, 'Apple');
let phoneIOS = new Phone('iPhone 12 Pro Max', device);
let obj2 = { memory: 128 };
let resObj = merging(phoneIOS, obj2);
device.summary(phoneIOS);
device.summary(resObj);
function deviceCapacity(device, prop) {
    return device[prop] + device.storageUnit;
}
if ('storage' in phoneIOS) {
    console.info('Device Capacity: ' + deviceCapacity(phoneIOS, 'storage'));
}
class Electronics {
    constructor() {
        this.type = '';
        this.inventory = [];
    }
    addToInventory(electronic, ...others) {
        this.inventory.push(electronic);
        if (others) {
            this.inventory.push(...others);
        }
    }
    removeFromInventory(electronic) {
        if (this.inventory.indexOf(electronic) === -1) {
            return;
        }
        this.inventory.splice(this.inventory.indexOf(electronic));
    }
    clearInventory() {
        (() => { while (this.inventory.length > 0)
            this.inventory.pop(); })();
    }
    getInventory() {
        return [...this.inventory];
    }
}
let phoneDroid = new Phone('Note 15', new Device(128, 2325, 'Samsung'));
let phoneDroidCopy = phoneDroid;
let phoneDroidCopy2 = {};
phoneDroidCopy2 = structuredClone(phoneDroidCopy);
device.summary(phoneDroid);
let electronics = new Electronics();
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
class Bluetooth {
    constructor(connected, transferQuota, quotaUnitPerSecond, device) {
        this.connected = false;
        this.transferQuota = 0;
        this.quotaUnitPerSecond = 'MB';
        if (device) {
            this.device = new Device(device.storage, device.price, device.brand);
        }
        this.connected = connected;
        this.transferQuota = transferQuota;
        this.quotaUnitPerSecond = quotaUnitPerSecond || this.quotaUnitPerSecond;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new Bluetooth(false, 0);
    }
    connectToBT() {
        if (!this.connected && this.device && this.transferQuota > 0) {
            this.connected = true;
            let summary = this.device.summary(device);
            console.info(`Device [${summary}] is now connected to BT and have a transfer quota of: ${this.transferQuota + this.quotaUnitPerSecond} per seconds.`);
        }
        else {
            throw new Error('There is no device, need to assign one first.');
        }
    }
}
let btConnectionDroid = Bluetooth.getInstance();
btConnectionDroid.transferQuota = 10;
try {
    btConnectionDroid.connectToBT();
}
catch (error) {
    if (error) {
        console.info(`There were an error: ${error}, i handle it by assigning a device (phoneDroid).`);
        btConnectionDroid.device = phoneDroid;
        btConnectionDroid.connectToBT();
    }
}
let deviceGeneric = {};
deviceGeneric.brand = 'Motorola';
deviceGeneric.price = 1199;
deviceGeneric.storage = 64;
let summaryWithPartialObj = device.summary(deviceGeneric);
console.info(`Summary method using Partial<Type> object: [summary]=>${summaryWithPartialObj}, [lenght]=> ${summaryWithPartialObj.length}`);
let deviceInstanced = new Device(64, 1128, 'Nokia');
let summaryDeviceInstanced = (_a = device.summary) === null || _a === void 0 ? void 0 : _a.call(device, deviceInstanced);
console.info(`Now using an instance of Device Class: [summary]=>${summaryDeviceInstanced}, [lenght]=> ${summaryDeviceInstanced.length}`);
console.info(resObj, typeof resObj);
console.info(phoneIOS.constructor.name);
//# sourceMappingURL=scribble.js.map