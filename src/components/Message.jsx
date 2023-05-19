import { auth } from '../firebase/firebase';

export function Message(props) {
  const { text, uid, photoURL, name, createdAt } = props.message;

  const sent = uid === auth.currentUser.uid;

  return (
    <div
      className={`w-full max-w-xs p-4 text-gray-500 ${
        sent ? 'bg-red-200 self-end' : 'bg-green-200'
      } rounded-lg shadow`}
    >
      <div className="flex">
        <img
          className="w-8 h-8 rounded-full shadow-lg"
          src={photoURL}
          alt={name}
        />
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 flex flex-col">
            {name}
            <span className="text-xs font-light text-gray-500">
              {createdAt?.toDate().toLocaleTimeString()}
              {' -- '}
              {createdAt?.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </span>
          <p className="mb-2 text-sm font-normal text-gray-900">{text}</p>
        </div>
      </div>
    </div>
  );
}
