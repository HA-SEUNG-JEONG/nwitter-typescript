interface Props {
  tweetObj: {
    id: string;
    creatorId: string;
    createdAt: number;
    text: string;
    message: string;
  };
  isOwner: boolean;
}

const Tweet = ({ tweetObj, isOwner }: Props) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner ? (
        <>
          <button>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      ) : (
        <>
          <button disabled>Delete Tweet</button>
          <button disabled>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
