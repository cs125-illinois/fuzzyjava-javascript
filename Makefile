grammar: bin/antlr-4.7-complete.jar lib/FuzzyJava9.g4
	java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript lib/FuzzyJava9.g4

.PHONY: grammar
