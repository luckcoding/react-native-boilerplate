import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appintro: ['status'],
  appsetting: ['info']
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hasReadAppintro: false
})

/* ------------- Reducers ------------- */

export const appsetting = (state, { info }) => state.merge({ ...info })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPSETTING]: appsetting
})
