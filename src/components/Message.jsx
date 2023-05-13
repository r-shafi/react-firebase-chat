import { auth } from '../firebase/firebase';

export function Message(props) {
  const { text, uid, photoURL, name } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="" />
        <p className="text messageBubble">
          <b className="nameTag">{`${name} Says:`}</b>
          <br /> {text}
        </p>
      </div>
    </div>
  );
}
