import { dbService } from 'fBase';
import React, { useState } from 'react';

interface Props {
  tweetObj: {
    id: string;
    creatorId: string;
    createdAt: number;
    text: string;
    attachmentUrl?: string;
  };
  isOwner: boolean;
}

const Tweet = ({ tweetObj, isOwner }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = () => {
    const ok = confirm('Are you sure want to delete Tweet?');
    if (ok) {
      //delete Tweet
      dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEdit(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div>
      {edit ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" value={newTweet} placeholder="Edit your Tweet" required />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEdit}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} alt={tweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
