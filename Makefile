grammar: bin/antlr-4.7-complete.jar lib/FuzzyJava9.g4
	java -jar bin/antlr-4.7-complete.jar -Dlanguage=JavaScript lib/FuzzyJava9.g4
	patch -p1 lib/FuzzyJava9Lexer.js < lib/FuzzyJava9Lexer.js.patch

.PHONY: grammar
