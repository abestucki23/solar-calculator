import { calculatorData } from '../data/calculatorData';
import { CalculatorInputs, CalculatorResults } from '../types/calculator';

export function roundDownProduction(production: number): number {
  if (production >= 1800) return 1800;
  if (production >= 1650) return 1650;
  return 1500;
}

export function roundDownConsumerPrice(pricePerKwh: number): number {
    const validPrices = [0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32];
 
    // Find the largest price that is <= the input price
    for (let i = validPrices.length - 1; i >= 0; i--) {
      if (pricePerKwh >= validPrices[i]) {
        return validPrices[i];
      }
    }
 
    // If price is less than the smallest valid price, return the smallest
    return validPrices[0];
  }

export function calculateCommission(inputs: CalculatorInputs): CalculatorResults {
  const { beginningMonthlyPayment, escalator, productionEfficiency, systemSize } = inputs;
  
  // Calculate consumer price per kWh
  const rawConsumerPricePerKwh = (beginningMonthlyPayment * 12) / (productionEfficiency * systemSize);
  // Round down to the hundredth (floor to 2 decimal places)
  const consumerPricePerKwh = Math.floor(rawConsumerPricePerKwh * 100) / 100;
  
  // Round values for lookup
  const roundedProduction = roundDownProduction(productionEfficiency);
  const roundedConsumerPrice = roundDownConsumerPrice(consumerPricePerKwh);
 
  // Find matching row in data
  const matchingRow = calculatorData.find(row =>
    row.production === roundedProduction &&
    row.consumerPricePerKwh === roundedConsumerPrice &&
    row.escalator === `${escalator}%`
  );
  
  if (!matchingRow) {
    throw new Error('No matching data found for the given inputs');
  }
  
  const commissionPerWatt = matchingRow.solarCommission;
  const totalCommission = commissionPerWatt * 1000 * systemSize;
  
  return {
    consumerPricePerKwh,
    totalCommission,
    lookupValues: {
      roundedProduction,
      roundedConsumerPrice,
      commissionPerWatt
    }
  };
}