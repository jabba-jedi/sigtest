import * as ts from 'typescript'
import { Serializer, SerializationResult } from './Serializer'

export function generateSignatures(fileNames: string[], options: ts.CompilerOptions): SerializationResult[] {
    let program = ts.createProgram(fileNames, options)
    let checker = program.getTypeChecker()
    let serializer = new Serializer(checker)

    let output: SerializationResult[] = []

    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            ts.forEachChild(sourceFile, visit)
        }
    }

    return output

    function visit(node: ts.Node) {
        // for namespaces
        // !ts.isModuleBlock(node) &&
        if (!isNodeExported(node)) {
            return
        }
        if (ts.isVariableStatement(node)) {
            if (ts.isVariableDeclarationList(node.declarationList)) {
                if (node.declarationList.declarations.length) {
                    const varDeclaration = node.declarationList.declarations[0]
                    if (varDeclaration.initializer && ts.isArrowFunction(varDeclaration.initializer)) {
                        add(serialize(varDeclaration.name, (s) => serializer.doArrowFxDeclarations(s)))
                    } else {
                        add(serialize(varDeclaration.name, (s) => serializer.doConstant(s)))
                    }
                }
            }
        } else if (ts.isFunctionDeclaration(node) && node.name && node.body) {
            add(serialize(node.name, (s) => serializer.doFxDeclarations(s)))
        } else if (ts.isClassDeclaration(node) && node.name) {
            add(serialize(node.name, (s) => serializer.doClass(s)))
        } else if (ts.isModuleDeclaration(node) || ts.isModuleBlock(node)) {
            ts.forEachChild(node, visit)
        }
    }

    function serialize(node: ts.Node, serialize: (symbol: ts.Symbol) => SerializationResult | SerializationResult[]) {
        let symbol = checker.getSymbolAtLocation(node)
        if (symbol) {
            let result = serialize(symbol)
            if (Array.isArray(result)) {
                return result
            }
            return [result]
        }
        return []
    }

    function add(result: SerializationResult[]) {
        output = output.concat(result)
    }

    function serializeSymbol(symbol: ts.Symbol): any {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)),
        }
    }

    function serializeClass(symbol: ts.Symbol) {
        let details = serializeSymbol(symbol)

        let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
        details.constructors = constructorType.getConstructSignatures().map(serializeSignature)
        return details
    }

    function serializeSignature(signature: ts.Signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment(checker)),
        }
    }

    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node: ts.Node): boolean {
        return (
            (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0
            // not working with namespaces
            // || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
        )
    }
}
