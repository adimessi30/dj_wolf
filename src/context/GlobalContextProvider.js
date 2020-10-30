import React, { createContext, useContext, useReducer } from 'react'
import { initialState } from './AppReducer'

export const GlobalContext = createContext(initialState)

export const GlobalContextProvider = ({ reducer, initialState, children }) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
)

export const useGlobalContext = () => useContext(GlobalContext)
