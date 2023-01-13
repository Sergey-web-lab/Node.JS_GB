'use strict';

const colors = require("colors/safe");

let [begin, end] = process.argv.slice(2);
let currentIndex = 0;

function simpleNumbers(firstArg, secondArg) {
    let begin = Number(firstArg);
    let end = Number(secondArg);

    if (ErrorArgIsNaN()) return;

    createSimpleNumbers(begin, end);
}

function createSimpleNumbers(begin, end) {
    if (begin <= 1) {
        begin = 2;
    }

    nextPrimeNum:
    for (let i = begin; i <= end; i++) {

        for (let j = 2; j < i; j++) {
            // if (i % j == 0 && i == end) {
            //     console.log(colors.red('Нет простых чисел в указанном диапазоне.'));
            // };
            if (i % j == 0) continue nextPrimeNum;
        }

        output(i);
    }
}

function output(number) {
    makeColors(number, currentIndex);
    if (currentIndex !== 2) {
        currentIndex++
    }
    else currentIndex = 0;
}

function makeColors(number, index) {
    switch (index) {
        case 1:
            console.log(colors.yellow(number));
            break;
        case 2:
            console.log(colors.red(number));
            break;
        default:
            console.log(colors.green(number));
    }
}

function ErrorArgIsNaN() {
    if (isNaN(begin) || (isNaN(end)))
        console.log(colors.red('Аргумент, переданный при запуске, не считается числом.'));
}

simpleNumbers(begin, end);



