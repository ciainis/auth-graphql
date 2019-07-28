import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/login';

class LoginForm extends Component {
  handleSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password }
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm handleSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
