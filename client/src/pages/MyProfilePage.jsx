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
      memberName: '', // 사용할 모든 데이터? usestate안에 채워야 하는지? 다 쓰지 않아도 데이터를 불러 오는데 문제 없음
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

  // get요청
  const getProfile = async () => {
    try {
      console.log('aa', name);

      axios
        .get(`/member/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            // utf-8?
            // 'content-type': 'text/html; charset=utf-8',
            // 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: localStorage.getItem('authorizationToken'),
          },
        })
        .then((response) => {
          const myProfile = response.data;
          console.log('my', myProfile);
          setMyProfileLists(myProfile.data);
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
              await localStorage.setItem(
                'test',
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
