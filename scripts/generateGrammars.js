#!/usr/bin/env node

'use strict'

const _ = require('lodash')
const minimist = require('minimist')
const fsCompareSync = require('fs-compare').sync
const appRootDir = require('app-root-dir').get()
const path = require('path')
const childProcess = require('child-process-promise')

let ifNewer = function(inputs, outputs, command) {
  let run = false
  found: for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < outputs.length; j++) {
      if (fsCompareSync.mtime(inputs[i], outputs[j]) === 1) {
        run = true
        break found
      }
    }
  }
  if (run) {
    command()
  }
  return run
}

ifNewer(_.map(['FuzzyJavaLexer.g4', 'FuzzyJavaParser.g4'], input => {
    return path.join(appRootDir, 'grammar', input)
  }), _.map(['FuzzyJavaLexer.js', 'FuzzyJavaParser.js'], input => {
    return path.join(appRootDir, 'grammar', input)
  }), () => {
    childProcess.exec(`java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/FuzzyJavaLexer.g4 -visitor -no-listener`, {
      cwd: appRootDir
    }).then(() => {
      childProcess.exec(`java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/FuzzyJavaParser.g4 -visitor -no-listener`, {
        cwd: appRootDir
      })
    })
  })

ifNewer(_.map(['JavaLexer.g4', 'JavaParser.g4'], input => {
    return path.join(appRootDir, 'grammar', input)
  }), _.map(['JavaLexer.js', 'JavaParser.js'], input => {
    return path.join(appRootDir, 'grammar', input)
  }), () => {
    childProcess.exec(`java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/JavaLexer.g4 -visitor -no-listener`, {
      cwd: appRootDir
    }).then(() => {
      childProcess.exec(`java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/JavaParser.g4 -visitor -no-listener`, {
        cwd: appRootDir
      })
    })
  })
