import React from 'react'
import {
  View, Text,
  Container, Content, Header, Body, Title, Button, Left, Right, Icon
} from 'native-base'
import { connect } from 'react-redux'
import NavigationActions from '../Redux/NavigationRedux'

class Jump2 extends React.PureComponent {

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Jump2</Title>
          </Body>
          <Right />
        </Header>
        <Content padder bounces={false}>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.props.dispatch(NavigationActions.root())}
          >
            <Text>back to root</Text>
          </Button>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.props.dispatch(NavigationActions.reset('Tab'))}
          >
            <Text>reset to root</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect()(Jump2)
