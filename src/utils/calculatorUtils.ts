import { calculatorData } from '../data/calculatorData';
import { CalculatorInputs, CalculatorResults } from '../types/calculator';

export function roundDownProduction(production: number): number {
  if (production >= 1800) return 1800;
  if (production >= 1650) return 1650;
  return 1500;
}

export function roundDownMonthlyPayment(payment: number): number {
  const validPayments = [325, 337.5, 350, 362.5, 375, 387.5, 400];
  
  // Find the largest payment that is <= the input payment
  for (let i = validPayments.length - 1; i >= 0; i--) {
    if (payment >= validPayments[i]) {
      return validPayments[i];
    }
  }
  
  // If payment is less than the smallest valid payment, return the smallest
  return validPayments[0];
}

export function calculateCommission(inputs: CalculatorInputs): CalculatorResults {
  const { consumerPricePerKwh, escalator, productionEfficiency, systemSize } = inputs;
  
  // Calculate consumer price per kWh
  const rawConsumerPricePerKwh = (beginningMonthlyPayment * 12) / (productionEfficiency * systemSize);
  // Round down to the hundredth (floor to 2 decimal places)
  const consumerPricePerKwh = Math.floor(rawConsumerPricePerKwh * 100) / 100;
  
  // Round values for lookup
  const roundedProduction = roundDownProduction(productionEfficiency);
  const roundedMonthlyPayment = roundDownMonthlyPayment(beginningMonthlyPayment);
  
  // Find matching row in data
  const matchingRow = calculatorData.find(row => 
    row.production === roundedProduction &&
    row.consumerPricePerKwh === consumerPricePerKwh &&
    row.escalator === `${escalator}%`
  );
  
  if (!matchingRow) {
    throw new Error('No matching data found for the given inputs');
  }
  
  const commissionPerWatt = matchingRow.solarCommission;
  const totalCommission = commissionPerWatt * 1000 * systemSize;
  
  return {
    roundedConsumerPricePerKwh,
    totalCommission,
    lookupValues: {
      roundedProduction,
      roundedMonthlyPayment,
      commissionPerWatt
    }
  };
}