import { put, select } from 'redux-saga/effects'
import SettingsActions from '../Redux/SettingsRedux'
import NavigationActions from '../Redux/NavigationRedux'

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    console.tron.display({
      name: '🔥 程序启动 🔥',
      preview: '欢迎使用 starter',
      value: {
        '💃': '可打印 [Object Array String Function ...] etc.'
      }
    })
  }

  const state = yield select()

  const language = state.settings.language
  yield put(SettingsActions.changeLanguage(language))
  yield put(NavigationActions.redirect())
}
