import { useState } from 'react';

export const storeCustomHook = {
  state: {},
  setValue(value) {
    this.state = value;
    this.setters.map(setter => setter(this.state)); //for each individual setter store state as it comes in
    console.log(this.state);
    // console.log(this.setters.map(setter => setter(this.state)));
  },
  setters: []
};

// Bind the setState function to the store object so 
// we don't lose context when calling it elsewhere
storeCustomHook.setValue = storeCustomHook.setValue.bind(storeCustomHook);

// this is the custom hook we'll call on components.
export function useCustomHook() {
  const [ state, set ] = useState(storeCustomHook.state);
  if (!storeCustomHook.setters.includes(set)) {
    storeCustomHook.setters.push(set);
    storeCustomHook.state[state] = [state];
  }

  return [ state, storeCustomHook.setValue ]
}


