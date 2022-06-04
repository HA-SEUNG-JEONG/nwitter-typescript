import { dbService } from 'fBase';
import React, { SyntheticEvent, useState } from 'react';

const Home: React.FunctionComponent = () => {
  const [tweet, setTweet] = useState('');
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      tweet,
      createdAt: Date.now(),
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
    <form onSubmit={onSubmit}>
      <input value={tweet} onChange={onChange} type="text" placeholder="Whats on you Mind" maxLength={150} />
      <input type="submit" value="Tweet" />
    </form>
  );
};

export default Home;
