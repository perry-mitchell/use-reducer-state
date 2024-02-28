import { expect } from "chai";
import { act, renderHook } from "@testing-library/react";
import { useReducer } from "../../dist/hook.js";

describe("useReducer", function () {
    function getInitialState() {
        return {
            a: 1,
            b: true,
            c: []
        };
    }

    beforeEach(function () {
        this.reduce = (state, action) => {
            switch (action.type) {
                case "increment":
                    return {
                        ...state,
                        a: state.a + 1
                    };
                default:
                    throw new Error(`Bad action: ${action.type}`);
            }
        };
    });

    describe("getState method", function () {
        it("returns identical state", function () {
            const {
                result: {
                    current: [state, , getState]
                }
            } = renderHook(() => useReducer(this.reduce, getInitialState));
            const processedState = getState();
            expect(processedState).to.deep.equal(state);
        });

        it("returns updated state", function () {
            const {
                result: {
                    current: [, dispatch, getState]
                }
            } = renderHook(() => useReducer(this.reduce, getInitialState));
            act(() => {
                dispatch({
                    type: "increment"
                });
            });
            expect(getState()).to.deep.equal({
                ...getInitialState(),
                a: 2
            });
        });
    });

    describe("state", function () {
        it("matches initial state", function () {
            const {
                result: {
                    current: [state]
                }
            } = renderHook(() => useReducer(this.reduce, getInitialState));
            expect(state).to.deep.equal(getInitialState());
        });

        it("matches updated state", function () {
            const { result } = renderHook(() => useReducer(this.reduce, getInitialState));
            act(() => {
                result.current[1]({
                    type: "increment"
                });
            });
            expect(result.current[0]).to.deep.equal({
                ...getInitialState(),
                a: 2
            });
        });
    });
});
