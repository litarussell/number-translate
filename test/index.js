const test = require('../index.js')

console.log(test.getLang())
test.setLang('id')
console.log(test.getLang())

console.log(test.translate('123.12'))

let a = test.set('en')
console.log(a.getLang())
console.log(a.translate('123.12'))

console.log(test.getLang())