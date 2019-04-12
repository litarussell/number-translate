'use strict'

const numTo = require('./lang')

const language = Object.keys(numTo)

// 默认转译语言
const defaultFlag = 'en'

function Main (lang) {
    let flag = lang || defaultFlag
    this.get = function () {
        return flag
    }
    this.set = function (lang) {
        flag = lang
        return flag
    }
}

let fn = Main.prototype = {}

// 局部设置语言
fn.setLang = lang => new Main(lang)

// 获取支持的语言
fn.getLangs = function () {
    return language
}

fn.translate = function (num) {
    return numTo[this.get()](num)
}

module.exports = new Main()