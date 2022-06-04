import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Tweet from 'components/Tweet';

interface SnapShotData {
  id: string;
  creatorId: string;
  message: string;
  createdAt: number;
  text: string;
}

interface HomeProps {
  userObj: {
    email: string;
    uid: string;
  };
}

const Home = ({ userObj }: HomeProps) => {
  const [tweets, setTweet] = useState('');
  const [tweetArray, setTweetArray] = useState<SnapShotData[]>([]);

  useEffect(() => {
    // dbService.collection('tweets').onSnapshot((snapshot) => {
    //   const nweets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   setTweetArray(nweets);
    // });
    const queryCollection = query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc'));
    onSnapshot(queryCollection, (snapshot) => {
      const queryArray = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweetArray(queryArray);
    });
  }, []);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      text: tweets,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet('');
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={tweets} onChange={onChange} type="text" placeholder="Whats on you Mind" maxLength={150} />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweetArray.map((tw) => (
          <Tweet key={tw.id} tweetObj={tw} isOwner={tw.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};

export default Home;
