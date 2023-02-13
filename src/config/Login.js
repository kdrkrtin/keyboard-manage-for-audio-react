import app from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const userAuth = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    ({ _tokenResponse }) => {
      if (_tokenResponse.registered) {
        const expiresIn = new Date().getTime() + _tokenResponse.expiresIn * 1000;
        const token = _tokenResponse.idToken;
        const userId = _tokenResponse.localId;

        const userAuth = {
          expiresIn,
          userId,
          token,
        };
        localStorage.setItem("userAuth", JSON.stringify(userAuth));

        return userAuth;
      }
    }
  );
};

export { userAuth };
