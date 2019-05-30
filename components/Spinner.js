import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';


export default class CustomSpinner extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner />
          <Spinner color='red' />
        </Content>
      </Container>
    );
  }
}