import PropTypes from 'prop-types';
import AppHeader from '../components/head';
import GithubSvg from '../static/icons/github.svg';

const Login = ({ authenticate }) => {
  return (
    <div className="page">
      <AppHeader />
      <h1>L’Argent</h1>
      <h2>Login to manage your monthly budget</h2>
      <button className="btn icon" onClick={() => authenticate('github')}>
        <GithubSvg />
        Login with Github
      </button>
      <style>{`
        .page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 90vh;
        }
        h1, h2 {
          margin: 0;
          margin-bottom: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
          font-weight: 300;
        }
        h1 {
          font-family: georgia;
          font-weight: 700;
        }
        .btn {
          margin-top: 1rem;
          color: #fff;
          background-color: #111;
          position: relative;
          display: inline-block;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          border: 1px solid rgba(27,31,35,0.2);
          border-radius: 0.25em;
          appearance: none;
        }
        .btn:hover,
        .btn:focus {
          background-color: #333;
        }
        .btn:active {
          box-shadow: inset 0 0.15em 0.3em rgba(27,31,35,0.15);
        }
        .btn.icon {
          display: flex;
          align-items: center;

        }
        .btn.icon svg {
          margin-right: 10px;
          width: 16px;
          fill: #fff;
     `}</style>
    </div>
  );
};

Login.PropTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
