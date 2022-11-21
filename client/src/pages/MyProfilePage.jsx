import { useState, useEffect } from 'react';
import MyProfile from '../components/ProfileList/MyProfile';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';
import axios from 'axios';
import * as S from '../style/MyProfilePageStyle/MyProfilePageStyle';

function MyProfilePage(props) {
  const [myProfile, setMyProfile] = useState({
    profileimage: '',
    name: '',
    introduction: '',
    percentage: '',
    level: '',
  });

  // get요청
  useEffect(() => {
    axios.get(`http://localhost:3001/userprofile`).then((res) => {
      console.log(res.data);
      setMyProfile(...res.data);
    });
  }, []);

  return (
    <S.MyProfilePageComponent>
      <MyProfile
        profileimage={myProfile.profileimage}
        name={myProfile.name}
        introduction={myProfile.introduction}
        percentage={myProfile.percentage}
        level={myProfile.level}
      />
      <ProfileBoxLists />
    </S.MyProfilePageComponent>
  );
}

export default MyProfilePage;
