'use strict'

/*
 * Basic stuff.
 */
const _ = require('lodash')
const expect = require('chai').expect
const debugFlow = require('debug')('fuzzyjava:flow')
const debugVariables = require('debug')('fuzzyjava:variables')
const jsonStringifyPrettyCompact = require('json-stringify-pretty-compact')

/*
 * antlr imports.
 */
const antlr4 = require('antlr4/index')
const Lexer = require('../grammar/FuzzyJavaLexer').FuzzyJavaLexer
const Parser = require('../grammar/FuzzyJavaParser').FuzzyJavaParser
const Visitor = require('../grammar/FuzzyJavaParserVisitor').FuzzyJavaParserVisitor
const JavaLexer = require('../grammar/JavaLexer').JavaLexer
const JavaParser = require('../grammar/JavaParser').JavaParser

const RuleContext = require('antlr4').ParserRuleContext
const BailErrorStrategy = require('antlr4').error.BailErrorStrategy

/*
 * Random content for fuzzing.
 */
const randomWords = require('random-words')
const camelcase = require('camelcase')
const randomInt = require('random-int')
const randomFloat = require('random-float')
const randomChar = require('random-char')
const randomUnicode = require('random-unicode') // eslint-disable-line no-unused-vars

const yamljs = require('yamljs')
const path = require('path')
const defaults = require('./fuzzyjava.json')

const primitivePattern = defaults.types.primitives.join('|')
const javaVariablePattern = `[a-zA-Z][a-zA-Z0-9]*`;

/*
 * Extend the default visitor.
 */
class FuzzyJava extends Visitor {
  constructor (string) {
    super()

    this.state = {}

    let chars = new antlr4.InputStream(string.toString())
    let lexer = new Lexer(chars)
    let tokens = new antlr4.CommonTokenStream(lexer)
    this.state.parser = new Parser(tokens)
    this.state.parser._errHandler = new BailErrorStrategy()
    this.state.parser.buildParseTrees = true

    return this
  }
  generate (config) {
    this.config = _.extend(defaults, config)
    this.allVariables = []

    this.outputLines = []
    this.state.tree = this.state.parser[this.config.topLevel]()
    this.visit(this.state.tree)
    this.state.parser.reset()
    this.output = this.outputLines.join('\n')

    return this
  }
  validate () {
    expect(this).to.have.property('output')
    let chars = new antlr4.InputStream(this.output)
    let lexer = new JavaLexer(chars)
    let tokens = new antlr4.CommonTokenStream(lexer)
    let parser = new JavaParser(tokens)
    parser._errHandler = new BailErrorStrategy()
    let tree = parser[this.config.topLevel]()

    return this
  }

  visitBlockStatements (ctx) {
    if (!(this.config.topLevel === 'blockStatements')) {
      this.outputLines.push('{')
    }

    if (this.scopeVariables) {
      this.allVariables.push(this.scopeVariables)
    }
    this.scopeVariables = []

    /// /
    let returnValue = this.visitChildren(ctx)
    /// /

    if (!(this.config.topLevel === 'blockStatements')) {
      this.outputLines.push('}')
    }

    if (this.allVariables.length > 1) {
      this.scopeVariables = this.allVariables.pop()
    } else {
      delete (this.scopeVariables)
    }

    return returnValue
  }

  visitBlockStatement (ctx) {
    /// /
    let returnValue = this.visitChildren(ctx)
    /// /

    expect(ctx.children).to.have.lengthOf.within(1, 2)
    if (ctx.children.length === 2) {
      this.outputLines.push(ctx.children[0].getText() + ';')
    } else if (ctx.children.length === 1) {
      this.outputLines.push(ctx.children[0].getText())
    }

    return returnValue
  }

  visitLocalVariableDeclaration (ctx) {
    this.currentVariable = {}

    ///
    let returnValue = this.visitChildren(ctx)
    ///

    delete (this.currentVariable)

    ctx.text = _.reduce(ctx.children, (text, child) => {
      text.push(child.getText())
      return text
    }, []).join(' ')

    return returnValue
  }

  visitPrimitiveType (ctx) {
    let type = ctx.getText().trim()
    this.currentVariable = {
      type: type
    }

    ///
    let returnValue = this.visitChildren(ctx)
    ///

    return returnValue
  }

  /*
   * Handle 'primitive' language extension.
   */
  visitFuzzyPrimitiveType (ctx) {
    let type = ctx.getText().trim()
    if (type === '?primitive') {
      type = ctx.text = _.sample(defaults.types.primitives)
    } else if (type === '?numeric') {
      type = ctx.text = _.sample(defaults.types.numerics)
    }
    this.currentVariable = {
      type: type
    }

    ///
    let returnValue = this.visitChildren(ctx)
    ///

    return returnValue
  }

  visitVariableDeclarators (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    ctx.text = _.reduce(ctx.children, (result, child) => {
      let text = child.getText()
      if (text === ',') {
        return result + ', '
      } else {
        return result + text
      }
    }, '')

    return returnValue
  }

  visitVariableDeclarator (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    expect(ctx.children.length).to.satisfy(num => {
      return num === 1 || num === 3
    })
    if (ctx.children.length === 1) {
      ctx.text = ctx.children[0].getText()
    } else {
      let expression = ctx.children[2].getText()
      ctx.text = ctx.children[0].getText() + ' = ' + expression
      try {
        this.currentVariable.value = eval(expression) // eslint-disable-line no-eval
      } catch (err) { }
    }

    this.scopeVariables.push(this.currentVariable)
    this.currentVariable = {
      type: this.currentVariable.type
    }

    return returnValue
  }

  visitVariableDeclaratorId (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

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
        }) || _.find(this.config.reserved, reserved => {
          return reserved == newName
        }))
        this.currentVariable.originalName = originalName
        this.currentVariable.name = newName
        ctx.text = newName
      } else {
        ctx.text = newName.name
      }
    } else {
      this.currentVariable.name = originalName
      this.currentVariable.originalName = originalName
    }

    return returnValue
  }

  visitBackReferenceType (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    let originalType = ctx.getText().trim()
    let match = new RegExp(`^=(\\??${javaVariablePattern})$`).exec(originalType)
    expect(match).to.not.be.null
    originalType = match[1]
    let newType = _.find(this.scopeVariables, variable => {
      return variable.originalName === originalType
    })
    expect(newType).to.not.be.undefined // eslint-disable-line no-unused-expressions
    this.currentVariable = {
      type: newType.type
    }
    ctx.text = newType.type

    return returnValue
  }

  visitLiteral (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    let literal = ctx.getText().trim()
    let match = new RegExp(`^\\?(${primitivePattern})?$`).exec(literal)
    if (match) {
      let matchType = match[1] || this.currentVariable.type
      switch (matchType) {
        case 'byte':
        case 'short':
        case 'int':
        case 'long':
          literal = randomInt(
            eval(this.config.limits[this.currentVariable.type].min),
            eval(this.config.limits[this.currentVariable.type].max)
          )
          break
        case 'float':
        case 'double':
          literal = randomFloat(
            eval(this.config.limits[this.currentVariable.type].min),
            eval(this.config.limits[this.currentVariable.type].max)
          )
          break
        case 'char':
          literal = `'${randomChar()}'`
          break
        case 'boolean':
          literal = _.sample(['true', 'false'])
          break
      }
      ctx.text = '' + literal
    }

    return returnValue
  }

  visitPrimary (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    let primary = ctx.getText().trim()
    let match = new RegExp(`^(\\??${javaVariablePattern}?)$`).exec(primary)
    if (match) {
      let variable = _.find(this.scopeVariables, variable => {
        return variable.originalName === match[0]
      })
      // Literals are matched, so ignore them
      if (variable != null) {
        ctx.text = variable.name
        this.currentVariable = {
          type: variable.type
        }
      }
    }

    return returnValue
  }

  visitExpression (ctx) {
    ///
    let returnValue = this.visitChildren(ctx)
    ///

    if (ctx.children.length === 3) {
      if (ctx.children[1].getText() === '=') {
        ctx.text = `${ ctx.children[0].getText() } = ${ ctx.children[2].getText() }`
      } else if (ctx.children[1].getText() === '?=') {
        let operation = _.sample(defaults.operators.arithmetic)
        ctx.text = `${ ctx.children[0].getText() } ${ operation }= ${ ctx.children[2].getText() }`
      }
    }
  }
}

/*
 * Instrument all visitors so we have some idea what is going on.
 */
let printVariables = (instance) => {
  if (instance.currentVariable) {
    debugVariables(`currentVariable: ` + jsonStringifyPrettyCompact(instance.currentVariable, null, 2))
  }
  if (instance.scopeVariables) {
    debugVariables(`scopeVariables: ` + jsonStringifyPrettyCompact(instance.scopeVariables, null, 2))
  }
}
let addDebugging = (clazz, func, name, variables) => {
  if (name.startsWith('visit')) {
    clazz.prototype[name] = function (ctx) {
      let printName = name.charAt(5).toLowerCase() + name.slice(6)
      debugFlow(`${' '.repeat(ctx.depth() * 2)}-> ${printName}`)
      if (variables) {
        printVariables(this)
      }
      let returnValue = func.call(this, ctx)
      if (variables) {
        printVariables(this)
      }
      debugFlow(`${' '.repeat(ctx.depth() * 2)}<- ${printName}`)
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
RuleContext.prototype.getText = function () {
  if (this.getChildCount() === 0) {
    return ''
  } else if (this.text) {
    return this.text
  } else {
    return this.children.map(function (child) {
      return child.text || child.getText()
    }).join('')
  }
}

exports = module.exports = FuzzyJava
exports.defaults = defaults
