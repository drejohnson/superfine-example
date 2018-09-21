import { h, patch } from "superfine";

export { h, patch } from "superfine";
export const hh = (tag, children) => h(tag, null, children);
export const createRenderer = (container, node) => view => {
  node = patch(node, view, container);
};
