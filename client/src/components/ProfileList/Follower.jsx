import { useState } from 'react';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function Follower({ followStatus, followerCount }) {
  const data = { followStatus, followerCount };
  console.log('data', data);

  //   const [clickedHeart, setClickedHeart] = useState(followStatus);

  const clickedHeart = () => {
    if (followStatus === 'UNFOLLOW') {
    }
  };

  //   // get요청
  //   const getFollowers = async () => {
  //     try {
  //       axios
  //         .get(`/follow/like/${name}`, {
  //           headers: {
  //             'ngrok-skip-browser-warning': 'none',
  //             Authorization:
  //               'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.FlS9lUOnWzAi9UFkZOT2UqT4FYmGiiRsST2wfPJErEiQLYYsJw9jSMwYaEwrM1DceWXltVQ5r8o0_OWjFGJa8w',
  //           },
  //         })
  //         .then((response) => {
  //           const myProfile = response.data;
  //           console.log('my', myProfile);
  //           setMyProfileLists(myProfile.data);
  //         });
  //     } catch (error) {
  //       console.log('error: ', error);
  //     }
  //   };

  return (
    <>
      <div>
        {followStatus === 'UNFOLLOW' && <AiOutlineHeart />}
        {/* {followStatus === '' ? } */}
      </div>
    </>
  );
}
export default Follower;
