import React, { useState } from 'react';
import { Sun } from 'lucide-react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { CalculatorResults } from './types/calculator';

function App() {
  const [results, setResults] = useState<CalculatorResults | null>(null);

  const handleCalculate = (calculationResults: CalculatorResults | null) => {
    setResults(calculationResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Sun className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Solar Commission Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your solar sales commission quickly and accurately. Enter your system details 
            and get instant results based on our comprehensive commission matrix.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <CalculatorForm onCalculate={handleCalculate} />
          
          {results && (
            <div className="animate-fade-in">
              <ResultsDisplay results={results} />
            </div>
          )}
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Commission calculations are based on the provided rate matrix and rounded values as specified.</p>
        </div>
      </div>
    </div>
  );
}

export default App;