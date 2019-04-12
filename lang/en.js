module.exports = function (num) {
  let arr = num.split('.')
  arr.forEach(item => {
    if (Number.isNaN(Number(item))) throw Error('请输入数字')
  })
  // 不含小数
  if (arr.length === 1) return `${handleInt(arr[0])} Dollar`
  // 含小数
  else {
    let [x, y] = handleDecimal(arr[0], arr[1])
    return y ? `${x} Dollar and ${y} Cents` : `${x} Dollar`
  }
}

const numberMap = {
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  '11': 'Eleven',
  '12': 'Twelve',
  '13': 'Thirteen',
  '14': 'Fourteen',
  '15': 'Fifteen',
  '16': 'Sixteen',
  '17': 'Seventeen',
  '18': 'Eighteen',
  '19': 'Nineteen',
  '20': 'Twenty',
  '30': 'Thirty',
  '40': 'Forty',
  '50': 'Fifty',
  '60': 'Sixty',
  '70': 'Seventy',
  '80': 'Eighty',
  '90': 'Ninety'
}
const flagArr = ['Hundred', 'Thousand', 'Million', 'Billion', 'Trillion']

// 映射个位数
function handleSingle (v1, index) {
  if (!v1) return ''
  let text = ''
  if (index === 0) text = numberMap[v1]
  else {
    if (!flagArr[index]) throw Error('数字超出范围!')
    text = `${numberMap[v1]} ${flagArr[index]}`
  }
  return text
}
// 映射十位数
function handleTens (v1, v2, index) {
  let text = ''
  if (v2 === 1) text = handleSingle(`${v2}${v1}`, 0)
  else {
    if (v2 === 0) {
      if (v1 !== 0) text = handleSingle(`${v1}`, 0)
    } else {
      let x = handleSingle(`${v2}0`, 0)
      if (v1 === 0) text = x
      else text = `${x}-${handleSingle(`${v1}`, 0)}`
    }
  }
  if (index > 0) {
    if (!flagArr[index]) throw Error('数字超出范围!')
    text = `${text} ${flagArr[index]}`
  }
  return text
}
// 映射百位数
function handleHundreds (v1, v2, v3, index) {
  let text = ''
  let t = handleTens(v1, v2, 0)
  let flag = flagArr[index]
  if (!flag) throw Error('数字超出范围!')
  if (v3) {
    if (index === 0) {
      if (t) text = `${numberMap[v3]} ${flag} ${t}`
      else text = `${numberMap[v3]} ${flag}`
    } else {
      if (t) text = `${numberMap[v3]} ${flagArr[0]} ${t} ${flag}`
      else text = `${numberMap[v3]} ${flagArr[0]} ${flag}`
    }
  } else {
    if (t) text = `${t} ${flag}`
  }
  return text
}
// 处理小数
function handleDecimal (v1, v2) {
  let x = handleInt(v1)
  let v = Math.round(Number(v2) / (10 ** (v2.length - 2)))
  return [x, v && handleInt(v)]
}

/* ---------- 通用方法 ---------- */
// 处理3位内的数字
function handleNum (arr, index) {
  switch (arr.length) {
    // 个位数
    case 1:
      return handleSingle(arr[0], index)
      // 十位数
    case 2:
      return handleTens(arr[0], arr[1], index)
      // 百位数
    case 3:
      return handleHundreds(arr[0], arr[1], arr[2], index)
  }
}
// 根据位数分组
function setGroup (v, n) {
  let arr = []
  let value = v
  do {
    let num = value % n
    value = parseInt(value / n)
    arr.push(num)
  } while (value)

  return arr
}
// 处理整数 位数按3位分组
function handleInt (v) {
  let text = handleGroup(setGroup(v, 1000))
  let t = text.filter(item => item)
  return t.length ? t.reduce((a, b) => `${b} ${a}`) : numberMap['0']
}

// 处理分组后的数字
function handleGroup (arr) {
  return arr.map((item, index) => handleThousand(item, index))
}

// 处理千以内的数字
function handleThousand (v, index) {
  return handleNum(setGroup(v, 10), index)
}
