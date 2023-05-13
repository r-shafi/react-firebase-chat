import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

export default function Login() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center text-center">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        NEUB Anonymous Chat Room
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Connect with your university friends in an anonymous chat room where you
        can talk about anything without judgment.
      </p>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </main>
  );
}
