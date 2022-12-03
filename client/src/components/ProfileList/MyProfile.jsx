import { Link } from 'react-router-dom';

import {
  MyProfileComponent,
  ProfileList,
  ProfileBar,
  ProfileEditButton,
} from '../../style/MyProfilePageStyle/MyProfilePageStyle';
import { GiMedallist } from 'react-icons/gi';

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
  const badgeLevelColor = {
    새내기: '#EEF1FF',
    좀치는도전자: '#D2DAFF',
    열정도전자: '#AAC4FF',
    모범도전자: '#B1B2FF',
    우수도전자: '#9C9EFE',
    챌린지장인: '#A294FF',
    시간의지배자: '#A66CFF',
    챌린지신: '#8673ff',
  };

  return (
    <MyProfileComponent>
      <header className="profile-info">
        <img src={memberImagePath} className="image-size" alt="profile-img" />
        <div>
          <ProfileList>
            <p>{memberName}</p>
            {/* Todo 좋아요 기능 구현*/}
            <Follower
              followStatus={followStatus}
              followerCount={followerCount}
            />
          </ProfileList>
          <div className="profile-list">
            <div>
              {memberBadge}
              {/* Todo 색 다른걸로 바꾸기 */}
              <GiMedallist style={{ color: badgeLevelColor[memberBadge] }} />
            </div>
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
          />
        </div>
        <ProfileBar>
          {memberName === LoginName ? (
            <div className="buttonLists">
              <ProfileEditButton>환급받기</ProfileEditButton>
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
          <ChartBar percentage={memberExpObjRate} />
        </ProfileBar>
      </header>
    </MyProfileComponent>
  );
}

export default MyProfile;
