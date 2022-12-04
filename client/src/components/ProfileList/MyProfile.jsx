import { Link } from 'react-router-dom';

import {
  MyProfileComponent,
  ProfileList,
  ProfileBar,
  ProfileEditButton,
} from '../../style/MyProfilePageStyle/MyProfilePageStyle';

import Follower from './Follower';
import ChartBar from './ChartBar';

function MyProfile({
  memberDescription,
  memberName,
  memberBadge,
  memberImagePath,
  memberChallengePercentage,
  memberExpObjRate,
  followStatus,
  followerCount,
  memberMoney,
}) {
  const profileData = {
    memberImagePath,
    memberName,
    memberDescription,
    memberBadge,
    challengeTitle: '',
    memberSuccessDay: '',
    objectPeriod: '',
    followerCount: '',
  };
  const LoginName = localStorage.getItem('LoginName');

  return (
    <MyProfileComponent>
      <header className="profile-info">
        <img src={memberImagePath} className="image-size" alt="profile-img" />
        <div>
          <ProfileList>
            <p>{memberName}</p>
            <Follower
              followStatus={followStatus}
              followerCount={followerCount}
            />
          </ProfileList>
          <div className="profile-list">
            <p>
              챌린지성공률:
              {memberChallengePercentage}%
            </p>
            <p>
              현재 포인트:
              {memberMoney} 포인트
            </p>
          </div>
          <textarea
            className="readonly-box"
            placeholder={memberDescription}
            readOnly
            style={{ resize: 'none' }}
          />
        </div>
        <ProfileBar>
          {memberName === LoginName ? (
            <div className="buttonLists">
              <Link to={'/ordersheet'}>
                <ProfileEditButton>충전하기</ProfileEditButton>
              </Link>
              <Link
                to={`/profile/edit/${memberName}`}
                state={{
                  // edit로 data를 보냄
                  data: profileData,
                }}
              >
                <ProfileEditButton>edit</ProfileEditButton>
              </Link>
            </div>
          ) : null}
          <ChartBar percentage={memberExpObjRate} memberBadge={memberBadge} />
        </ProfileBar>
      </header>
    </MyProfileComponent>
  );
}

export default MyProfile;
