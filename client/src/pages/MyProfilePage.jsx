import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import * as S from '../style/MyProfilePageStyle/MyProfilePageStyle';

import MyProfile from '../components/ProfileList/MyProfile';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';

function MyProfilePage({
  memberImagePath,
  memberName,
  memberDescription,
  percentage,
  level,
}) {
  const [myProfileLists, setMyProfileLists] = useState([
    {
      memberImagePath: '',
      memberName: '',
      memberDescription: '',
      percentage: '',
      level: '',
    },
  ]);
  const params = useParams();
  const name = params.name;

  // get요청
  const getProfile = async () => {
    try {
      axios
        .get(`/member/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.FlS9lUOnWzAi9UFkZOT2UqT4FYmGiiRsST2wfPJErEiQLYYsJw9jSMwYaEwrM1DceWXltVQ5r8o0_OWjFGJa8w',
          },
        })
        .then((response) => {
          const myProfile = response.data;
          // console.log(myProfile);
          setMyProfileLists(myProfile.data);
        });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <S.MyProfilePageComponent>
      <MyProfile
        memberImagePath={myProfileLists.memberImagePath}
        memberName={myProfileLists.memberName}
        memberDescription={myProfileLists.memberDescription}
        percentage={myProfileLists.percentage}
        level={myProfileLists.level}
      />
      <ProfileBoxLists />
    </S.MyProfilePageComponent>
  );
}

export default MyProfilePage;
//axios.get => async await로 바꿔오기 숙제
