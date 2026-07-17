const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

class ASTValidator {
  // Validate generated code for security
  static validate(code) {
    try {
      // Parse code into AST
      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });

      let isValid = true;
      let errors = [];

      // Traverse AST to check for security issues
      traverse(ast, {
        // Check for dangerous eval calls
        CallExpression(path) {
          if (path.node.callee.name === 'eval') {
            isValid = false;
            errors.push('eval() is not allowed');
          }
          if (path.node.callee.name === 'Function') {
            isValid = false;
            errors.push('Function constructor is not allowed');
          }
        },
        // Check for dangerous imports
        ImportDeclaration(path) {
          const source = path.node.source.value;
          if (source.includes('child_process') || 
              source.includes('fs') || 
              source.includes('http') ||
              source.includes('net')) {
            isValid = false;
            errors.push(`Unsafe import: ${source}`);
          }
        }
      });

      return {
        isValid,
        errors,
        ast: isValid ? ast : null
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [`Parse error: ${error.message}`],
        ast: null
      };
    }
  }

  // Generate code from AST
  static generateCode(ast) {
    try {
      const output = generate(ast);
      return output.code;
    } catch (error) {
      console.error('Error generating code:', error);
      return null;
    }
  }

  // Sanitize code
  static sanitize(code) {
    // Remove dangerous patterns
    let sanitized = code
      .replace(/eval\s*\(/g, '// eval removed')
      .replace(/Function\s*\(/g, '// Function constructor removed')
      .replace(/require\s*\(/g, '// require removed')
      .replace(/import\s*\(/g, '// import removed');
    
    return sanitized;
  }
}

module.exports = ASTValidator;