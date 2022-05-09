"use strict";
var _a;
const btn = document.querySelector("button");
var evento;
btn.addEventListener('click', evnt => evento = evnt);
class PlayingWithArrays {
    constructor(position, arr) {
        this.shuffle = (arr) => {
            (arr || this.arr).sort(() => Math.random() - 0.5);
        };
        this.position = position;
        this.arr = arr;
    }
    fnGetArrValPosition(arr, val) {
        return ((!Array.isArray(arr) || !arr.length) ? arr : this.arr).indexOf(val);
    }
    ;
    fnGetRandomIntBetweenTwoVals(min = 0, max = Number.MAX_SAFE_INTEGER) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
    }
    ;
    *fnGenRandomSequenceByQty(qty) {
        for (let i = 0; i < qty; i++) {
            yield this.fnGetRandomIntBetweenTwoVals();
        }
    }
    ;
}
let playingArr = new PlayingWithArrays(0, []);
let randomSingle = (_a = playingArr.fnGenRandomSequenceByQty(1).next().value) !== null && _a !== void 0 ? _a : 0;
(playingArr.arr = [...playingArr.fnGenRandomSequenceByQty(9)]).push(randomSingle);
playingArr.shuffle();
playingArr.position = playingArr.fnGetArrValPosition(playingArr.arr, randomSingle);
console.info(`In arr: ${playingArr.arr.toString()} \n\nrandomSingle: ${randomSingle} \nis in position: ${playingArr.position}`);
const printOutput = op => { console.log(op); return 1; };
printOutput(7);
const pet = { name: 'Fluffy', age: '14', weight: '13.5', dob: '2021-02-02' };
let { age, dob } = pet;
let daysMultiplier = 30.417;
let fnGetDaysFromDOB = (age, dob) => {
    if (!dob.match(/^\d{4}-\d{2}-\d{2}$/))
        return age * daysMultiplier;
    return Math.floor((Date.now() - (new Date(dob)).getTime()) / (24 * 60 * 60 * 1000));
};
const ageInDays = fnGetDaysFromDOB(+age, dob);
const ageDobIsCorrect = ((age, ageInDays) => {
    const daysDiff = Math.ceil(Math.abs((age * daysMultiplier) - ageInDays));
    return [daysDiff <= 29 && daysDiff >= 0, daysDiff];
})(+age, ageInDays);
console.info(`Age in days is equal to: ${ageInDays}, current age provide is: ${age} and this value is ${ageDobIsCorrect[0]}, there is a difference of ${ageDobIsCorrect[1]} day(s) (Wich is less than a month).`);
//# sourceMappingURL=app.js.map