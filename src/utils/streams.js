function createStream(initialState) {
  let mapFunctions = [];

  let stream = value => mapFunctions.map(fn => fn(value));
  stream.map = map.bind(this, mapFunctions, initialState);

  return stream;
}

function map(registeredFunctions, initialState, mapFunction) {
  let newState = undefined;
  if (initialState !== undefined) {
    newState = mapFunction(initialState);
  }

  let newStream = createStream(newState);
  registeredFunctions.push(value => newStream(mapFunction(value)));

  return newStream;
}

function scan(reducer, initial, sourceStream) {
  let newStream = createStream(initial);
  let result = initial;

  sourceStream.map(function(value) {
    result = reducer(result, value);
    newStream(result);
  });

  return newStream;
}

createStream.scan = scan;
export const stream = createStream;
