module.exports = function (num) {
  let arr = num.split('.')
  arr.forEach(item => {
    if (Number.isNaN(Number(item))) throw Error('请输入数字')
  })
  // 不含小数
  if (arr.length === 1) return `${handleInt(arr[0])} Dollar Amerika`
  // 含小数
  else {
    let [x, y] = handleDecimal(arr[0], arr[1])
    return y ? `${x} Dollar Amerika ${y} Sen` : `${x} Dollar Amerika`
  }
}

let numberMap = {
  '0': 'Nol',
  '1': 'Satu',
  '2': 'Dua',
  '3': 'Tiga',
  '4': 'Empat',
  '5': 'Lima',
  '6': 'Enam',
  '7': 'Tujuh',
  '8': 'Delapan',
  '9': 'Sembilan',
  '10': 'Sepuluh',
  '11': 'Sebelas',
  '100': 'Seratus',
  '1000': 'Seribu',
  '1000000': 'Sejuta',
  '1000000000': 'Semuliar'
}
let flagArr = [
  ['Belas', 'Puluh', 'Ratus'], 'Ribu', 'Juta', 'Muliar', 'Triliun'
]

// 映射个位数
function handleSingle (v1, index) {
  if (!v1) return ''
  let text = ''
  if (index === 0) text = numberMap[v1]
  else {
    let flag = flagArr[index]
    if (!flag) throw Error('数字超出范围!')
    if (v1 === 1 && index <= 4) {
      text = `Se${flag.toLowerCase()}`
    } else text = `${numberMap[v1]} ${flag}`
  }
  return text
}
// 映射十位数
function handleTens (v1, v2, index) {
  let text = ''
  let flag = ''
  if (index === 0) {
    if (v2 === 1) flag = flagArr[0][0]
    else flag = flagArr[0][1]
  } else {
    flag = flagArr[index]
  }
  if (!flag) throw Error('数字超出范围!')
  if (v2 === 1) {
    if (v1 === 0) {
      if (index === 0) text = `${numberMap['10']}`
      else text = `${numberMap['10']} ${flag}`
    } else if (v1 === 1) {
      if (index === 0) text = `${numberMap['11']}`
      else text = `${numberMap['11']} ${flag}`
    } else {
      if (index === 0) text = `${numberMap[v1]} ${flagArr[0][0]}`
      else text = `${numberMap[v1]} ${flagArr[0][0]} ${flag}`
    }
  } else {
    if (v2 === 0) text = handleSingle(v1, index)
    else {
      if (v1 === 0) {
        if (index === 0) text = `${numberMap[v2]} ${flagArr[0][1]}`
        else text = `${numberMap[v2]} ${flagArr[0][1]} ${flag}`
      } else {
        if (index === 0) text = `${numberMap[v2]} ${flagArr[0][1]} ${numberMap[v1]}`
        // else text = `${numberMap[v2]} ${flagArr[0][1]} ${numberMap[v1]} ${flag}`
        else {
          if (v1 === 1) text = `${numberMap[v2]} ${flagArr[0][1]} ${handleSingle(v1, index)}`
          else text = `${numberMap[v2]} ${flagArr[0][1]} ${numberMap[v1]} ${flag}`
        }
      }
    }
  }
  return text
}
// 映射百位数
function handleHundreds (v1, v2, v3, index) {
  let text = ''
  let flag = ''
  if (index === 0) {
    flag = flagArr[0][2]
  } else {
    flag = flagArr[index]
  }
  if (!flag) throw Error('数字超出范围!')
  let t = handleTens(v1, v2, index)
  if (v3 === 1) {
    if (t) text = `${numberMap['100']} ${t}`
    else {
      if (index === 0) text = `${numberMap['100']}`
      else text = `${numberMap['100']} ${flag}`
    }
  } else {
    if (t) text = `${numberMap[v3]} ${flagArr[0][2]} ${t}`
    else {
      if (index === 0) text = `${numberMap[v3]} ${flagArr[0][2]}`
      else text = `${numberMap[v3]} ${flagArr[0][2]} ${flag}`
    }
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
  return t.length ? t.filter(item => item).reduce((a, b) => `${b} ${a}`) : numberMap['0']
}

// 处理分组后的数字
function handleGroup (arr) {
  return arr.map((item, index) => handleThousand(item, index))
}

// 处理千以内的数字
function handleThousand (v, index) {
  return handleNum(setGroup(v, 10), index)
}
