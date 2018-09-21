import { h, hh } from "../utils/dom";

function convert(value, to) {
  let newValue;
  if (to === "C") {
    newValue = ((value - 32) / 9) * 5;
  } else {
    newValue = (value * 9) / 5 + 32;
  }

  return Math.round(newValue);
}

export const Temperature = (label, init) => update => {
  const increase = value => () =>
    update(state => {
      state.value += value;
      return state;
    });

  const changeUnits = () =>
    update(state => {
      let newUnits = state.units === "C" ? "F" : "C";
      state.value = convert(state.value, newUnits);
      state.units = newUnits;
      return state;
    });

  const reset = () =>
    update(state => {
      state.value = 22;
      if (state.units === "F") {
        state.value = convert(state.value);
      }

      return state;
    });

  const state = () => Object.assign({ value: 22, units: "C" }, init);

  const view = state =>
    hh("div", [
      hh("p", `${label} temperature: ${state.value} ${state.units}`),
      h("button", { onclick: increase(1) }, "+1"),
      h("button", { onclick: increase(-1) }, "-1"),
      h("br"),
      h("button", { onclick: changeUnits }, "Change Units"),
      h("br"),
      h("button", { onclick: reset }, "Reset")
    ]);

  return { state, view };
};
