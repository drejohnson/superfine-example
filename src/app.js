import { h, hh } from "./utils/dom";
import { nest } from "./utils/component-helpers";

import { TemperaturePair } from "./components/TemperaturePair";

export function createApp(update) {
  const app = nest(TemperaturePair, update, "temperatures");

  return { state: app.state, view: state => hh("main", app.view(state)) };
}

export const emptyApp = h("main");
