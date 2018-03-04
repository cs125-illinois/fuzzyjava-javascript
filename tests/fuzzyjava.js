'use strict'

const FuzzyJava = require('../lib/fuzzyjava')

const _ = require('lodash')
const expect = require('chai').expect

const numericPattern = FuzzyJava.defaults.types.numerics.join('|')
const primitivePattern = FuzzyJava.defaults.types.primitives.join('|')
const javaVariablePattern = `[a-zA-Z][a-zA-Z0-9]*`;
const assignmentPattern = `[+-\/*%]=`

describe('fuzzyjava', () => {
  describe('declaration', () => {
    it('should support random primitive declarations', () => {
      let fuzzy = new FuzzyJava(`?primitive i;`)
      for (let count = 0; count < 32; count++) {
        let output = fuzzy.generate().validate().output
        expect(new RegExp(`^(${primitivePattern}) i;$`).test(output)).to.be.true
      }
    }).timeout(500).slow(250)

    it('should support random numeric declarations', () => {
      let fuzzy = new FuzzyJava(`?numeric i;`)
      for (let count = 0; count < 32; count++) {
        let output = fuzzy.generate().validate().output
        expect(new RegExp(`^(${numericPattern}) i;$`).test(output)).to.be.true
      }
    }).timeout(500).slow(250)

    it('should support multiple declarations', () => {
      let output = new FuzzyJava(`?primitive i, j;`).generate().validate().output
      expect(new RegExp(`^(${primitivePattern}) i, j;$`).test(output)).to.be.true
      output = new FuzzyJava(`?primitive i, j, k;`).generate().validate().output
      expect(new RegExp(`^(${primitivePattern}) i, j, k;$`).test(output)).to.be.true
      output = new FuzzyJava(`?numeric i, j;`).generate().validate().output
      expect(new RegExp(`^(${numericPattern}) i, j;$`).test(output)).to.be.true
      output = new FuzzyJava(`?numeric i, j, k;`).generate().validate().output
      expect(new RegExp(`^(${numericPattern}) i, j, k;$`).test(output)).to.be.true
    }).timeout(500).slow(250)

    it('should support random variable names in declarations', () => {
      for (let count = 0; count < 32; count++) {
        let type = _.sample(FuzzyJava.defaults.types.primitives)
        let output = new FuzzyJava(`${type} ?i;`).generate().validate().output
        expect(new RegExp(`^${type} (${javaVariablePattern});$`).test(output)).to.be.true
      }
    }).timeout(500).slow(250)

    it('should support backreference types', () => {
      for (let count = 0; count < 32; count++) {
        let output = new FuzzyJava(`?primitive ?i;\n=?i ?j;`).generate().validate().output
        let pattern = Array(2).fill(`^(${primitivePattern}) (${javaVariablePattern});$`).join('\\n')
        let match = new RegExp(pattern, 'm').exec(output)
        expect(match).to.not.be.null
        expect(match[1]).to.equal(match[3])
      }
      for (let count = 0; count < 32; count++) {
        let output = new FuzzyJava(`?primitive i;\n=i ?j;`).generate().validate().output
        let pattern = Array(2).fill(`^(${primitivePattern}) (${javaVariablePattern});$`).join('\\n')
        let match = new RegExp(pattern, 'm').exec(output)
        expect(match).to.not.be.null
        expect(match[1]).to.equal(match[3])
      }
    }).timeout(500).slow(250)
  })

  describe('initialization', () => {
    it('should support primitive random initialization', () => {
      for (let count = 0; count < 32; count++) {
        let type = _.sample(FuzzyJava.defaults.types.primitives)
        let output = new FuzzyJava(`${type} i = ?;`).generate().validate().output
        let match = new RegExp(`^(${primitivePattern}) i = (.+?);`).exec(output)
        expect(match).to.not.be.null
        switch (match[1]) {
          case 'byte':
          case 'short':
          case 'int':
          case 'long':
            expect(new RegExp(`^[0-9-]+$`).test(match[2].trim())).to.be.true
            break
          case 'double':
          case 'float':
            expect(new RegExp(`^[.0-9-]+$`).test(match[2].trim())).to.be.true
            break
          case 'boolean':
            expect(['true', 'false']).to.include(match[2].trim())
            break
          case 'char':
            expect(new RegExp(`^'.*?'$`).test(match[2].trim())).to.be.true
            break
          default:
            expect.fail()
        }
      }
    }).timeout(500).slow(250)

    it('should support random primitive random initialization', () => {
      for (let count = 0; count < 32; count++) {
        let output = new FuzzyJava(`?primitive i = ?;`).generate().validate().output
        let match = new RegExp(`^(${primitivePattern}) i = (.+?);`).exec(output)
        expect(match).to.not.be.null
        expectValidType(match[1], match[2]);
      }
    }).timeout(500).slow(250)

    it('should support primitive random type-based initialization', () => {
      for (let count = 0; count < 32; count++) {
        let variableType = _.sample(['long', 'int', 'short', 'byte'])
        let valueType = _.sample(['long', 'int', 'short', 'byte'])
        let output = new FuzzyJava(`${variableType} i = ?${valueType};`).generate().output
        let match = new RegExp(`^(${primitivePattern}) i = (.+?);`).exec(output)
        expect(match).to.not.be.null
      }
    }).timeout(500).slow(250)
  })

  describe('assignment', () => {
    it('should support fuzzy assignment', () => {
      for (let count = 0; count < 32; count++) {
        let type = _.sample(FuzzyJava.defaults.types.primitives)
        let output = new FuzzyJava(`?primitive ?i;\n=?i ?j;\n?j = ?i;`).generate().output
        let pattern = Array(2).fill(`^(${primitivePattern}) (${javaVariablePattern});$`)
        pattern.push(`^(${javaVariablePattern}) = (${javaVariablePattern});$`)
        pattern = pattern.join('\\n')
        let match = new RegExp(pattern, 'm').exec(output)
        expect(match).to.not.be.null
        expect(match[1]).to.equal(match[3])
        expect(match[2]).to.equal(match[6])
        expect(match[4]).to.equal(match[5])
      }
    }).timeout(500).slow(250)

    it('should support assignment on non-random primitives', () => {
      for (let count = 0; count < 32; count++) {
        let type = _.sample(FuzzyJava.defaults.types.primitives)
        let output = new FuzzyJava(`${type} i = ?;\ni = ?;`).generate().output
        let pattern = new Array(`^(${primitivePattern}) i = (.+?);`)
        pattern.push(`i = (.+?);$`)
        pattern = pattern.join('\\n')
        let match = new RegExp(pattern, 'm').exec(output)
        expect(match).to.not.be.null
        expectValidType(match[1], match[2]);
        expectValidType(match[1], match[3]);
      }
    }).timeout(500).slow(250)

    it('should support valid fuzzy compound assignments', () => {
      for (let count = 0; count < 32; count++) {
        let output = new FuzzyJava(`?numeric i = 0;\ni ?= 5;`).generate().output
        let pattern = [`^(${primitivePattern}) i = 0;`]
        pattern.push(`i ${assignmentPattern} 5;$`)
        pattern = pattern.join('\\n')
        let match = new RegExp(pattern, 'm').exec(output)
        expect(match).to.not.be.null
      }
    }).timeout(500).slow(250)
  })
})

let expectValidType = (type, value) => {
  let match;
  switch (type) {
    case 'byte':
    case 'short':
    case 'int':
    case 'long':
      match = new RegExp(`^[0-9-]+$`).exec(value.trim())
      expect(match).to.not.be.null
      expect(parseInt(match)).to.be.at.least(eval(FuzzyJava.defaults.limits[type].min))
      expect(parseInt(match)).to.be.below(eval(FuzzyJava.defaults.limits[type].max))
      break
    case 'double':
    case 'float':
      match = new RegExp(`^[0-9-.]+$`).exec(value.trim())
      expect(match).to.not.be.null
      expect(parseFloat(match)).to.be.at.least(eval(FuzzyJava.defaults.limits[type].min))
      expect(parseFloat(match)).to.be.below(eval(FuzzyJava.defaults.limits[type].max))
      break
    case 'boolean':
      expect(['true', 'false']).to.include(value.trim())
      break
    case 'char':
      expect(new RegExp(`^'.*?'$`).test(value.trim())).to.be.true
      break
    default:
      expect.fail()
  }
};
