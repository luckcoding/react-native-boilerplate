import { createActions } from 'reduxsauce'
import { NavigationActions } from 'react-navigation'
import { AppNavigation } from '../Navigation/AppNavigation'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  redirect: null,
  reset: ['routeName', 'stackName'],
  root: null
})

export const NavigationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const reducer = (state, action) => {
  let newState
  switch (action.type) {
    default:
      newState = AppNavigation.router.getStateForAction(action, state)
  }
  return newState || state
}
