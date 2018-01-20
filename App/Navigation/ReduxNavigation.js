import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { AppNavigation } from './AppNavigation'

// here is our redux-aware our smart component
function ReduxNavigation ({ dispatch, nav: state }) {
  return <AppNavigation navigation={addNavigationHelpers({ dispatch, state })} />
}

const mapStateToProps = ({ nav }) => ({ nav })

export default connect(mapStateToProps)(ReduxNavigation)
