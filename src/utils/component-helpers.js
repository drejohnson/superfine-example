export const updatePath = (update, path) => func => {
  update(state => {
    state[path] = func(state[path]);
    return state;
  });
};

export function nest(createComponent, update, path) {
  const component = createComponent(updatePath(update, path));
  let componentInstance = Object.assign({}, component);

  if (component.state) {
    componentInstance.state = () => ({ [path]: component.state() });
  }

  if (component.view) {
    componentInstance.view = state => component.view(state[path]);
  }

  return componentInstance;
}
