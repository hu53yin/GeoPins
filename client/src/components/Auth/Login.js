import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}`;

const Login = ({ classes }) => {
  const onFailure = err => {
    console.log({ err });
  };

  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;

    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    });

    const data = await client.request(ME_QUERY);

    console.log({ data });
  };

  return (
    <GoogleLogin
      clientId='728470308409-118cqukl0377a70p1uattaagpqcag1t2.apps.googleusercontent.com'
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
