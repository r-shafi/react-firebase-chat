import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

import Login from './pages/Login';
import Room from './pages/Room';

function App() {
  const [user] = useAuthState(auth);

  return <div className="App">{user ? <Room /> : <Login />}</div>;
}

export default App;
