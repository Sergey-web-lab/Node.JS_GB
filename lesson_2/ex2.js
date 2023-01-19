'use strict';

// Задание 2:

import EventEmitter from "events";

const timeArr = process.argv[2].split('-')

let h = timeArr[0];
let d = timeArr[1];
let m = timeArr[2];
let y = timeArr[3];

let inputDate = new Date(y, m - 1, d, h);
console.log('Введённая дата:', inputDate.toLocaleString())

class TimerEmitter extends EventEmitter { };
const emitter = new TimerEmitter()

emitter.on('timerTick', ([inputDate, timer]) => {
    let dateNow = Date.now();
    if (dateNow >= inputDate) {
        emitter.emit('endOfTime', timer)
    } else {
        var sec = (inputDate - dateNow) / 1000;
        var leftTime = (sec) => {
            const arr = [
                Math.floor(sec % 60), //sec
                Math.floor((sec / 60) % 60), //min
                Math.floor((sec / (60 * 60)) % 24), //h
                Math.floor(sec / (60 * 60 * 24)), //d
            ];
            let days, hours, minutes;
            arr[3] !== 0 ? days = `${arr[3]} days` : days = "";
            arr[2] !== 0 ? hours = `${arr[2]} hours` : hours = "";
            arr[1] !== 0 ? minutes = `${arr[1]} minutes` : minutes = "";
            return `${days} ${hours} ${minutes} ${arr[0]} seconds`;
        }
    }
    if (leftTime != 0) {
        console.log(leftTime(sec), '');
    } else { emitter.emit('endOfTime', timer) }
})

emitter.on('endOfTime', timer => {
    clearInterval(timer)
    console.log('Время вышло')
})


const start = (inputDate) => {
    setInterval(function () {
        emitter.emit('timerTick', [inputDate, this])
    }, 1000)
}

start(inputDate)


