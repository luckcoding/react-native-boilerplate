import { call, put } from 'redux-saga/effects'
import AppActions from '../Redux/AppRedux'
import NavigationActions from '../Redux/NavigationRedux'

export function * appintro () {
  yield put(AppActions.appsetting({ hasReadAppintro: true }))
  yield put(NavigationActions.redirect())
}
