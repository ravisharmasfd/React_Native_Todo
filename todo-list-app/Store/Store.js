import { useReducer } from "react";
import appStore from "./Context.js";
import reducer from "./Reducer.js";
import React from 'react'
import initialState from "./InitialState.js";
function Store({children}) {
    const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <appStore.Provider value={{state , dispatch}}>
        {children}
    </appStore.Provider>
  )
}

export default Store