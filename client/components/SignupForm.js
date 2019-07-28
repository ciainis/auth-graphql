import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import mutation from '../mutations/signup';
import query from '../queries/currentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Sign up</h3>
        <AuthForm
          handleSubmit={this.handleSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
