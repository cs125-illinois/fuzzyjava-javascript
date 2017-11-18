'use strict'

const RuleContext = require('antlr4').ParserRuleContext
const antlr4 = require('antlr4/index')
const Lexer = require('./FuzzyJava9Lexer').FuzzyJava9Lexer
const Parser = require('./FuzzyJava9Parser').FuzzyJava9Parser
const Listener = require('./FuzzyJava9Listener').FuzzyJava9Listener

const _ = require('lodash')
const debug = require('debug')('fuzzyjava')
const randomWords = require('random-words')
const camelcase = require('camelcase')
const expect = require('chai').expect

/*
 * Extend the default listener.
 */
class FuzzyJava extends Listener {
  constructor() {
    super()
    this.state = {}
    this.output = []
  }
  parseString(string) {
    let chars = new antlr4.InputStream(string)
    let lexer = new Lexer(chars)
    let tokens  = new antlr4.CommonTokenStream(lexer)
    let parser = new Parser(tokens)
    parser.buildParseTrees = true
    this.state.parser = parser
    return this
  }
  blockStatements() {
    this.state.tree = this.state.parser.blockStatements()
    return this
  }
  run() {
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(this, this.state.tree)
    return this
  }
  enterUnannPrimitiveType(ctx) {
    let type = ctx.getText().trim()
    if (type === '__primitive__') {
      ctx.text = _.sample(['boolean', 'byte', 'short', 'int', 'long', 'char', 'float', 'double'])
    }
  }
  enterVariableDeclaratorId(ctx) {
    let name = ctx.getText().trim()
    if (name.startsWith('__') && name.endsWith('__')) {
      ctx.text = camelcase(randomWords(_.sample([1, 2])).join('-'))
    }
  }
  exitVariableDeclaratorList(ctx) {
    let completeText = []
    _.each(ctx.children, child => {
      completeText.push(child.getText())
    })
    ctx.text = completeText.join(', ')
  }
  exitLocalVariableDeclaration(ctx) {
    let completeText = []
    _.each(ctx.children, child => {
      completeText.push(child.getText())
    })
    ctx.text = completeText.join(' ')
  }
  exitBlockStatement(ctx) {
    expect(ctx.children).to.have.lengthOf(1)
    this.output.push(ctx.children[0].getText())
  }
}

let stringifyCircular = function(o) {
	let cache = [];
	let result = JSON.stringify(o, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				return;
			}
			cache.push(value)
		}
		return value
	})
	return result
}

/*
 * Instrument listener entry and exit so we have some idea what is going on.
 */
let addListeners = (clazz, func, name) => {
  if (name.startsWith("enter")) {
    clazz.prototype[name] = function (ctx) {
      debug(`${" ".repeat(ctx.depth() * 2)}-> ${name}`)
      return func.call(this, ctx)
    }
  } else if (name.startsWith("exit")) {
    clazz.prototype[name] = function (ctx) {
      let returnValue = func.call(this, ctx)
      debug(`${" ".repeat(ctx.depth() * 2)}<- ${name}`)
      return returnValue
    }
  }
}
_.each(Listener.prototype, (func, name) => {
  addListeners(Listener, func, name)
})
_.each(FuzzyJava.prototype, (func, name) => {
  addListeners(FuzzyJava, func, name)
})

/*
 * Override default antlr getText method to use custom text attributes when
 * available.
 */
RuleContext.prototype.getText = function() {
	if (this.getChildCount() === 0) {
		return "";
	} else {
		return this.children.map(function(child) {
			return child.text || child.getText();
		}).join("");
	}
}

exports = module.exports = FuzzyJava
