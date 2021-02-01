import React from 'react';
import Enzyme, {shallow, ShallowWrapper} from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"

function add (a: number, b: number) {
    return a + b
}

function div (nominator: number, denom: number) {
    if (denom === 0) {
        throw new Error("cannot divide by zero")
    }
    return nominator / denom
}

test("add is working for arbiraty number. example: add 3 7 -> 10", () => {
    expect(add(3, 7)).toBe(10)
})

test("div is working for any number", () => {
    expect(div(10, 5)).toBe(2)
})

test("div canot accpet 0 as denom", () => {
    expect(div(10, 0)).toThrow("cannot divide by zero")
})