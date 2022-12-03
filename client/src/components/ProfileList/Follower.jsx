import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function Follower({ followStatus, followerCount }) {
  const [like, setLike] = useState(false);

  const params = useParams();
  const name = params.name;

  useEffect(() => {
    if (followStatus === 'FOLLOW') {
      setLike(true);
    }
  });

  const handleClick = async () => {
    setLike(!like);

    try {
      await axios.post(
        `/follow/like/${name}`,
        {
          data: '',
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: localStorage.getItem('authorizationToken'),
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        인기도{followerCount}
        <span onClick={handleClick}>
          {like === false && <AiOutlineHeart />}
          {like === true && <AiFillHeart style={{ color: 'red' }} />}
        </span>
        {like}
      </div>
    </>
  );
}
export default Follower;
