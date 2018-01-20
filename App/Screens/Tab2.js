import React from 'react'
import {
  View, Text,
  Container, Content, Header, Body, Title, Button,
} from 'native-base'
import { connect } from 'react-redux'

class Tab2 extends React.PureComponent {

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Tab2</Title>
          </Body>
        </Header>
        <Content padder bounces={false}>
        </Content>
      </Container>
    )
  }
}

export default Tab2
