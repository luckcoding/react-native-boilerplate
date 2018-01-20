import { AsyncStorage } from 'react-native'

const then = (response) => new Promise(resolve => {
  const timer = setTimeout(() => {
    resolve({
      ok: true,
      data: response
    })
    clearTimeout(timer)
  }, 200)
})

export default {
  // Functions return fixtures
  signIn: () => then({
    code: '0000',
    data: require('../Fixtures/user.json')
  }),

  query: () => then({
    code: '0000',
    data: require('../Fixtures/user.json')
  }),

  register: () => then({
    code: '0000',
    data: null
  }),

  findPwd: () => then({
    code: '0000',
    data: null
  })
}
