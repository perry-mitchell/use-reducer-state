# useReducer state

> React `useReducer` with state getter

## About

A simple React hook `useReducer` implementation that supports state getting. Instead of just receiving the `state` and `dispatch` results from the `useReducer` hook, you receive a third option for fetching the state.

## Installation

Install by running `npm install use-reducer-state --save-dev`, and import it in your project for it to be bundled by whatever build system you're using.

## Usage

Import `useReducer` just as you would from React:

```typescript
import React from "react";
import { useReducer } from "use-reducer-state";

function initialStateGetter() {
    return {
        // ...
    };
}

function reducerFn(state, action) {
    switch (action.type) {
        // ...
    }
}

export function MyComponent() {
    const [state, dispatch, getState] = useReducer(reducerFn, initialStateGetter);
    // ...
}
```
