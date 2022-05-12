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
     registerLog(log: Log): Result {
        throw new Error("Method not implemented.");
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


//
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