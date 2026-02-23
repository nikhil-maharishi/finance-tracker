import { createContext, useReducer, type Dispatch, type ReactNode } from "react";

export type Transaction = {
  id:string
  amount: string;
  category: string;
  date: number;
  description: string;
};

type Action =
  | { type: "ADD"; payload: Transaction }
  | { type: "REMOVE"; payload: string };

export type TransactionContextType = {
  state: Transaction[];
  dispatch: Dispatch<Action>;
};

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

function transactionReducer(state:Transaction[], action:Action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter(item => item.category !== action.payload);
    default:
      return state;
  }
}
type TransactionProviderProps = {
  children: ReactNode;
};
export function TransactionProvider({ children }:TransactionProviderProps) {
  const [state, dispatch] = useReducer(transactionReducer, []);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

type BudgetAction =
  | { type: "ADD"; payload: number }

export type BudgetContextType = {
  state: number;
  dispatch: Dispatch<BudgetAction>;
};

export const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

function budgetReducer(state:number, action:BudgetAction) {
  switch (action.type) {
    case "ADD":
      return action.payload;
    default:
      return state;
  }
}
type BudgetProviderProps = {
  children: ReactNode;
};
export function BudgetProvider({ children }:BudgetProviderProps) {
  const [state, dispatch] = useReducer(budgetReducer, 0);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}