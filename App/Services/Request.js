import LoadingView from '../Components/Loading'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

// request
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/**
 * handle loading
 * @param {Object} options [description]
 */
function Loading (options = {}) {
  this.time = null
  this.duration = options.duration || 800
}

Loading.prototype.show = function () {
  this.time = Date.now()
  LoadingView.show()
}

Loading.prototype.hide = function () {
  const duration = Date.now() - this.time
  if (duration >= this.duration) {
    LoadingView.hide()
  } else {
    let timer = setTimeout(() => {
      LoadingView.hide()
      clearTimeout(timer)
    }, this.duration - duration)
  }
}

export default function Request (md, parmas, options = {
  loading: true,
  duration: 200
}) {
  const LoadFn = new Loading(options)
  LoadFn.show()
  return api[md](parmas)
    .then(res => res.ok ? res.data : { msg: res.data.msg })
    .catch(() => { throw Error('Request Error' ) })
    .finally(() => LoadFn.hide())
}
