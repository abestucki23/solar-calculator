import React from 'react';
import { DollarSign, Info, Target } from 'lucide-react';
import { CalculatorResults } from '../types/calculator';

interface ResultsDisplayProps {
  results: CalculatorResults;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatRate = (rate: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(rate);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Calculation Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Consumer Price per kWh</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">
            {formatRate(results.consumerPricePerKwh)}
          </p>
          <p className="text-sm text-blue-600 mt-1">per kilowatt-hour</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Total Commission</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">
            {formatCurrency(results.totalCommission)}
          </p>
          <p className="text-sm text-green-600 mt-1">your commission</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Lookup Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Rounded Production</p>
            <p className="font-semibold text-gray-800">
              {results.lookupValues.roundedProduction.toLocaleString()} kWh/kW
            </p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-1">Rounded Monthly Payment</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(results.lookupValues.roundedMonthlyPayment)}
            </p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-1">Commission per Watt</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(results.lookupValues.commissionPerWatt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}