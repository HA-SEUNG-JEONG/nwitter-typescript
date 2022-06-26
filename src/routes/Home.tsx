import { dbService, storageService } from '../fBase';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Tweet from '../components/Tweet';
import { User } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
interface SnapShotData {
  id: string;
  creatorId: string;
  message: string;
  createdAt: number;
  text: string;
}

export interface HomeProps {
  userObj: User;
}

const Home = ({ userObj }: HomeProps) => {
  const [tweets, setTweet] = useState('');
  const [tweetArray, setTweetArray] = useState<SnapShotData[]>([]);
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    const queryCollection = query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc'));
    onSnapshot(queryCollection, (snapshot) => {
      // eslint-disable-next-line
      const queryArray = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweetArray(queryArray);
    });
  }, []);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const uploadTaskSnapshot = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await uploadTaskSnapshot.ref.getDownloadURL();
    }
    const tweet = {
      text: tweets,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('tweets').add(tweet);
    setTweet('');
    setAttachment('');
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');
  //preview 이미지 없애기

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={tweets} onChange={onChange} type="text" placeholder="Whats on you Mind" maxLength={150} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
      </form>
      {attachment ? <img src={attachment} alt={attachment} width="40px" height="40px" /> : null}
      <button onClick={onClearAttachment}>Clear</button>
      <div>
        {tweetArray.map((tw) => (
          <Tweet key={tw.id} tweetObj={tw} isOwner={tw.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};

export default Home;
