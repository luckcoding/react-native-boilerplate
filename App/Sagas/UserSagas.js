import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import NavigationReduxActions from '../Redux/NavigationRedux'
import { NavigationActions } from 'react-navigation'

export function * sigin (api, action) {
  const { params } = action
  const result = yield call(api, 'signIn', params, { duration: 500 })
  if (result.code === '0000') {
    yield put(UserActions.signinSuccess(result.data))
    yield put(NavigationReduxActions.redirect())
  } else {
    yield put(UserActions.signinFailure())
  }
}

export function * logout () {
  yield put(UserActions.logoutSuccess())
  yield put(NavigationReduxActions.redirect())
}

export function * info (api) {
  const result = yield call(api, 'queryUserInfo')
  if (result.code === '0000') {
    yield put(UserActions.updateInfoSuccess(result.data))
  } else {
    Toast.show(result.msg)
  }
}
