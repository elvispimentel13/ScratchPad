// USING Decorators, utility types (Required, Readonly, Record, Parameters, ReturnType, InstanceType, others.)
console.info("%c scratch.ts", style);
// WORKING...


enum Result{ OK = "Logged", FAILED = "Failed"};
type Log = {
    loggerID: number;
    logInfo: string;
    logType: string;
    logStatus: Result;
    
}
type LogsDeletion = {
    result: boolean;
    quantity: number;
    timeCompletion?: Date;
}
interface IEvents {
    logId: number;
    logType: string;
    logDatetime: Date;
    logDescription: string;
}
interface ILogs {
    registerLog(log: Log): Result;
    getLogs(): IEvents[];
    getLogById(id: number): IEvents
    getLogsByType(type: string): IEvents[];
    deleteLogById(id: number): LogsDeletion;
    deleteLogsByType(type: string, maxQty?: number): LogsDeletion;
    clearLogs(waitResult?: boolean): LogsDeletion;
}

abstract class Logger implements ILogs {
    abstract registerLog(log: Log): Result;
    abstract getLogs(): IEvents[];
    abstract getLogById(id: number): IEvents;
    abstract getLogsByType(type: string): IEvents[];
    abstract deleteLogById(id: number): LogsDeletion;
    abstract deleteLogsByType(type: string, maxQty?: number): LogsDeletion;
    abstract clearLogs(waitResult?: boolean): LogsDeletion;
}

abstract class Singleton<T> {
    private static _instance: any;
    private static _initialized: boolean;
    private constructor(){
        if(!Singleton._instance)
            throw new Error('There is no instance.');
    }

    public static getInstance<T>(type: { new(init: boolean) : T;}): T{
        if(!Singleton._initialized){
            Singleton._initialized = true;
            Singleton._instance = new type(this._initialized);
        }
        let instance = Singleton._instance;
        Singleton._instance = undefined;
        Singleton._initialized = false;
        return instance;
    }
}
@Init()
class Logging implements Logger {
    static intance: Logging;
    static instanceName?: number;
    constructor(public init?: boolean){
        Logging.intance = Logging.getInstance(init);
    }
    static getInstance(init?: boolean): Logging{
        if(this.intance){
            return this.intance;
        }
        Logging.instanceName = +(new Date());
        return this.intance= Singleton.getInstance(Logging);
    }

    registerLog(log: Log): Result {
        console.info('Log registered succesfully.');
        return Result.OK;
    }
    getLogs(): IEvents[] {
        throw new Error("Method not implemented.");
    }
    getLogById(id: number): IEvents {
        throw new Error("Method not implemented.");
    }
    getLogsByType(type: string): IEvents[] {
        throw new Error("Method not implemented.");
    }
    deleteLogById(id: number): LogsDeletion {
        throw new Error("Method not implemented.");
    }
    deleteLogsByType(type: string, maxQty?: number): LogsDeletion {
        throw new Error("Method not implemented.");
    }
    clearLogs(waitResult?: boolean): LogsDeletion {
        throw new Error("Method not implemented.");
    }
    checkInstance(instance: Logging): boolean {
        if(Logging.intance)
        {
            console.info('Checking instance.');
            console.info(Logging.instanceName);
        }
        return false;
    }
}
class Utility {
    static calculateAge(dob: Date, dateTarget?: Date)
    {
        if(!dateTarget)
            dateTarget = new Date();
        var age = dateTarget.getFullYear() - dob.getFullYear();
        var m = dateTarget.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && dateTarget.getDate() < dob.getDate()))
            age--;
        return age;
    }
    static genPolicyNum(){
        return +(new Date());
    }

    static convertToDate(date: string){
        let ndate = date.split('/');
        return new Date(+ndate[0], +ndate[1], +ndate[2]);;
    }
}

// TESTING DECORATORS

function Init<T>(){
    return (ctor: any) => {
        let obj = new ctor(true);
        console.info(`Initializing... "${obj.constructor.name}"`);
    };
    
}

function PageStatus(step: string, data: string, initialized?: boolean)
{
    return (_: Function)=>{
        if(initialized === false)
            return;
        const statusElem = document.querySelector(`[data-${data}]`);
        if(statusElem){
            (statusElem as HTMLSpanElement).innerHTML  = step;    
        };
    }
}

function LogToMethods(_: any, method: string, props: PropertyDescriptor)
{
    console.info(`Method: ${method} props: ${JSON.stringify(props)}`);
    console.info(props);
}

@Init()
@PageStatus(`<h3>Person is now initialized</h3>`, 'stepInfo', Person.init)
class Person {
    name = 'John'; //Set by defaul for testing.
    static instance: Person;
    static instanceName?: number;
    static init?: boolean;
    constructor(init?: boolean){
        Person.instance = Person.getInstance(init);
    } 
    static getInstance(init?: boolean): Person{
        if(this.instance){
            Person.init = init;
            return this.instance;
        }
        Person.instanceName = +(new Date());
        Person.init = (this.instance) ? true: false;
        return this.instance= Singleton.getInstance(Person);
    }
    //USING COMPOSITION INSTEAD OF INHERITANCE.
    //protected logInstance: Logging = Logging.getInstance();

    printPersonName(){
        console.info(this.name);
    }
}

//const pers = Person.getInstance();
//console.info(pers.name, Person.instanceName);
enum Role {
    INSURED = 'Insured',
    OWNER = 'Owner'
}
class Client {
    roles?: [Role, boolean][];
    constructor(public name: string,
                public lastname: string,
                public dob: Date | string,
                public address: string,
                public phone: string,
                public age?: number)
    {
        if(typeof dob === "string"){
            //for use in a mainstream app, is better to validate dob or just use a better UX/UI definition for this field.
            //lest assume there is a valid format "MM/DD/YYYY"
            dob = Utility.convertToDate(dob);
            if(!age){
                this.age = Utility.calculateAge((typeof dob === "string")? Utility.convertToDate(dob) : dob);
            }
        }
    }

    setRole(roles: [Role, boolean][]){
        this.roles = roles;
    }

}
class Policy {
    policyNum: string; //we goint to set it by default
    baseCoverage: number; 
    insured: Client;
    premium?: number;
    private calculation?: PolicyCalculations;
    constructor(baseCoverage: number,
                insured: Client,
                policyNum?: string, 
                premium?: number)
    {
        this.baseCoverage = baseCoverage;
        this.insured = insured;
        this.policyNum = policyNum ?? Utility.genPolicyNum().toString();
    }

    policyPremium(policy: Policy, client: Client): void{
        let calculate = PolicyCalculations.getInstance(true);
        policy.premium = calculate.calculatePremium(policy.baseCoverage, client.age!);
    }
}
@Init()
class PolicyCalculations{
    protected readonly MARGIN: number = 0.40;
    protected readonly EXPENSES: number = 0.21;

    static instance: PolicyCalculations;
    static instanceName?: number;
    static init?: boolean;
    constructor(init?: boolean){
        PolicyCalculations.instance = PolicyCalculations.getInstance(init);
    } 
    static getInstance(init?: boolean): PolicyCalculations{
        if(this.instance){
            PolicyCalculations.init = init;
            return this.instance;
        }
        PolicyCalculations.instanceName = +(new Date());
        PolicyCalculations.init = (this.instance);
        return this.instance= Singleton.getInstance(PolicyCalculations);
    }

    @LogToMethods
    calculatePremium(baseCoverage: number, age: number){
        //100000 * (1-0.40) / (age * 0.21)
        return baseCoverage * (1-this.MARGIN) / (age! * this.EXPENSES);
    }
}

interface Builder {
    buildClient(name: string, lastname: string, dob: string | Date, address: string, phone: string): any;
    buildRoles(roles: [Role, boolean][]): any;
    buildPolicy(baseCoverage: number, insured: Client, policyNum?: string, premium?: number): any;
    finalPolicy(): Policy;
}
class PolicyBuilder implements Builder{
    private client?: Client;
    private roles?: [role: Role, principal: boolean][];
    private policy?: Policy;
    buildClient(name: string, lastname: string, dob: string | Date, address: string, phone: string)
    {
        this.client = new Client(name, lastname, dob, address, phone);
        return this;
    }
    buildRoles(roles: [Role, boolean][]): any
    {
        if(Array.isArray(roles) && roles.length)
        {
            if(!roles.some((principal) => principal[1] === true)){
                console.info('There was not principal role, you need an Insured and Owner as principal both.');
                //Lets check first if there is only one role per role type. If yes, then assing principal to one of each.
                let multipleRoles = roles.filter((item, index) => roles.indexOf(item) != index);
                if(!multipleRoles){
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
        this.client!.roles = this.roles = roles;
        return this;
    }
    buildPolicy(baseCoverage: number, insured?: Client, policyNum?: string, premium?: number): any
    {
        if(this.client?.roles && this.client.roles.some(role=> role[0] === Role.INSURED))
        {
            this.policy = new Policy(baseCoverage, this.client);
            if(!premium){
                this.policy.policyPremium(this.policy, this.client);
            }
            return this;
        }
        else{
            throw new Error("There is no insured assigned in Roles, to create a new policy need to set at least one insured.");
        }
    }

    finalPolicy(): Policy
    {
        if (this.policy)
            return this.policy;
        else
            throw new Error("Builder process incomplete, need to follow steps correctly.");
    }

}
console.info('Starting Builder Pattern: Policy Builder');
let policyBuild = new PolicyBuilder().buildClient('John', 
                        'Doe',
                        '10/15/1974',
                        '741 north ave, Vermont, CA 90172',
                        '2129740118')
                        .buildRoles([[Role.OWNER, true], [Role.INSURED, true]])
                        .buildPolicy(100_000)
                        .finalPolicy();

console.info(policyBuild);
console.info(`Using builder pattern: ${JSON.stringify(policyBuild)}`);


// Practice: utility types (Required, Readonly, Record, Parameters, ReturnType, InstanceType, others.)

//Partial<T>
interface ToDo {
    title: string;
    description: string;
    [key: string]: string | undefined;
}

function updateToDo(todo: ToDo, toUpdate: Partial<ToDo>){
    return { ...todo, ...toUpdate };
}

let objTodo: Partial<ToDo> =  {};
objTodo['title'] = 'Bedroom';
const todo1 = { title: 'Desk', description: 'Clear'};
const todo2 = updateToDo(todo1, { title: 'Kitchen'});
objTodo = updateToDo(objTodo as ToDo, { description: 'Paint'})
console.info(todo2, objTodo);
@constructorChanger()
class ToDoImplementation implements ToDo {
    [key: string]: string | undefined;
    title: string;
    description: string;
    activity?: string;
    constructor(title: string, description: string, activity: string) {
        this.title = title;
        this.description = description;
        this.activity = activity;
    }
}
// Readonly<T>
let readOnlyCar: Readonly<ToDoImplementation> = { title: 'car', description: 'electric' };
const requiredCar: Required<ToDoImplementation> = { title: 'truck', description: 'pickup', activity: 'drive' };
// this works because in updateToDo method, returns a new object, but if you try to update props directly, it will fail with an error.
// readOnlyCar.title = 'bycicle'; => Cannot assign to 'title' because it is a read-only property.ts(2540)
const roCarUdt = updateToDo(readOnlyCar, {title: 'plane', description: 'commercial', activity: 'fly'});
console.info(roCarUdt);
console.info('>>' + Object.isFrozen(readOnlyCar) + ': is not a frozen object. Was modified with updateToDo functions with returns a new object reference.');
// but it keeps behavior like a frozen object: 
// readOnlyCar['anotherProp'] = 'propValue';
// Index signature in type 'Readonly<ToDoImplementation>' only permits reading.ts(2542)
// Object.freeze(readOnlyCar);
// readOnlyCar['anotherProp'] = 'propValue'; => Index signature in type 'Readonly<ToDoImplementation>' only permits reading.

//Record<T>
//It maps props from one type to values of another type with specific blueprint, requires to match the specified new type T1:T2.
type Movility = 'cars' | 'truck' | 'plane';
type MovilitySub = {cars: string, truck: string, plane: string};
const movilityToDo: Record<Movility, ToDo> = {
    cars: {title: 'tesla', description: 'model y'},
    plane: {title: 'boeing', description: 'a320'},
    truck: {title: 'tesla', description: 'cybertruck'},
}
console.info(`Record<Movility, ToDo>: ${JSON.stringify(movilityToDo)}`);

//another one can be: Required<ToDoImplementation> and Record<Mobility, Required<ToDoImplementation>
const mobilityROReqRec: Record<Movility, Required<ToDoImplementation>> = {
    cars: {title: 'tesla', description: 'model y', activity: 'drive'},
    plane: {title: 'boeing', description: '737', activity: 'fly'},
    truck: {title: 'tesla', description: 'cybertruck', activity: 'load'}
}
mobilityROReqRec.cars['activity'] = 'crash';
console.info(`Record<Movility, Required<ToDoImplementation>>: ${JSON.stringify(mobilityROReqRec)}`);

//mixing Record, Exclude, Pick and Required all at once.
const movPart2: Record<Exclude<Movility, 'truck'>, Required<Pick<ToDoImplementation, 'title' | 'activity'>>> = {
    plane: {title: 'audi', activity:'luxury'},
    cars: {title: 'tesla', activity: 'autopilot'}
};
console.info(`Record<Exclude<Movility, 'truck'>, Required<Pick<ToDoImplementation, 'title' | 'activity'>>>: ${JSON.stringify(movPart2)}`);

//Omit<T, key>
const driveOnly: Omit<MovilitySub, 'cars'> = {
    truck: 'Ford - F150',
    plane: 'Airbus A320'
}

console.info(`Omit<MovilitySub, 'cars'>: ${JSON.stringify(driveOnly)}`);

type ctorParams = ConstructorParameters<typeof ToDoImplementation>;
let ctorArgsTp: ctorParams;
ctorArgsTp = ['airbus', 'a360', 'landing'];
//Gets the parameters of a constructor in a class or constructor functions to be more specific.
console.info('ConstructorParameters<typeof ToDoImplementation>: ' + ctorArgsTp + ': these vals are set to a tuple from >>[title: string, description: string, activity: string]');
//as ctor in ToDoImplementation receives args as props, we need to use spread operator (...) to decouple values from [] to prop+prop+prop.
let usingCtorArgs = new ToDoImplementation(...ctorArgsTp);
console.info('Creating new() insntance of ToDoImplementation with parameters in a variable of type ConstructorParameters<typeof ToDoImplementation>: ' + JSON.stringify(usingCtorArgs));

//Parameters<Type>
//lets finish with two examples
let paramsUdtToDo: Parameters<typeof updateToDo>;
paramsUdtToDo = [todo1, {title: 'changing'}]; //<- refer to updateToDo(todo: ToDo, toUpdate: Partial<ToDo>), todo{} is >> { title: 'Desk', description: 'Clear'}
let arrowFnParams: Parameters<()=> string>;
arrowFnParams = []; //<- 0 args allowed as arrow fn declaration.


//LEST KEEP DECORATORS PRACTICE
//lets change a class contructor...
function constructorChanger(){
    return <T extends {new(...args: any[]): {}}>(constructor: T) => {
        return class extends constructor {
            //lets add a prop at constructor passes in decorator factory use.
            propAdded = 'My Property!';
            constructor(...args: any[]) {
                super(...args);
                console.info('Printing consctructor args...');
                console.info('Parameters:' + args)
            }
        }
    }
}

let todoObj = new ToDoImplementation('Testing', 'Decorators', 'n/a');


function sealed(ctor: Function){
    Object.seal(ctor);
    Object.seal(ctor.prototype);
}

@constructorChanger()
@sealed
class testSealed {
    type = 'Sealed';
    title: string;
    description: string;

    constructor(t: string, desc: string) {
        this.title = t;        
        this.description = desc;
    }
}

let ctorSealed = new testSealed('is Sealed?', 'Multiple decorators');
//this time, we seal the object directly, will throw an error because is not extensible anymore.
//Object.seal(ctorSealed);
//Because we sealed the object and tried to change it at runtime>> Cannot add property newProp, object is not extensible
//ctorSealed['newProp'] = 'Property';





