import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
  View, Text,
  Container, Content, Input, Header, Body, Title, Left, Icon, Right,
  Form, Item, Label, Button,
} from 'native-base'
import UserActions from '../Redux/UserRedux'

class Register extends React.PureComponent {
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
      handleRegister
    } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content padder bounces={false}>
          <Field name="account" component={this.renderInput} />
          <Field name="password1" component={this.renderInput} />
          <Field name="password2" component={this.renderInput} />
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={handleSubmit(handleRegister)}
            disabled={invalid || submitting}
          >
            <Text>Ok</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const validate = ({ account, password1, password2 }) => {
  const errors = {}

  if (!account) {
    errors.account = 'can\'t be null'
  }
  if (!password1) {
    errors.password1 = 'can\'t be null'
  }

  if (!password2) {
    errors.password2 = 'can\'t be null'
  }

  if ((password1 && password2) && password1 !== password2) {
    errors.password1 = errors.password2 = 'not the same'
  }

  return errors
}

const mapDispatchToProps = dispatch => ({
  // just like signin model
  handleRegister: (params) => dispatch(UserActions.signinRequest(params))
})

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'register', validate })(Register)
)