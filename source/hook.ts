import { Reducer, useCallback, useMemo, useReducer as useReactReducer, useRef } from "react";

type Dispatch<A> = (value: A) => void;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;

// Adapted from:
//   https://github.com/tranvansang/enhanced-reducer/blob/master/index.ts

export function useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initializer: () => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>, () => ReducerState<R>] {
    const initialStateValue = useMemo(initializer, []);
    const lastState = useRef(initialStateValue);
    const getState = useCallback(() => lastState.current, []);
    const enhancedReducer = useRef((state: ReducerState<R>, action: ReducerAction<R>) => {
        lastState.current = reducer(state, action);
        return lastState.current;
    }).current; // to prevent reducer called twice, per: https://github.com/facebook/react/issues/16295
    // @ts-ignore - Types for useReducer are inaccurate for `initializer`
    const [state, dispatch] = useReactReducer(enhancedReducer, null, initializer);
    return [state, dispatch, getState];
}
