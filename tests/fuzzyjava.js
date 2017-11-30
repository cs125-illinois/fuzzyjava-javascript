'use strict'

const FuzzyJava = require('../lib/fuzzyjava')

const _ = require('lodash')
const expect = require('chai').expect

const numericPattern = FuzzyJava.defaults.types.numerics.join('|')
const primitivePattern = FuzzyJava.defaults.types.primitives.join('|')
const javaVariablePattern = `[a-zA-Z][a-zA-Z0-9]*`;

describe('fuzzyjava', () => {
  describe('declarations', () => {
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

  describe('initializations', () => {
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
        let value;
        switch (match[1]) {
          case 'byte':
          case 'short':
          case 'int':
          case 'long':
            value = new RegExp(`^[0-9-]+$`).exec(match[2].trim())
            expect(value).to.not.be.null
            expect(parseInt(value)).to.be.at.least(eval(FuzzyJava.defaults.limits[match[1]].min))
            expect(parseInt(value)).to.be.below(eval(FuzzyJava.defaults.limits[match[1]].max))
            break
          case 'double':
          case 'float':
            value = new RegExp(`^[0-9-.]+$`).exec(match[2].trim())
            expect(value).to.not.be.null
            expect(parseFloat(value)).to.be.at.least(eval(FuzzyJava.defaults.limits[match[1]].min))
            expect(parseFloat(value)).to.be.below(eval(FuzzyJava.defaults.limits[match[1]].max))
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
})
