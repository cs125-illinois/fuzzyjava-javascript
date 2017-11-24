'use strict'

const RuleContext = require('antlr4').ParserRuleContext
const antlr4 = require('antlr4/index')
const Lexer = require('../grammar/FuzzyJavaLexer').FuzzyJavaLexer
const Parser = require('../grammar/FuzzyJavaParser').FuzzyJavaParser
const Visitor = require('../grammar/FuzzyJavaParserVisitor').FuzzyJavaParserVisitor

const _ = require('lodash')
const expect = require('chai').expect
const debug = require('debug')('fuzzyjava')

const randomWords = require('random-words')
const camelcase = require('camelcase')
const randomInt = require('random-int')
const randomFloat = require('random-float')
const randomChar = require('random-char')
const randomUnicode = require('random-unicode')

/*
 * Extend the default visitor.
 */
class FuzzyJava extends Visitor {
  constructor(string, config) {
    super()
    this.config = _.extend({}, config)

    this.state = {}
    this.output = []
    this.allVariables = []

    let chars = new antlr4.InputStream(string.toString())
    let lexer = new Lexer(chars)
    let tokens  = new antlr4.CommonTokenStream(lexer)
    this.state.parser = new Parser(tokens)
    this.state.parser.buildParseTrees = true

    return this
  }
  generate(count) {
    for (let i = 0; i < (count || 1); i++) {
      this.state.tree = this.state.parser[this.config.topLevel]()
      this.visit(this.state.tree)
      this.state.parser.reset()
    }
    return this
  }

  visitBlockStatements(ctx) {
    if (!(this.config.topLevel === 'blockStatements')) {
      this.output.push("{")
    }

    if (this.scopeVariables) {
      this.allVariables.push(this.scopeVariables)
    }
    this.scopeVariables = []

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    if (!(this.config.topLevel === 'blockStatements')) {
      this.output.push("}")
    }

    if (this.allVariables.length > 1) {
      this.scopeVariables = this.allVariables.pop()
    } else {
      delete(this.scopeVariables)
    }

    return returnValue;
  }

  visitBlockStatement(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    expect(ctx.children).to.have.lengthOf.within(1, 2)
    if (ctx.children.length === 2) {
      this.output.push(ctx.children[0].getText() + ';')
    } else if (ctx.children.length === 1) {
      this.output.push(ctx.children[0].getText())
    }

    return returnValue;
  }

  visitLocalVariableDeclaration(ctx) {
    this.currentVariable = {}

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    delete(this.currentVariable)

    ctx.text = _.reduce(ctx.children, (text, child) => {
      text.push(child.getText())
      return text
    }, []).join(' ')

    return returnValue;
  }

  /*
   * Handle 'primitive' language extension.
   */
  visitPrimitiveType(ctx) {
    let type = ctx.getText().trim()
    if (type === 'primitive') {
      type = ctx.text = _.sample(['boolean', 'byte', 'short', 'int', 'long', 'char', 'float', 'double'])
    }
    this.currentVariable = {
      type: type
    }

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    return returnValue
  }

  visitVariableDeclarators(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    ctx.text = _.reduce(ctx.children, (result, child) => {
      let text = child.getText()
      if (text === ',') {
        return result + ", "
      } else {
        return result + text
      }
    }, "")

    return returnValue
  }

  visitVariableDeclarator(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    expect(ctx.children.length).to.satisfy(num => {
      return num === 1 || num === 3
    })
    if (ctx.children.length === 1) {
      ctx.text = ctx.children[0].getText()
    } else {
      let expression = ctx.children[2].getText()
      ctx.text = ctx.children[0].getText() + " = " + expression
      console.log(expression)
      try {
        this.currentVariable.value = eval(expression)
      } catch (err) {
        console.log(err)
      }
    }

    this.scopeVariables.push(this.currentVariable)
    this.currentVariable = {
      type: this.currentVariable.type
    }


    return returnValue
  }

  visitVariableDeclaratorId(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    let originalName = ctx.getText().trim()
    if (originalName.startsWith('?')) {
      let newName = _.find(this.scopeVariables, variable => {
        return variable.originalName === originalName
      })
      if (!newName) {
        do {
          newName = camelcase(randomWords(_.sample([1, 2])).join('-'))
        } while (_.find(this.scopeVariables, variable => {
          return variable.name === newName
        }))
        this.currentVariable.originalName = originalName
        this.currentVariable.name = newName
        ctx.text = newName
      } else {
        ctx.text = newName.name
      }
    } else {
      this.currentVariable.name = originalName
    }

    return returnValue
  }

  visitBackReferenceType(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    let originalType = ctx.getText().trim()
    let newType = _.find(this.scopeVariables, variable => {
      return variable.originalName === originalType
    })
    expect(newType).to.not.be.undefined;
    this.currentVariable = {
      type: newType.type
    }
    ctx.text = newType.type

    return returnValue
  }

  visitLiteral(ctx) {

    ////
    let returnValue = this.visitChildren(ctx)
    ////

    let literal = ctx.getText().trim()
    if (literal === '?') {
      switch (this.currentVariable.type) {
        case 'byte':
          literal = randomInt(-128, 127)
          break
        case 'short':
          literal = randomInt(-32768, 32767)
          break
        case 'int':
          literal = randomInt(-Math.pow(2, 31), Math.pow(2, 31) - 1)
          break
        case 'long':
          literal = randomInt(-Math.pow(2, 63), Math.pow(2, 63) - 1)
          break
        case 'float':
        case 'double':
          literal = randomFloat(-32768, 32767)
          break
        case 'char':
          literal = `'${randomChar()}'`
          break
        case 'boolean':
          literal = _.sample(["true", "false"])
          break
      }
      ctx.text = "" + literal
    }

    return returnValue
  }

  exitExpression(ctx) {
    let expression = ctx.getText().trim()
    try {
      this.currentVariable.value = eval(expression)
    } catch (err) { }
  }

}

/*
 * Instrument all visitors so we have some idea what is going on.
 */
let printVariables = (instance) => {
  if (instance.currentVariable) {
    debug(JSON.stringify(instance.currentVariable, null, 2))
  }
  if (instance.scopeVariables) {
    debug(JSON.stringify(instance.scopeVariables, null, 2))
  }
}
let addDebugging = (clazz, func, name, variables) => {
  if (name.startsWith("visit")) {
    clazz.prototype[name] = function (ctx) {
      let printName = name.charAt(5).toLowerCase() + name.slice(6)
      debug(`${" ".repeat(ctx.depth() * 2)}-> ${printName}`)
      if (variables) {
        printVariables(this)
      }
      let returnValue = func.call(this, ctx)
      if (variables) {
        printVariables(this)
      }
      debug(`${" ".repeat(ctx.depth() * 2)}<- ${printName}`)
      return returnValue
    }
  }
}
_.each(Visitor.prototype, (func, name) => {
  addDebugging(Visitor, func, name)
})
_.each(FuzzyJava.prototype, (func, name) => {
  addDebugging(FuzzyJava, func, name, true)
})

/*
 * Override default antlr getText method to use custom text attributes when
 * available.
 */
RuleContext.prototype.getText = function() {
	if (this.getChildCount() === 0) {
		return "";
  } else if (this.text) {
    return this.text
	} else {
		return this.children.map(function(child) {
			return child.text || child.getText();
		}).join("");
	}
}

exports = module.exports = FuzzyJava
