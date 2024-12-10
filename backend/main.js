import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById("google-login-btn");

googleLoginBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    // You can send this token to your server to authenticate the user
    console.log(token, user);
  } catch (error) {
    console.error(error.message);
  }
});
