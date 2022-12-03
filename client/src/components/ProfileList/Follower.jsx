import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function Follower({ followStatus = 'UNFOLLOW', followerCount = 0 }) {
  const [follow, setFollow] = useState({ followStatus, followerCount });

  const params = useParams();
  const name = params.name;
  console.log('dkdk', follow);

  const handleClick = (event) => {
    // event.preventDefault();
    if (follow.followStatus === 'UNFOLLOW') {
      // 서버 요청 필요
      setFollow((follow) => ({
        followStatus: 'FOLLOW',
        followerCount: follow.followerCount + 1, // NaN
      }));
    } else {
      // 서버 요청 필요
      setFollow((follow) => ({
        followStatus: 'UNFOLLOW',
        followerCount: follow.followerCount - 1,
      }));
    }
  };

  //post요청
  const postFollow = async () => {
    try {
      axios
        .post(`follow/like/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: localStorage.getItem('authorizationToken'),
          },
          data: follow,
        })
        .then((response) => {
          const follower = response.data;
          console.log('my', follower);
          setFollow(follow.data);
        })
        .catch(async (error) => {
          if (error.response.data.status === 401) {
            try {
              const responseToken = await axios.get('/token', {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  refresh: localStorage.getItem('refreshToken'),
                },
              });
              await localStorage.setItem(
                'authorizationToken',
                responseToken.headers.authorization
              );
            } catch (error) {
              console.log('재요청 실패', error);
            }
          }
        });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <div>
        인기도{follow.followerCount}
        <span
          onClick={() => {
            handleClick();
            postFollow();
          }}
        >
          {follow.followStatus === 'UNFOLLOW' && <AiOutlineHeart />}
          {follow.followStatus === 'FOLLOW' && (
            <AiFillHeart style={{ color: 'red' }} />
          )}
        </span>
      </div>
    </>
  );
}
export default Follower;
