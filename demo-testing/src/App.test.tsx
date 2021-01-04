import React from 'react';
import Enzyme, { shallow } from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"
import App from './App';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
})

test("Render app without error", () => {
  const wrapper = shallow(<App />)
  const component = wrapper.find("[data-test='component-app']")
  expect(component.length).toBe(1)
})

test("Render a button", () => {

})

test("Display counter", () => {

})

test("Counter starts at 0", () => {

})

test ("Click counter inc the value", () => {

})


