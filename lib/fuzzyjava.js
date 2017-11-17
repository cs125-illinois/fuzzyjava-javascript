'use strict'

const antlr4 = require('antlr4/index')
const Lexer = require('./FuzzyJava9Lexer').FuzzyJava9Lexer
const Parser = require('./FuzzyJava9Parser').FuzzyJava9Parser
const Listener = require('./FuzzyJava9Listener').FuzzyJava9Listener

function FuzzyJava (config) {
  this.state = {}
  Listener.call(this)
  return this
}

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

exports = module.exports = FuzzyJava
