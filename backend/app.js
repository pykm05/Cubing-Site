import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("app is listening on port 3000")
});

app.get('/', (request, response) => {
  response.json({ data: "Hello from server" });
  console.log(request);
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/'));
  // res.json({ data: "hello" });
});

const firebaseConfig = {
  apiKey: "AIzaSyBGWculLGhGFAWY5gsZeAmgoAyjtVcOdIY",
  authDomain: "cubing-project.firebaseapp.com",
  projectId: "cubing-project",
  storageBucket: "cubing-project.firebasestorage.app",
  messagingSenderId: "570671666291",
  appId: "1:570671666291:web:959d792ca90c0503b80606"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);
auth.languageCode = 'it';

const provider =  new GoogleAuthProvider();

// Endpoint to trigger Google Sign-In
app.post('/google-login', async (req, res) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    res.json({ token, user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    res.status(500).json({ error: { errorCode, errorMessage, email, credential } });
  }
});