import React, {useState, useContext} from 'react'
import cx from 'classnames'
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import swal from 'sweetalert';
import styles from './Login.module.scss'
import { Redirect } from 'react-router';
import {FirebaseContext} from '../../context/auth'

import {useForm} from '../../util/hooks'

function Login(props) {
  const {firebase} = useContext(FirebaseContext)

  //const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const [goHome, setHome] = useState(false);

  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    username: '',
    password: '',
  })

  /*const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login) // getting user data
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })*/

  function loginUserCallback() {
    firebase.auth.signInWithEmailAndPassword(values.username, values.password).then(function(data) {
      if (data == null) {
        swal("Login Failed", "Invalid email or password!", "error");
        return;
      }

      if (!data.user.emailVerified) {
        swal("Not Verified", "Your account has not been verified. Please check your email for instructions to verify your email.\nIf you just verified your account, try logging out and logging back in.", "error")
        return;
      }

      setHome(true);

    }).catch(function(error) {
      swal("Error", "An error has occured: \"" + error + "\"", "error");
    })
  }

  if (goHome) {
    return <Redirect to='/' />
  }

  return (
    <div className={styles.form_container}>
      <Form
        onSubmit={onSubmit}
        noValidate
      >
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/*const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
      type
      stripeId
    }
  }
`*/

export default Login
