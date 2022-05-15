// JUST PLAYING WITH SOME CODING PRACTICES
const style = 'color:gray; font-size:15px; font-weight: bold; -webkit-text-stroke: 1px black;'
console.info("%c app.ts", style);
const btn = document.querySelector("button")!;
var evento;
btn.addEventListener('click', evnt => evento = evnt);

class PlayingWithArrays {
    position: number;
    arr: number[];
    constructor(position: number, arr: number[])
    {
        this.position = position;
        this.arr = arr;
    }
    public fnGetArrValPosition(arr: number[], val: number): number { 
        return ((!Array.isArray(arr) || !arr.length)? arr : this.arr)!.indexOf(val); };
    public fnGetRandomIntBetweenTwoVals(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number { 
        return Math.floor(Math.random() * (Math.floor(max)-Math.ceil(min)) + min);
    };
    public *fnGenRandomSequenceByQty(qty: number): Generator<number> {
        for (let i = 0; i < qty; i++) {
            yield this.fnGetRandomIntBetweenTwoVals();        
        }
    };
    public shuffle = (arr?: number[])=>{
        (arr || this.arr)!.sort(() => Math.random() - 0.5);
    };
}
let playingArr = new PlayingWithArrays(0, []);
let randomSingle = playingArr.fnGenRandomSequenceByQty(1).next().value ?? 0;
(playingArr.arr = [...playingArr.fnGenRandomSequenceByQty(9)]).push(randomSingle);
playingArr.shuffle();
playingArr.position = playingArr.fnGetArrValPosition(playingArr.arr, randomSingle);
console.info(`In arr: ${playingArr.arr.toString()} \n\nrandomSingle: ${randomSingle} \nis in position: ${playingArr.position!}`);

const printOutput: (output: number) => number = op => {console.log(op); return 1;};
printOutput(7);

// PRACTICE WITH: regex, dates, tuples, Math, Destructuring.
const pet = { name: 'Fluffy', age: '14', weight: '13.5', dob: '2021-02-02' };
let {age, dob} = pet; 
let daysMultiplier = 30.417;
let fnGetDaysFromDOB = (age: number, dob: string) => {
    if(!dob.match(/^\d{4}-\d{2}-\d{2}$/))
        return age * daysMultiplier; // CALCULATE DAYS FROM AGE PROVIDE IF DOB IS INVALID FORMAT.
    return Math.floor((Date.now() - (new Date(dob)).getTime()) / (24*60*60*1000));
}
const ageInDays = fnGetDaysFromDOB(+age, dob);
const ageDobIsCorrect = ((age: number, ageInDays: number) => {
    const daysDiff = Math.ceil(Math.abs((age*daysMultiplier) - ageInDays));
    return [daysDiff <= 29 && daysDiff >= 0, daysDiff];
})(+age, ageInDays);
console.info(`Age in days is equal to: ${ageInDays }, current age provide is: ${age} and this value is ${ageDobIsCorrect[0]}, there is a difference of ${ageDobIsCorrect[1]} day(s) (Wich is less than a month).`);

// THIS ALSO CODE WORKS BUT I TRIED ABOVE TO SET FUNCTIONS AS METHODS
// IN A SEPARATE TS/JS FILE, ILL BE MORE ACCURATE WITH BETTER PRACTICES BUT USING ANOTHER EXAMPLES.
/* 
let fnGetArrValPosition: (arr: number[], val: number) => void = (arr: number[], val: number = 5) => { position = arr.indexOf(val); };
let fnGetRandomIntBetweenTwoVals = (min: number = 0, max: number = Number.MAX_SAFE_INTEGER) => { 
    return Math.floor(Math.random() * (Math.floor(max)-Math.ceil(min)) + min);
};
let fnGenRandomSequenceByQty = function*(qty: number) {
    for (let i = 0; i < qty; i++) {
        yield fnGetRandomIntBetweenTwoVals();        
    }
};
let arr = [...fnGenRandomSequenceByQty(9)];
let randomSingle = fnGenRandomSequenceByQty(1).next().value ?? 0;
let shuffle = (arr: number[])=>{
    arr.sort(() => Math.random() - 0.5);
};
arr.push(randomSingle);
shuffle(arr);
fnGetArrValPosition(arr, randomSingle);
console.info(`In arr: ${arr.toString()} \n\nrandomSingle: ${randomSingle} \nis in position: ${position!}`);
*/