import AppHeader from '../components/head'

const Login = ({authenticate}) => {
  return (
    <div>
      <AppHeader />
      <h2>CASH APP</h2>
      <h3>Login to manage your monthly budget</h3>
      <button className="btn" onClick={() => authenticate('github')}>
        Login with Github
      </button>
    </div>
  )
}

Login.propTypes = {
  authenticate: React.PropTypes.func.isRequired
}

export default Login
