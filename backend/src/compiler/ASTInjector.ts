export class ASTInjector {
  validateCode(code: string): boolean {
    if (!code || code.trim().length === 0) return false;
    
    const dangerous = ['eval(', 'document.write', 'innerHTML =', 'localStorage'];
    for (const pattern of dangerous) {
      if (code.includes(pattern)) return false;
    }
    
    return true;
  }
}