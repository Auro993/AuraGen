import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export class CodeGenAgent {
  async generateUI(data: any): Promise<string> {
    console.log('🤖 Generating UI...');
    
    try {
      const prompt = `
        Generate a React component for a simplified form wizard.
        User frustration level: ${(data.loadScore * 100).toFixed(0)}%
        
        Requirements:
        1. Use Tailwind CSS classes
        2. Show step indicator (Step 1 of 3)
        3. One question per step
        4. Clean, modern design
        5. Use className not class

        Return ONLY the React component code. No markdown, no explanations.
      `;

      const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      const command = `curl -s http://localhost:11434/api/generate -d "{\\"model\\":\\"llama3.2\\",\\"prompt\\":\\"${escapedPrompt}\\"}"`;
      
      const { stdout } = await execPromise(command);
      const lines = stdout.split('\n').filter(line => line.trim());
      let fullResponse = '';
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) fullResponse += parsed.response;
        } catch (e) {}
      }

      return fullResponse || this.getFallbackUI(data);
    } catch (error) {
      console.error('❌ AI Error:', error);
      return this.getFallbackUI(data);
    }
  }

  private getFallbackUI(data: any): string {
    return `
      <div className="p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">✨ Simplified Wizard</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600 font-medium">Step 1 of 3</p>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" placeholder="Enter your name" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next Step →</button>
      </div>
    `;
  }
}