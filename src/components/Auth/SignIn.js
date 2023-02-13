import { userAuth } from "../../config/Login";
import { useState, useContext } from "react";
import Context from "../../context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const { setAuthToken } = useContext(Context);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const signIn = () => {
    userAuth(email, password)
      .then(({ token }) => setAuthToken(token))
      .catch((e) => setErr(e));
  };

  return (
    <div className="auth-container">
      <div className="sign-in">
        <div className="header">
          <h3>Giriş Yap</h3>
        </div>
        <div className="sign-in-item email">
          <label htmlFor="email">
            <span>Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={handleEmail}
          />
        </div>
        <div className="sign-in-item password">
          <label htmlFor="password">
            <span>Password</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handlePass}
          />
        </div>
        {err && (
          <div className="response">
            <p>Lütfen kayıtlı olan bir hesap ile giriş yapınız!</p>
          </div>
        )}
        <div className="signIn">
          <button className="sign-btn" onClick={signIn}>
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
