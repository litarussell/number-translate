const test = require('../index.js')

console.log(test.getLangs())

console.log(test.get())
test.set('id')
console.log(test.get())

console.log(test.translate('123.12'))

let a = test.setLang('en')
console.log(a.get())
console.log(a.translate('123.12'))

console.log(test.get())