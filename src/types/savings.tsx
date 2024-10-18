export interface Transaction {
    id: string;           // or number, depending on your implementation
    time: string;
    paymentMode: string;
    amount: number;
  }
  
  export interface SavingsData {
    currentBalance: number;
    projectedGrowth: number[];
    recentTransactions: Transaction[];
  }
  