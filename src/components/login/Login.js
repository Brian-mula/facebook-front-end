import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">BrianSocio</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Briansocio
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="text" placeholder="Email" className="loginInput" />
            <input type="password" placeholder="Email" className="loginInput" />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot password</span>
            <button className="loginRegisterButton">Create new Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
