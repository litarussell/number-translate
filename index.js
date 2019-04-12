'use strict'

const numTo = require('./lang')

// const language = ['en', 'id']
const language = Object.keys(numTo)

const defaultFlag = 'en'

function Main (lang) {
    this.flag = lang || defaultFlag
}

let fn = Main.prototype = {}

// 局部设置语言
fn.set = lang => new Main(lang)

// 全局设置语言
fn.setLang = function (lang) {
    if (language.indexOf(lang) === -1) return
    this.flag = lang
    return this.flag
}

fn.getLang = function () {
    return this.flag
}

fn.translate = function (num) {
    return numTo[this.flag](num)
}

module.exports = new Main()