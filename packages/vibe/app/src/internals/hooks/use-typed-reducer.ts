import { useReducer } from "react";

export const useTypedReducer = <T>(setter: (prev: T, curr: Partial<T>) => T, initial: T) =>
    useReducer((prev: T, curr: Partial<T>) => ({ ...prev, ...curr }), initial);
