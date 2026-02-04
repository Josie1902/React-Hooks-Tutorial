"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ValueContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export const ValueContext = createContext<ValueContextType | null>(null)

export default function ValueContextProvider({children}: {children: React.ReactNode}) {
  const [count, setCount] = useState(0)

  return(
    <ValueContext.Provider value={{count, setCount}}>
     {children}
    </ValueContext.Provider>
  )
}

export function useValueContext() {
  const context = useContext(ValueContext)
  if (!context) {
    throw new Error("useValueContext must be used within a ValueContextProvider")
  }
  return context 
}