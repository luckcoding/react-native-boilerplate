import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
  Container, Content, Input, Header, Body, Title,
  Form, Item, Label, Button, View, Text
} from 'native-base'
import UserActions from '../Redux/UserRedux'

class SignIn extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  }

  renderInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    const hasError = !!((touched && error))
    const hasWarning = !!((touched && warning))
    return (
      <Item error={hasError}>
        <Input
          placeholder={input.name}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    )
  }

  render () {
    const {
      navigation, handleSubmit, invalid, submitting,
      handleSigin
    } = this.props
    return (
      <Container>
        <Header>
          <Body>
            <Title>Sign In</Title>
          </Body>
        </Header>
        <Content padder bounces={false}>
          <Field name="account" component={this.renderInput} />
          <Field name="password" component={this.renderInput} />
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={handleSubmit(handleSigin)}
            disabled={invalid || submitting}
          >
            <Text>Sign In</Text>
          </Button>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forget')}
            >
              <Text>Forget Password</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const validate = ({ account, password }) => {
  const errors = {}

  if (!account) {
    errors.account = 'can\'t be null'
  }
  if (!password) {
    errors.password = 'can\'t be null'
  }

  return errors
}

const mapDispatchToProps = dispatch => ({
  handleSigin: (params) => dispatch(UserActions.signinRequest(params))
})

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'signin', validate })(SignIn)
)