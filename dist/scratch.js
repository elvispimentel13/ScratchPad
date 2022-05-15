"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Logging_1, Person_1, PolicyCalculations_1;
console.info("%c scratch.ts", style);
var Result;
(function (Result) {
    Result["OK"] = "Logged";
    Result["FAILED"] = "Failed";
})(Result || (Result = {}));
;
class Logger {
}
class Singleton {
    constructor() {
        if (!Singleton._instance)
            throw new Error('There is no instance.');
    }
    static getInstance(type) {
        if (!Singleton._initialized) {
            Singleton._initialized = true;
            Singleton._instance = new type(this._initialized);
        }
        let instance = Singleton._instance;
        Singleton._instance = undefined;
        Singleton._initialized = false;
        return instance;
    }
}
let Logging = Logging_1 = class Logging {
    constructor(init) {
        this.init = init;
        Logging_1.intance = Logging_1.getInstance(init);
    }
    static getInstance(init) {
        if (this.intance) {
            return this.intance;
        }
        Logging_1.instanceName = +(new Date());
        return this.intance = Singleton.getInstance(Logging_1);
    }
    registerLog(log) {
        console.info('Log registered succesfully.');
        return Result.OK;
    }
    getLogs() {
        throw new Error("Method not implemented.");
    }
    getLogById(id) {
        throw new Error("Method not implemented.");
    }
    getLogsByType(type) {
        throw new Error("Method not implemented.");
    }
    deleteLogById(id) {
        throw new Error("Method not implemented.");
    }
    deleteLogsByType(type, maxQty) {
        throw new Error("Method not implemented.");
    }
    clearLogs(waitResult) {
        throw new Error("Method not implemented.");
    }
    checkInstance(instance) {
        if (Logging_1.intance) {
            console.info('Checking instance.');
            console.info(Logging_1.instanceName);
        }
        return false;
    }
};
Logging = Logging_1 = __decorate([
    Init()
], Logging);
class Utility {
    static calculateAge(dob, dateTarget) {
        if (!dateTarget)
            dateTarget = new Date();
        var age = dateTarget.getFullYear() - dob.getFullYear();
        var m = dateTarget.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && dateTarget.getDate() < dob.getDate()))
            age--;
        return age;
    }
    static genPolicyNum() {
        return +(new Date());
    }
    static convertToDate(date) {
        let ndate = date.split('/');
        return new Date(+ndate[0], +ndate[1], +ndate[2]);
        ;
    }
}
function Init() {
    return (ctor) => {
        let obj = new ctor(true);
        console.info(`Initializing... "${obj.constructor.name}"`);
    };
}
function PageStatus(step, data, initialized) {
    return (_) => {
        if (initialized === false)
            return;
        const statusElem = document.querySelector(`[data-${data}]`);
        if (statusElem) {
            statusElem.innerHTML = step;
        }
        ;
    };
}
function LogToMethods(_, method, props) {
    console.info(`Method: ${method} props: ${JSON.stringify(props)}`);
    console.info(props);
}
let Person = Person_1 = class Person {
    constructor(init) {
        this.name = 'John';
        Person_1.instance = Person_1.getInstance(init);
    }
    static getInstance(init) {
        if (this.instance) {
            Person_1.init = init;
            return this.instance;
        }
        Person_1.instanceName = +(new Date());
        Person_1.init = (this.instance) ? true : false;
        return this.instance = Singleton.getInstance(Person_1);
    }
    printPersonName() {
        console.info(this.name);
    }
};
Person = Person_1 = __decorate([
    Init(),
    PageStatus(`<h3>Person is now initialized</h3>`, 'stepInfo', Person_1.init)
], Person);
var Role;
(function (Role) {
    Role["INSURED"] = "Insured";
    Role["OWNER"] = "Owner";
})(Role || (Role = {}));
class Client {
    constructor(name, lastname, dob, address, phone, age) {
        this.name = name;
        this.lastname = lastname;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
        this.age = age;
        if (typeof dob === "string") {
            dob = Utility.convertToDate(dob);
            if (!age) {
                this.age = Utility.calculateAge((typeof dob === "string") ? Utility.convertToDate(dob) : dob);
            }
        }
    }
    setRole(roles) {
        this.roles = roles;
    }
}
class Policy {
    constructor(baseCoverage, insured, policyNum, premium) {
        this.baseCoverage = baseCoverage;
        this.insured = insured;
        this.policyNum = policyNum !== null && policyNum !== void 0 ? policyNum : Utility.genPolicyNum().toString();
    }
    policyPremium(policy, client) {
        let calculate = PolicyCalculations.getInstance(true);
        policy.premium = calculate.calculatePremium(policy.baseCoverage, client.age);
    }
}
let PolicyCalculations = PolicyCalculations_1 = class PolicyCalculations {
    constructor(init) {
        this.MARGIN = 0.40;
        this.EXPENSES = 0.21;
        PolicyCalculations_1.instance = PolicyCalculations_1.getInstance(init);
    }
    static getInstance(init) {
        if (this.instance) {
            PolicyCalculations_1.init = init;
            return this.instance;
        }
        PolicyCalculations_1.instanceName = +(new Date());
        PolicyCalculations_1.init = (this.instance);
        return this.instance = Singleton.getInstance(PolicyCalculations_1);
    }
    calculatePremium(baseCoverage, age) {
        return baseCoverage * (1 - this.MARGIN) / (age * this.EXPENSES);
    }
};
__decorate([
    LogToMethods
], PolicyCalculations.prototype, "calculatePremium", null);
PolicyCalculations = PolicyCalculations_1 = __decorate([
    Init()
], PolicyCalculations);
class PolicyBuilder {
    buildClient(name, lastname, dob, address, phone) {
        this.client = new Client(name, lastname, dob, address, phone);
        return this;
    }
    buildRoles(roles) {
        if (Array.isArray(roles) && roles.length) {
            if (!roles.some((principal) => principal[1] === true)) {
                console.info('There was not principal role, you need an Insured and Owner as principal both.');
                let multipleRoles = roles.filter((item, index) => roles.indexOf(item) != index);
                if (!multipleRoles) {
                    roles.map((val) => {
                        switch (val[0]) {
                            case Role.INSURED:
                                val[1] = true;
                                break;
                            case Role.OWNER:
                                val[1] = true;
                                break;
                            default:
                                break;
                        }
                    });
                }
            }
        }
        this.client.roles = this.roles = roles;
        return this;
    }
    buildPolicy(baseCoverage, insured, policyNum, premium) {
        var _a;
        if (((_a = this.client) === null || _a === void 0 ? void 0 : _a.roles) && this.client.roles.some(role => role[0] === Role.INSURED)) {
            this.policy = new Policy(baseCoverage, this.client);
            if (!premium) {
                this.policy.policyPremium(this.policy, this.client);
            }
            return this;
        }
        else {
            throw new Error("There is no insured assigned in Roles, to create a new policy need to set at least one insured.");
        }
    }
    finalPolicy() {
        if (this.policy)
            return this.policy;
        else
            throw new Error("Builder process incomplete, need to follow steps correctly.");
    }
}
console.info('Starting Builder Pattern: Policy Builder');
let policyBuild = new PolicyBuilder().buildClient('John', 'Doe', '10/15/1974', '741 north ave, Vermont, CA 90172', '2129740118')
    .buildRoles([[Role.OWNER, true], [Role.INSURED, true]])
    .buildPolicy(100000)
    .finalPolicy();
console.info(policyBuild);
console.info(`Using builder pattern: ${JSON.stringify(policyBuild)}`);
function updateToDo(todo, toUpdate) {
    return Object.assign(Object.assign({}, todo), toUpdate);
}
let objTodo = {};
objTodo['title'] = 'Bedroom';
const todo1 = { title: 'Desk', description: 'Clear' };
const todo2 = updateToDo(todo1, { title: 'Kitchen' });
objTodo = updateToDo(objTodo, { description: 'Paint' });
console.info(todo2, objTodo);
let ToDoImplementation = class ToDoImplementation {
    constructor(title, description, activity) {
        this.title = title;
        this.description = description;
        this.activity = activity;
    }
};
ToDoImplementation = __decorate([
    constructorChanger()
], ToDoImplementation);
let readOnlyCar = { title: 'car', description: 'electric' };
const requiredCar = { title: 'truck', description: 'pickup', activity: 'drive' };
const roCarUdt = updateToDo(readOnlyCar, { title: 'plane', description: 'commercial', activity: 'fly' });
console.info(roCarUdt);
console.info('>>' + Object.isFrozen(readOnlyCar) + ': is not a frozen object. Was modified with updateToDo functions with returns a new object reference.');
const movilityToDo = {
    cars: { title: 'tesla', description: 'model y' },
    plane: { title: 'boeing', description: 'a320' },
    truck: { title: 'tesla', description: 'cybertruck' },
};
console.info(`Record<Movility, ToDo>: ${JSON.stringify(movilityToDo)}`);
const mobilityROReqRec = {
    cars: { title: 'tesla', description: 'model y', activity: 'drive' },
    plane: { title: 'boeing', description: '737', activity: 'fly' },
    truck: { title: 'tesla', description: 'cybertruck', activity: 'load' }
};
mobilityROReqRec.cars['activity'] = 'crash';
console.info(`Record<Movility, Required<ToDoImplementation>>: ${JSON.stringify(mobilityROReqRec)}`);
const movPart2 = {
    plane: { title: 'audi', activity: 'luxury' },
    cars: { title: 'tesla', activity: 'autopilot' }
};
console.info(`Record<Exclude<Movility, 'truck'>, Required<Pick<ToDoImplementation, 'title' | 'activity'>>>: ${JSON.stringify(movPart2)}`);
const driveOnly = {
    truck: 'Ford - F150',
    plane: 'Airbus A320'
};
console.info(`Omit<MovilitySub, 'cars'>: ${JSON.stringify(driveOnly)}`);
let ctorArgsTp;
ctorArgsTp = ['airbus', 'a360', 'landing'];
console.info('ConstructorParameters<typeof ToDoImplementation>: ' + ctorArgsTp + ': these vals are set to a tuple from >>[title: string, description: string, activity: string]');
let usingCtorArgs = new ToDoImplementation(...ctorArgsTp);
console.info('Creating new() insntance of ToDoImplementation with parameters in a variable of type ConstructorParameters<typeof ToDoImplementation>: ' + JSON.stringify(usingCtorArgs));
let paramsUdtToDo;
paramsUdtToDo = [todo1, { title: 'changing' }];
let arrowFnParams;
arrowFnParams = [];
function constructorChanger() {
    return (constructor) => {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                this.propAdded = 'My Property!';
                console.info('Printing consctructor args...');
                console.info('Parameters:' + args);
            }
        };
    };
}
let todoObj = new ToDoImplementation('Testing', 'Decorators', 'n/a');
function sealed(ctor) {
    Object.seal(ctor);
    Object.seal(ctor.prototype);
}
let testSealed = class testSealed {
    constructor(t, desc) {
        this.type = 'Sealed';
        this.title = t;
        this.description = desc;
    }
};
testSealed = __decorate([
    constructorChanger(),
    sealed
], testSealed);
let ctorSealed = new testSealed('is Sealed?', 'Multiple decorators');
//# sourceMappingURL=scratch.js.map