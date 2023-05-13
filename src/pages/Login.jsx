import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

export default function Login() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="text homepageText">NEUB Anonymous Chat Room</p>
    </>
  );
}
