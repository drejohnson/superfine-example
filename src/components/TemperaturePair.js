import { nest } from "../utils/component-helpers";
import { Temperature } from "./Temperature";

export function TemperaturePair(update) {
  const Air = nest(Temperature("Air"), update, "air");
  const Water = nest(
    Temperature("Water", { value: 84, units: "F" }),
    update,
    "water"
  );

  const state = () => Object.assign(Air.state(), Water.state());

  const view = state => [Air.view(state), Water.view(state)];

  return { state, view };
}
