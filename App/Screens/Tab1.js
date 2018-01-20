import React from 'react'
import {
  View, Text,
  Container, Content, Header, Body, Title, Button,
} from 'native-base'
import { connect } from 'react-redux'

class Tab1 extends React.PureComponent {

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Jump Demo</Title>
          </Body>
        </Header>
        <Content padder bounces={false}>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.props.navigation.navigate('Jump1')}
          >
            <Text>Jump to Jump1 Page</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Tab1
