import "./register.css";

function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">BrianSocio</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Briansocio
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
            />
            <input type="text" placeholder="Email" className="registerInput" />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
            />
            <input
              type="password"
              placeholder="confirm password"
              className="registerInput"
            />
            <button className="registerButton">Sign up</button>

            <button className="registerRegisterButton">
              Log into your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
