#!/usr/bin/env node

'use strict'

const FuzzyJava = require('./lib/fuzzyjava')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

let argv = minimist(process.argv.slice(2))
let input = path.resolve(argv._[0])

let fuzzy = new FuzzyJava(fs.readFileSync(input), {
  topLevel: "blockStatements"
})
let output = fuzzy.generate(argv.count || 1).output
console.log(fuzzy.output.join('\n'))
