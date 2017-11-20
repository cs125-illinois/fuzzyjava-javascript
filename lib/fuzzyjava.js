'use strict'

const RuleContext = require('antlr4').ParserRuleContext
const antlr4 = require('antlr4/index')
const Lexer = require('./FuzzyJava9Lexer').FuzzyJava9Lexer
const Parser = require('./FuzzyJava9Parser').FuzzyJava9Parser
const Listener = require('./FuzzyJava9Listener').FuzzyJava9Listener

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
 * Extend the default listener.
 */
class FuzzyJava extends Listener {
  constructor(string, config) {
    super()
    this.config = _.extend({}, config)

    this.state = {}
    this.output = []
    this.variable = {}
    this.variables = {}

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
      antlr4.tree.ParseTreeWalker.DEFAULT.walk(this, this.state.tree)
      this.state.parser.reset()
    }
    return this
  }

  /*
   * Entrances.
   */
  enterVariableDeclaratorId(ctx) {
    let name = ctx.getText().trim()
    if (name.startsWith('__') && name.endsWith('__')) {
      if (name in this.variables) {
        ctx.text = this.variables[name]
      } else {
        let randomName = camelcase(randomWords(_.sample([1, 2])).join('-'))
        this.variables[name] = randomName
        ctx.text = randomName
      }
    }
    this.variable.name = name
  }

  /*
   * Exits.
   */
  exitUnannPrimitiveType(ctx) {
    let type = ctx.getText().trim()
    if (type === '__primitive__') {
      type = ctx.text = _.sample(['boolean', 'byte', 'short', 'int', 'long', 'char', 'float', 'double'])
    }
    this.variable.type = type
  }
  exitLiteral(ctx) {
    let literal = ctx.getText().trim()
    if (literal === '__random__') {
      switch (this.variable.type) {
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
  }
  exitVariableDeclarator(ctx) {
    this.variable = {}
    if (ctx.children.length === 3) {
      ctx.text = ctx.children[0].getText() + " = " + ctx.children[2].getText()
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
  } else if (this.text) {
    return this.text
	} else {
		return this.children.map(function(child) {
			return child.text || child.getText();
		}).join("");
	}
}

exports = module.exports = FuzzyJava
