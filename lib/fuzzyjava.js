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

function FuzzyJava (config) {
  this.state = {}
  this.output = ""
  Listener.call(this)
  return this
}

RuleContext.prototype.getText = function() {
	if (this.getChildCount() === 0) {
		return "";
	} else {
		return this.children.map(function(child) {
      console.log(child.text)
			return child.text || child.getText();
		}).join("");
	}
};

FuzzyJava.prototype = Object.create(Listener.prototype)

FuzzyJava.prototype.parseString = function(string) {
  let chars = new antlr4.InputStream(string)
  let lexer = new Lexer(chars)
  let tokens  = new antlr4.CommonTokenStream(lexer)
  let parser = new Parser(tokens)
  parser.buildParseTrees = true
  this.state.parser = parser
  return this
}

FuzzyJava.prototype.blockStatements = function() {
  this.state.tree = this.state.parser.blockStatements()
  return this
}

FuzzyJava.prototype.run = function() {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(this, this.state.tree)
  return this
}

_.each(Listener.prototype, (func, name) => {
  if (name.startsWith("enter")) {
    Listener.prototype[name] = function (ctx) {
      debug(`${" ".repeat(ctx.depth() * 2)}-> ${name}`)
      return Listener.prototype.name
    }
  } else if (name.startsWith("exit")) {
    Listener.prototype[name] = function (ctx) {
      debug(`${" ".repeat(ctx.depth() * 2)}<- ${name}`)
      return Listener.prototype.name
    }
  }
})

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

FuzzyJava.prototype.enterUnannPrimitiveType = function (ctx) {
  let type = ctx.getText().trim()
  if (type === 'primitive') {
    ctx.text = _.sample(['boolean', 'byte', 'short', 'int', 'long', 'char', 'float', 'double'])
  }
}
FuzzyJava.prototype.enterVariableDeclaratorId = function (ctx) {
  let name = ctx.getText().trim()
  if (name.startsWith('__') && name.endsWith('__')) {
    ctx.text = camelcase(randomWords(_.sample([1, 2])).join('-'))
  }
}
FuzzyJava.prototype.exitVariableDeclaratorList = function (ctx) {
  let completeText = []
  _.each(ctx.children, child => {
    completeText.push(child.getText())
  })
  console.log(JSON.stringify(completeText))
}

FuzzyJava.prototype.exitLocalVariableDeclaration = function (ctx) {
  let completeText = []
  _.each(ctx.children, child => {
    completeText.push(child.getText())
  })
  console.log(JSON.stringify(completeText))
}

exports = module.exports = FuzzyJava
