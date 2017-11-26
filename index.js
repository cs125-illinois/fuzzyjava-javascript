#!/usr/bin/env node

'use strict'

const FuzzyJava = require('./lib/fuzzyjava')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

let argv = minimist(process.argv.slice(2))
let input = path.resolve(argv._[0])

console.log(new FuzzyJava(fs.readFileSync(input), {
  topLevel: "blockStatements"
}).generate(argv.count || 1).validate().output)
