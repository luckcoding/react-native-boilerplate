import React from 'react'
import {
  View, Text,
  Container, Content, Header, Body, Title, Button,
} from 'native-base'
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'

class Tab3 extends React.PureComponent {

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Me</Title>
          </Body>
        </Header>
        <Content padder bounces={false}>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={this.props.handleLogout}
          >
            <Text>Sign Out</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(UserActions.logout()),
})

export default connect(null, mapDispatchToProps)(Tab3)
