export interface CalculatorData {
  production: number;
  consumerPricePerKwh: number;
  beginningMonthlyPayment: number;
  escalator: string;
  epcReimbursement: number;
  solarCommission: number;
}

export interface CalculatorInputs {
  consumerPricePerKwh: number;
  escalator: string;
  productionEfficiency: number;
  systemSize: number;
  beginningMonthlyPayment: number;
}

export interface CalculatorResults {
  totalCommission: number;
  lookupValues: {
    roundedProduction: number;
    consumerPricePerKwh: number;
    commissionPerWatt: number;
  };
}