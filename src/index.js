import { createRenderer } from "./utils/dom";
import { stream } from "./utils/streams";

import { createApp, emptyApp } from "./app";

const render = createRenderer(document.body);

let update = stream();
let app = createApp(update);

let store = stream.scan((state, fn) => fn(state), app.state(), update);

store.map(state => render(app.view(state)));

if (module && module.hot) {
  module.hot.dispose(() => render(emptyApp));
}
