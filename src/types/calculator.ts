export interface CalculatorData {
  production: number;
  consumerPricePerKwh: number;
  beginningMonthlyPayment: number;
  escalator: string;
  epcReimbursement: number;
  solarCommission: number;
}

export interface CalculatorInputs {
  beginningMonthlyPayment: number;
  escalator: string;
  productionEfficiency: number;
  systemSize: number;
}

export interface CalculatorResults {
  consumerPricePerKwh: number;
  totalCommission: number;
  lookupValues: {
    roundedProduction: number;
    roundedMonthlyPayment: number;
    commissionPerWatt: number;
  };
}