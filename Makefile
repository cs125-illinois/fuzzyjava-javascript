all: bin/antlr-4.7-complete.jar grammar/FuzzyJavaParser.g4
	java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/FuzzyJavaLexer.g4 -visitor -no-listener
	java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript -lib grammar/ grammar/FuzzyJavaParser.g4 -visitor -no-listener

.PHONY: all
