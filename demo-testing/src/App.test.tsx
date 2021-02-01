import React from 'react';
import Enzyme, {shallow, ShallowWrapper} from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"
import App from './App';

// Setup react adapter
Enzyme.configure({
  adapter: new EnzymeAdapter(),
})

/**
 * Factory function to create ShallowWrapper for app component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (): ShallowWrapper => shallow(<App />)

/**
 * Helper function return for finding component by data-test attr
 * @function findByTestAttr
 * @returns {ShallowWrapper}
 * @param {ShallowWrapper} wrapper
 * @param {string} tag
 */
const findByTestAttr = (wrapper: ShallowWrapper, tag: string): ShallowWrapper => wrapper.find(`[data-test='${tag}']`)

test("Render app without error", () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, "component-app")
  expect(component.length).toBe(1)
})

test("Render a button", () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, "increment-button")
  expect(component.length).toBe(1)
})

test("Display counter", () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, "counter-display")
  expect(component.length).toBe(1)
})

describe("Increament", () => {
  test("Counter starts at 0", () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, "count")
    expect(component.text()).toBe("0")
  })

  test ("Click counter inc the value", () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, "increment-button")
    button.simulate("click")
    const count = findByTestAttr(wrapper, "count").text()
    expect(count).toBe("1")
  })
})


