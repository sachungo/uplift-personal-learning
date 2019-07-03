import React from "react";

import {
  Container,
  Box,
  Button,
  Heading,
  Text,
  TextField
} from "gestalt";
export default class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormEmpty(this.state)) return;
  };

  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  render() {
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#ebe2da'
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          <form
            style={{
              display: 'inlineBlock',
              textAlign: 'center',
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's Get Started</Heading>
              <Text italic color="orchid">Sign up to order some brews!</Text>
            </Box>
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Button color="blue" text="Submit" type="submit" inline />
          </form>
        </Box>
      </Container>
    );
  }
}
