import React, { Dispatch } from "react";
import { TotalSum } from "../components/app/app";

export const TotalSumContext = 
React.createContext
    <{ totalSum: TotalSum, totalSumDispatcher: Dispatch<{ type: string; payload: TotalSum; }> }>({ totalSum: {value: 0}, totalSumDispatcher: () => {}})

