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
      return state.filter(item => item.id !== action.payload);
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