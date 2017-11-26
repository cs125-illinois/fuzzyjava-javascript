'use strict'

const FuzzyJava = require('../lib/fuzzyjava')

const _ = require('lodash')
const expect = require('chai').expect

const numericPattern = `short|int|long|float|double`
const primitivePattern = `${numericPattern}|boolean|byte|char`
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
        let type = _.sample(['int', 'long', 'char'])
        let output = new FuzzyJava(`${type} ?i;`).generate().validate().output
        expect(new RegExp(`^${type} (${javaVariablePattern});$`).test(output)).to.be.true
      }
    }).timeout(500).slow(250)
  })
})
