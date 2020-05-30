//代码题1
const fp = require('lodash/fp')

//数据
//horsepower 马力,dollar_value 价格,in_stock 库存
const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker c12 zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]
//练习1：使用函数组合fp.flowRight()重新实现下面这个函数

/**
  原函数：
  let isLastInStock = function (cars) {
    //获取最后一条数据
    let last_car = fp.last(cars)
    //获取最后一条数据的in_stock属性值
    return fp.prop('in_stock', last_cars)
  }
*/
let isLastInStock = function () {
  return fp.flowRight(fp.prop('in_stock', fp.last))
}

//练习2:使用fp.flowRight(),fp.prop()和fp.first()获取第一个car的name
let getFirstName = fp.flowRight(fp.prop('name', fp.first))

//练习3:使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
//<- 无须改动

/**
  原函数：
  let averageDollarValue = function (cars) {
    let dollar_value = fp.map(function (car) {
      return car.dollar_value
    }, cars)
    return _average(dollar_value)
  }
*/
let averageDollarValue = function (cars) {
  return fp.flowRight(_average(fp.map(function (car) {
    return car.dollar_value
  }, cars)))
}

//练习4:使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串,把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]
let _underscore = fp.replace(/\W+/g, '_')//<-无须改动，并在sanitizeNames中使用它

let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)))

//代码题2
//support.js
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}
class Maybe {
  static of (X) {
    return new Maybe(X)
  }
  isNothing () {
    return this._value === null || this._value === undefined
  }
  constructor(X) {
    this._value = x
  }
  map (fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container
}

//练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

const fp = require('lodash/fp')

const { Maybe, Container } = require('./support')

let maybe = Maybe.of([5, 6, 1])

let ex1 = function () {
  return maybe.map(fp.map(fp.add))
}

//练习2：实现一个函数ex2,能够使用fp.first获取列表的第一个元素
const fp = require('lodash/fp')

const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = function () {
  return xs.map(fp.first)
}

//练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
const fp = require('lodash/fp')

const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: "Albert" }

let ex3 = function (key, obj) {
  return safeProp(key, obj).map(fp.flowRight(fp.first, fp.split('')))
}

//练习4：使用Maybe重写ex4,不要有if语句
const fp = require('lodash/fp')

const { Maybe, Container } = require('./support')

/**
  原函数：
  let ex4 = function (n) {
    if (n) { return parseInt(n) }
  }
*/
let ex4 = function (n) {
  Maybe.of(n).map(x => parseInt(x))
}