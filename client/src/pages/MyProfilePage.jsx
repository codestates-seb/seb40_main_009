import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import * as S from '../style/MyProfilePageStyle/MyProfilePageStyle';

import MyProfile from '../components/ProfileList/MyProfile';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';
// import { useRecoilState } from 'recoil';
// import { LoginState } from '../components/Login/KakaoLoginData';

function MyProfilePage() {
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const [myProfileLists, setMyProfileLists] = useState([
    {
      memberDescription: '',
      memberName: '',
      memberBadge: '',
      memberImagePath: '',
      memberChallengePercentage: '',
      memberExpObjRate: '',
      followStatus: '',
      followerCount: '',
      participatingChallenges: [
        {
          memberChallengeId: '',
          challengeId: '',
          challengeTitle: '',
          memberSuccessDay: '',
          objectPeriod: '',
          memberChallengeSuccessRate: '',
          memberReward: '',
          closed: '',
        },
      ],
      endChallenges: [
        {
          memberChallengeId: '',
          challengeId: '',
          challengeTitle: '',
          memberSuccessDay: '',
          objDay: '',
          memberChallengeSuccessRate: '',
          memberReward: '',
          closed: '',
        },
      ],
    },
  ]);

  const params = useParams();
  const name = params.name;
  console.log('my', myProfileLists);

  // get요청
  const getProfile = async () => {
    try {
      axios
        .get(`/member/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            // Authorization:
            //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.U8NmMuT3VVJGhaBbe33gvm5WnEBHQFRFNwogwzLwYNYfa2BdluAbSRPu81y29LGQaLxi-AHvwmd-6ONPwR_KMA',
            Authorization: localStorage.getItem('authorizationToken'),
          },
        })
        .then((response) => {
          const myProfile = response.data;
          console.log('my', myProfile);
          setMyProfileLists(myProfile.data);
          localStorage.setItem('memberMoney', myProfileLists.memberMoney);
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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <S.MyProfilePageComponent>
      <MyProfile
        memberImagePath={myProfileLists.memberImagePath}
        memberName={myProfileLists.memberName}
        memberDescription={myProfileLists.memberDescription}
        memberBadge={myProfileLists.memberBadge}
        memberExpObjRate={myProfileLists.memberExpObjRate}
        followerCount={myProfileLists.followerCount}
        followStatus={myProfileLists.followStatus}
        memberMoney={myProfileLists.memberMoney}
      />
      <ProfileBoxLists
        endChallenges={myProfileLists.endChallenges}
        participatingChallenges={myProfileLists.participatingChallenges}
        memberName={myProfileLists.memberName}
      />
    </S.MyProfilePageComponent>
  );
}

export default MyProfilePage;
//axios.get => async await로 바꿔오기 숙제
