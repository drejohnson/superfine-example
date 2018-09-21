import { patch } from "superfine";

const mainNode = {
  last: null,
  next: null,
  container: null
};

export const r = (view, container, node) => state => {
  node = patch(node, view(state), container);
};

const render = view => r(view, document.body);

export default (last, next, container) => {
  mainNode.next = next;
  mainNode.container = container;
  mainNode.last = patch(last, next, container);
};
