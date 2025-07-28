import React, { useState } from 'react';
import { DollarSign, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { CalculatorInputs, CalculatorResults } from '../types/calculator';
import { calculateCommission } from '../utils/calculatorUtils';

interface CalculatorFormProps {
  onCalculate: (results: CalculatorResults | null) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    beginningMonthlyPayment: 400,
    escalator: '2.99',
    productionEfficiency: 1650,
    systemSize: 10
  });

  const [error, setError] = useState<string>('');

  const calculateAndUpdate = () => {
    if (!inputs.systemSize || inputs.systemSize <= 0) {
      setError('Please enter a valid system size');
      onCalculate(null);
      return;
    }

    try {
      const results = calculateCommission(inputs);
      
      // Check if consumer price per kWh is below 26 cents
      if (results.consumerPricePerKwh < 0.26) {
        setError('Viam cannot reimburse projects at that price point (below $0.26/kWh)');
        onCalculate(null);
        return;
      }
      
      setError('');
      onCalculate(results);
    } catch (error) {
      setError('Calculation error occurred');
      onCalculate(null);
    }
  };

  // Calculate results whenever inputs change
  React.useEffect(() => {
    calculateAndUpdate();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Parameters</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <DollarSign className="w-4 h-4" />
            Beginning Monthly Payment: ${inputs.beginningMonthlyPayment}
          </label>
          <div className="px-2">
            <input
              type="range"
              min="100"
             max="400"
             step="1"
              value={inputs.beginningMonthlyPayment}
              onChange={(e) => handleInputChange('beginningMonthlyPayment', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$100</span>
             <span>$400</span>
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Zap className="w-4 h-4" />
            Production Efficiency: {inputs.productionEfficiency} kWh/kW annually
          </label>
          <div className="px-2">
            <input
              type="range"
              min="1100"
              max="2000"
              step="50"
              value={inputs.productionEfficiency}
              onChange={(e) => handleInputChange('productionEfficiency', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1,100</span>
              <span>2,000</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4" />
              Escalator Rate
            </label>
            <select
              value={inputs.escalator}
              onChange={(e) => handleInputChange('escalator', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="2.99">2.99%</option>
              <option value="3.50">3.50%</option>
              <option value="3.99">3.99%</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Zap className="w-4 h-4" />
              System Size (kW)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.systemSize}
              onChange={(e) => handleInputChange('systemSize', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="10.0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}