import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

// 1. 하트를 누르면 하트는 채워지고 숫자는 1 올라간다 => followStatus = 'UNFOLLOW'
// 2. 하트를 다시 누르면 빈하트가 나오고 숫자는 다시 내려간다 => followStatus = 'FOLLOW'

function Follower({ followStatus, followerCount }) {
  console.log('팔로우 상태 확인 중', followStatus);

  return (
    <>
      <div>
        인기도
        {/* {followStatus === 'SELF' && null}
        {followStatus === 'UNFOLLOW' && <AiOutlineHeart />}
        {followStatus === 'FOLLOW' && <AiFillHeart style={{ color: 'red' }} />} */}
      </div>
    </>
  );
}
export default Follower;
