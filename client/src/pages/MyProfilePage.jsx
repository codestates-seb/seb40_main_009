import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MyProfilePageComponent } from '../style/MyProfilePageStyle/MyProfilePageStyle';

import MyProfile from '../components/ProfileList/MyProfile';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';

function MyProfilePage() {
  const [myProfileLists, setMyProfileLists] = useState([
    {
      memberDescription: '',
      memberName: '',
      memberBadge: '',
      memberImagePath: '',
      memberChallengePercentage: '',
      memberExpObjRate: '',
      memberMoney: '',
      followStatus: '',
      followerCount: '',
      followers: [
        {
          followId: '',
          followingId: '',
          followerId: '',
          followerName: '',
          followStatus: '',
        },
      ],
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
  console.log('wow', myProfileLists.followers);
  // const followedPeop .

  // get요청
  const getProfile = async () => {
    try {
      axios
        .get(`/member/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
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
    <MyProfilePageComponent>
      <MyProfile
        memberImagePath={myProfileLists.memberImagePath}
        memberName={myProfileLists.memberName}
        memberDescription={myProfileLists.memberDescription}
        memberBadge={myProfileLists.memberBadge}
        memberExpObjRate={myProfileLists.memberExpObjRate}
        followerCount={myProfileLists.followerCount}
        followStatus={myProfileLists.followStatus}
        memberMoney={myProfileLists.memberMoney}
        followers={myProfileLists.follower}
      />
      <ProfileBoxLists
        endChallenges={myProfileLists.endChallenges}
        participatingChallenges={myProfileLists.participatingChallenges}
        memberName={myProfileLists.memberName}
      />
    </MyProfilePageComponent>
  );
}

export default MyProfilePage;
