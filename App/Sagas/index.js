import { takeLatest, all } from 'redux-saga/effects'
import Request from '../Services/Request'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { NavigationTypes } from '../Redux/NavigationRedux'
import { AppTypes } from '../Redux/AppRedux'
import { UserTypes } from '../Redux/UserRedux'
import { SettingsTypes } from '../Redux/SettingsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { redirectFlow, resetFlow, rootFlow, sideFlow } from './NavigationSagas'
import { sigin, logout, info } from './UserSagas'
import { appintro } from './AppSagas'
import { updateLanguage } from './SettingsSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // 启动
    takeLatest(StartupTypes.STARTUP, startup),
    // 多语言
    takeLatest(SettingsTypes.CHANGE_LANGUAGE, updateLanguage),
    // 跳转处理
    takeLatest(NavigationTypes.REDIRECT, redirectFlow),
    takeLatest(NavigationTypes.RESET, resetFlow),
    takeLatest(NavigationTypes.ROOT, rootFlow),

    // 引导页
    takeLatest(AppTypes.APPINTRO, appintro),
    // 登录退出
    takeLatest(UserTypes.SIGNIN_REQUEST, sigin, Request),
    takeLatest(UserTypes.LOGOUT, logout),
    // 更新用户信息
    takeLatest(UserTypes.UPDATE_INFO, info, Request)
  ])
}
