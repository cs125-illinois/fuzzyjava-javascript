// Generated from grammar/FuzzyJavaParser.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by FuzzyJavaParser.

function FuzzyJavaParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

FuzzyJavaParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
FuzzyJavaParserVisitor.prototype.constructor = FuzzyJavaParserVisitor;

// Visit a parse tree produced by FuzzyJavaParser#compilationUnit.
FuzzyJavaParserVisitor.prototype.visitCompilationUnit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#packageDeclaration.
FuzzyJavaParserVisitor.prototype.visitPackageDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#importDeclaration.
FuzzyJavaParserVisitor.prototype.visitImportDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeDeclaration.
FuzzyJavaParserVisitor.prototype.visitTypeDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#modifier.
FuzzyJavaParserVisitor.prototype.visitModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classOrInterfaceModifier.
FuzzyJavaParserVisitor.prototype.visitClassOrInterfaceModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#variableModifier.
FuzzyJavaParserVisitor.prototype.visitVariableModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classDeclaration.
FuzzyJavaParserVisitor.prototype.visitClassDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeParameters.
FuzzyJavaParserVisitor.prototype.visitTypeParameters = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeParameter.
FuzzyJavaParserVisitor.prototype.visitTypeParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeBound.
FuzzyJavaParserVisitor.prototype.visitTypeBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#enumDeclaration.
FuzzyJavaParserVisitor.prototype.visitEnumDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#enumConstants.
FuzzyJavaParserVisitor.prototype.visitEnumConstants = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#enumConstant.
FuzzyJavaParserVisitor.prototype.visitEnumConstant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#enumBodyDeclarations.
FuzzyJavaParserVisitor.prototype.visitEnumBodyDeclarations = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceDeclaration.
FuzzyJavaParserVisitor.prototype.visitInterfaceDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classBody.
FuzzyJavaParserVisitor.prototype.visitClassBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceBody.
FuzzyJavaParserVisitor.prototype.visitInterfaceBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classBodyDeclaration.
FuzzyJavaParserVisitor.prototype.visitClassBodyDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#memberDeclaration.
FuzzyJavaParserVisitor.prototype.visitMemberDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#methodDeclaration.
FuzzyJavaParserVisitor.prototype.visitMethodDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#methodBody.
FuzzyJavaParserVisitor.prototype.visitMethodBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeTypeOrVoid.
FuzzyJavaParserVisitor.prototype.visitTypeTypeOrVoid = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#genericMethodDeclaration.
FuzzyJavaParserVisitor.prototype.visitGenericMethodDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#genericConstructorDeclaration.
FuzzyJavaParserVisitor.prototype.visitGenericConstructorDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#constructorDeclaration.
FuzzyJavaParserVisitor.prototype.visitConstructorDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#fieldDeclaration.
FuzzyJavaParserVisitor.prototype.visitFieldDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceBodyDeclaration.
FuzzyJavaParserVisitor.prototype.visitInterfaceBodyDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceMemberDeclaration.
FuzzyJavaParserVisitor.prototype.visitInterfaceMemberDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#constDeclaration.
FuzzyJavaParserVisitor.prototype.visitConstDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#constantDeclarator.
FuzzyJavaParserVisitor.prototype.visitConstantDeclarator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceMethodDeclaration.
FuzzyJavaParserVisitor.prototype.visitInterfaceMethodDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#interfaceMethodModifier.
FuzzyJavaParserVisitor.prototype.visitInterfaceMethodModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#genericInterfaceMethodDeclaration.
FuzzyJavaParserVisitor.prototype.visitGenericInterfaceMethodDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#variableDeclarators.
FuzzyJavaParserVisitor.prototype.visitVariableDeclarators = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#variableDeclarator.
FuzzyJavaParserVisitor.prototype.visitVariableDeclarator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#variableDeclaratorId.
FuzzyJavaParserVisitor.prototype.visitVariableDeclaratorId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#variableInitializer.
FuzzyJavaParserVisitor.prototype.visitVariableInitializer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#arrayInitializer.
FuzzyJavaParserVisitor.prototype.visitArrayInitializer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classOrInterfaceType.
FuzzyJavaParserVisitor.prototype.visitClassOrInterfaceType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeArgument.
FuzzyJavaParserVisitor.prototype.visitTypeArgument = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#qualifiedNameList.
FuzzyJavaParserVisitor.prototype.visitQualifiedNameList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#formalParameters.
FuzzyJavaParserVisitor.prototype.visitFormalParameters = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#formalParameterList.
FuzzyJavaParserVisitor.prototype.visitFormalParameterList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#formalParameter.
FuzzyJavaParserVisitor.prototype.visitFormalParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#lastFormalParameter.
FuzzyJavaParserVisitor.prototype.visitLastFormalParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#qualifiedName.
FuzzyJavaParserVisitor.prototype.visitQualifiedName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#literal.
FuzzyJavaParserVisitor.prototype.visitLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#integerLiteral.
FuzzyJavaParserVisitor.prototype.visitIntegerLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#floatLiteral.
FuzzyJavaParserVisitor.prototype.visitFloatLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotation.
FuzzyJavaParserVisitor.prototype.visitAnnotation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#elementValuePairs.
FuzzyJavaParserVisitor.prototype.visitElementValuePairs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#elementValuePair.
FuzzyJavaParserVisitor.prototype.visitElementValuePair = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#elementValue.
FuzzyJavaParserVisitor.prototype.visitElementValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#elementValueArrayInitializer.
FuzzyJavaParserVisitor.prototype.visitElementValueArrayInitializer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationTypeDeclaration.
FuzzyJavaParserVisitor.prototype.visitAnnotationTypeDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationTypeBody.
FuzzyJavaParserVisitor.prototype.visitAnnotationTypeBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationTypeElementDeclaration.
FuzzyJavaParserVisitor.prototype.visitAnnotationTypeElementDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationTypeElementRest.
FuzzyJavaParserVisitor.prototype.visitAnnotationTypeElementRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationMethodOrConstantRest.
FuzzyJavaParserVisitor.prototype.visitAnnotationMethodOrConstantRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationMethodRest.
FuzzyJavaParserVisitor.prototype.visitAnnotationMethodRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#annotationConstantRest.
FuzzyJavaParserVisitor.prototype.visitAnnotationConstantRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#defaultValue.
FuzzyJavaParserVisitor.prototype.visitDefaultValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#block.
FuzzyJavaParserVisitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#blockStatements.
FuzzyJavaParserVisitor.prototype.visitBlockStatements = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#blockStatement.
FuzzyJavaParserVisitor.prototype.visitBlockStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#localVariableDeclaration.
FuzzyJavaParserVisitor.prototype.visitLocalVariableDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#localTypeDeclaration.
FuzzyJavaParserVisitor.prototype.visitLocalTypeDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#statement.
FuzzyJavaParserVisitor.prototype.visitStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#catchClause.
FuzzyJavaParserVisitor.prototype.visitCatchClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#catchType.
FuzzyJavaParserVisitor.prototype.visitCatchType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#finallyBlock.
FuzzyJavaParserVisitor.prototype.visitFinallyBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#resourceSpecification.
FuzzyJavaParserVisitor.prototype.visitResourceSpecification = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#resources.
FuzzyJavaParserVisitor.prototype.visitResources = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#resource.
FuzzyJavaParserVisitor.prototype.visitResource = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#switchBlockStatementGroup.
FuzzyJavaParserVisitor.prototype.visitSwitchBlockStatementGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#switchLabel.
FuzzyJavaParserVisitor.prototype.visitSwitchLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#forControl.
FuzzyJavaParserVisitor.prototype.visitForControl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#forInit.
FuzzyJavaParserVisitor.prototype.visitForInit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#enhancedForControl.
FuzzyJavaParserVisitor.prototype.visitEnhancedForControl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#parExpression.
FuzzyJavaParserVisitor.prototype.visitParExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#expressionList.
FuzzyJavaParserVisitor.prototype.visitExpressionList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#expression.
FuzzyJavaParserVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#lambdaExpression.
FuzzyJavaParserVisitor.prototype.visitLambdaExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#lambdaParameters.
FuzzyJavaParserVisitor.prototype.visitLambdaParameters = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#lambdaBody.
FuzzyJavaParserVisitor.prototype.visitLambdaBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#primary.
FuzzyJavaParserVisitor.prototype.visitPrimary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classType.
FuzzyJavaParserVisitor.prototype.visitClassType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#creator.
FuzzyJavaParserVisitor.prototype.visitCreator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#createdName.
FuzzyJavaParserVisitor.prototype.visitCreatedName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#innerCreator.
FuzzyJavaParserVisitor.prototype.visitInnerCreator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#arrayCreatorRest.
FuzzyJavaParserVisitor.prototype.visitArrayCreatorRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#classCreatorRest.
FuzzyJavaParserVisitor.prototype.visitClassCreatorRest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#explicitGenericInvocation.
FuzzyJavaParserVisitor.prototype.visitExplicitGenericInvocation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeArgumentsOrDiamond.
FuzzyJavaParserVisitor.prototype.visitTypeArgumentsOrDiamond = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#nonWildcardTypeArgumentsOrDiamond.
FuzzyJavaParserVisitor.prototype.visitNonWildcardTypeArgumentsOrDiamond = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#nonWildcardTypeArguments.
FuzzyJavaParserVisitor.prototype.visitNonWildcardTypeArguments = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeList.
FuzzyJavaParserVisitor.prototype.visitTypeList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeType.
FuzzyJavaParserVisitor.prototype.visitTypeType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#primitiveType.
FuzzyJavaParserVisitor.prototype.visitPrimitiveType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#typeArguments.
FuzzyJavaParserVisitor.prototype.visitTypeArguments = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#superSuffix.
FuzzyJavaParserVisitor.prototype.visitSuperSuffix = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#explicitGenericInvocationSuffix.
FuzzyJavaParserVisitor.prototype.visitExplicitGenericInvocationSuffix = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#arguments.
FuzzyJavaParserVisitor.prototype.visitArguments = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FuzzyJavaParser#backReferenceType.
FuzzyJavaParserVisitor.prototype.visitBackReferenceType = function(ctx) {
  return this.visitChildren(ctx);
};



exports.FuzzyJavaParserVisitor = FuzzyJavaParserVisitor;