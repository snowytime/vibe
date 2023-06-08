import { useMemo, useRef } from "react";
import { deepEqual } from "../helpers";

export const useObjectiveMemo = <T extends object>(object: T) => {
    const objRef = useRef(object);
    return useMemo(() => {
        if (!deepEqual(objRef.current, object)) {
            objRef.current = object;
        }
        return objRef.current;
    }, [object]);
};
