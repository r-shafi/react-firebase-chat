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
      <button
        className="fixed top-2 right-2 z-50"
        onClick={() => setShowProfileModal(true)}
      >
        <svg
          fill="none"
          className="text-gray-900 h-6 w-6"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

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
