"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Logging_1, Person_1;
const { v4: uuidv4 } = require('uuid');
console.info("%c scratch.ts", style);
var Result;
(function (Result) {
    Result["OK"] = "Logged";
    Result["FAILED"] = "Failed";
})(Result || (Result = {}));
;
class Logger {
    registerLog(log) {
        throw new Error("Method not implemented.");
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
        return Singleton._instance;
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
        return uuidv4();
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
        console.info(`Initializing... "${obj.constructor.name}: ${obj.name}"`);
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
        Person_1.init = (this.instance);
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
        var _a;
        (_a = this.roles) === null || _a === void 0 ? void 0 : _a.push(...roles);
    }
}
class Policy {
    constructor(baseCoverage, insured, policyNum, premium) {
        this.baseCoverage = baseCoverage;
        this.insured = insured;
        this.policyNum = policyNum !== null && policyNum !== void 0 ? policyNum : Utility.genPolicyNum();
    }
    policyPremium(policy, client) {
        this.calculation = new PolicyCalculations(policy, client);
        this.calculation.calculatePremium();
    }
}
class PolicyCalculations {
    constructor(policy, insured) {
        this.MARGIN = 0.40;
        this.EXPENSES = 0.21;
        this.policy = policy;
        this.insured = insured;
    }
    calculatePremium() {
        this.policy.premium = this.policy.baseCoverage * (1 - this.MARGIN) / (this.insured.age * this.EXPENSES);
    }
}
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
        this.roles = roles;
        return this;
    }
    buildPolicy(baseCoverage, insured, policyNum, premium) {
        var _a;
        if (((_a = this.client) === null || _a === void 0 ? void 0 : _a.roles) && this.client.roles.some(role => role === Role.INSURED)) {
            this.policy = new Policy(baseCoverage, this.client);
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
    .buildRoles([[Role.OWNER, true]])
    .buildPolicy()
    .policyPremium()
    .finalPolicy();
console.info(policyBuild);
//# sourceMappingURL=scratch.js.map