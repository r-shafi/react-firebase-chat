import { useState } from 'react';

import {
  addDoc,
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Message } from '../components/Message';
import { UpdateProfile } from '../components/UpdateProfile';
import { auth } from '../firebase/firebase';

export default function Room() {
  const recentMessagesQuery = query(
    collection(getFirestore(), 'messages'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  const [messages] = useCollectionData(recentMessagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(
    !localStorage.getItem('showProfileModal')
  );

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(getFirestore(), 'messages'), {
      name: getAuth().currentUser.displayName,
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
  };

  return (
    <>
      <main className="flex flex-col-reverse gap-4 p-4">
        {messages &&
          messages.map((msg, index) => <Message key={index} message={msg} />)}
      </main>

      {showProfileModal && (
        <UpdateProfile user={auth.currentUser} close={setShowProfileModal} />
      )}

      <form className="fixed bottom-0 left-0 w-full" onSubmit={sendMessage}>
        <div className="relative">
          <input
            type="text"
            className="block w-full py-4 pl-2 pr-16 text-sm text-gray-900 border border-gray-300 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type message..."
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-0 bottom-0 top-0 bg-gray-900 hover:bg-gray-700 focus:outline-none font-medium text-sm px-4 py-2"
            disabled={!formValue}
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
}
