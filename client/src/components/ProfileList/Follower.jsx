import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function Follower({ followStatus, followerCount, followers }) {
  const [like, setLike] = useState(false);
  const [followModal, setFollowModal] = useState(false);

  const params = useParams();
  const name = params.name;

  console.log('followers', followers);

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

  const handleClickFollow = () => {
    setFollowModal(true);
  };

  const onClickModalClose = () => {
    setFollowModal(false);
  };

  return (
    <>
      {followModal && (
        <div
          style={{
            width: '200px',
            height: '150px',
            position: 'fixed',
            display: 'flex',
            // justifyContent: 'center',
            overflowY: 'auto',
            backgroundColor: '#eff1fe',
            zIndex: '100',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          <div style={{ width: '200px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ marginRight: 'auto' }}>follower Name</div>
              <button
                onClick={onClickModalClose}
                style={{
                  backgroundColor: '#8673FF',
                  padding: '0.5rem',
                  border: '#8673FF',
                  color: '#ffff',
                  borderRadius: '5px',
                  fontSize: '10px',
                }}
              >
                X
              </button>
            </div>
            {followers.map((name, index) => (
              <div key={index}>
                <div style={{ fontSize: '15px' }}>{name.followerName}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ width: '100px', display: 'flex' }}>
        <div onClick={handleClickFollow}>인기도{followerCount}</div>
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
