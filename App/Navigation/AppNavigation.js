import React from 'react'
import { Icon } from 'native-base'
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import Home from '../Screens/Home'
import SignIn from '../Screens/SignIn'
import AppIntro from '../Screens/AppIntro'
import Launcher from '../Screens/Launcher'
import Register from '../Screens/Register'
import Tab1 from '../Screens/Tab1'
import Tab2 from '../Screens/Tab2'
import Tab3 from '../Screens/Tab3'
import Jump1 from '../Screens/Jump1'
import Jump2 from '../Screens/Jump2'

// The home page of different states
export const INITIAL_AUTHEN_ROUTE_NAME = 'Tab'
export const INITIAL_UNAUTHEN_ROUTE_NAME = 'SignIn'
export const APPINTRO_ROUTE_NAME = 'AppIntro'

// Tabbar
export const TabNavigation = TabNavigator({
  Tab1: {
    screen: Tab1,
    path: '/Tab1',
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Tab1',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon active={focused} name="analytics" />
      )
    }),
  },
  Tab2: {
    screen: Tab2,
    path: '/Tab2',
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Tab2',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon active={focused} name="brush" />
      )
    }),
  },
  Tab3: {
    screen: Tab3,
    path: '/Tab3',
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Tab3',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon active={focused} name="person" />
      )
    }),
  }
}, {
  initialRouteName: 'Tab1',
})

// auth
const AUTHEN_ROUTES = {
  [INITIAL_AUTHEN_ROUTE_NAME]: { screen: TabNavigation },
  Jump1: { screen: Jump1 },
  Jump2: { screen: Jump2 }
}

export function isAuthenRouteName (routeName) {
  return !!AUTHEN_ROUTES[routeName]
}

// unauth
const UNAUTHEN_ROUTES = {
  SignIn: { screen: SignIn },
  Register: { screen: Register }
}

export function isUnauthenRouteName (routeName) {
  return !!UNAUTHEN_ROUTES[routeName]
}

// special
const GLOBAL_SCREEN = {
  AppIntro: { screen: AppIntro }
}

// App
export const AppNavigation = StackNavigator({
  Launcher: { screen: Launcher },
  ...AUTHEN_ROUTES,
  ...UNAUTHEN_ROUTES,
  ...GLOBAL_SCREEN
}, {
  initialRouteName: 'Launcher',
  gesturesEnabled: true,
  headerMode: 'none',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
})

// handler
const defaultGetStateForAction = AppNavigation.router.getStateForAction
AppNavigation.router.getStateForAction = (action, state) => {
  const { type, routeName } = action

  // jump twice
  if (state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) return null

  // back to one stack
  if (state && type === NavigationActions.BACK) {
    const backRoute = state.routes.find(route => route.routeName === action.key)
    if (backRoute) {
      const backRouteIndex = state.routes.indexOf(backRoute)
      const route = {
        ...state,
        routes: state.routes.slice(0, backRouteIndex + 1),
        index: backRouteIndex
      }
      return route
    }
  }

  return defaultGetStateForAction(action, state)
}
