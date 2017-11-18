#!/usr/bin/env node

'use strict'

const fuzzyJava = require('./lib/fuzzyjava')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

let argv = minimist(process.argv.slice(2))
let input = path.resolve(argv._[0])

let fuzzy = new fuzzyJava().parseString(fs.readFileSync(input).toString()).blockStatements().run()
console.log(fuzzy.output.join('\n'))
