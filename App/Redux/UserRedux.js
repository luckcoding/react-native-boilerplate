import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signinRequest: ['params'],
  signinFailure: null,
  signinSuccess: ['info'],
  logout: null,
  logoutSuccess: null,
  updateInfo: null,
  updateInfoSuccess: ['info']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,

  isLoggedIn: false,
  info: {}
})

/* ------------- Reducers ------------- */

export const logoutSuccess = state => INITIAL_STATE

export const signinRequest = state => {
  return state.merge({ fetching: true })
}

export const signinSuccess = (state, { info }) => {
  return state.merge({ fetching: false, isLoggedIn: true, info })
}

export const signinFailure = state =>
  state.merge({ fetching: false, error: true })

export const updateInfoSuccess = (state, { info }) => state.merge({ info })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.SIGNIN_REQUEST]: signinRequest,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_FAILURE]: signinFailure,
  [Types.UPDATE_INFO_SUCCESS]: updateInfoSuccess,
})
