import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';
import ChartBar from './ChartBar';
import { Link, useLocation } from 'react-router-dom';

import { GiMedallist } from 'react-icons/gi';
import Badge from './MyProfileBox/Badge';
import Follower from './Follower';

function MyProfile({
  memberDescription,
  memberName,
  memberBadge,
  memberImagePath,
  memberChallengePercentage,
  memberExpObjRate,
  followStatus,
  followerCount,
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
  const location = useLocation();
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
    <S.MyProfileComponent>
      <header className="profile-info">
        <img
          src={memberImagePath} //요청
          className="image-size"
          alt="profile-img"
        />
        <div>
          <S.ProfileList>
            <p>{memberName}</p>
            {/* Todo */}
            <Follower
              followStatus={followStatus}
              followerCount={followerCount}
            />
          </S.ProfileList>
          <div className="profile-list">
            <div>
              {memberBadge}
              <GiMedallist style={{ color: badgeLevelColor[memberBadge] }} />

              {/* {badgeLevelColor.map(
                <GiMedallist style={{ color: [memberBadge] }} />
              )} */}
              {/* <Badge memberBadge={memberBadge} /> */}
            </div>
            <p>
              챌린지성공률:
              {memberChallengePercentage}%
            </p>
          </div>
          <textarea
            className="readonly-box"
            placeholder={memberDescription}
            readOnly
          />
        </div>
        <S.ProfileBar>
          {memberName === LoginName ? (
            <div className="buttonLists">
              <S.ProfileEditButton>환급받기</S.ProfileEditButton>
              <Link
                to={`/profile/edit/${memberName}`}
                state={{
                  data: profileData,
                }}
              >
                <S.ProfileEditButton>edit</S.ProfileEditButton>
              </Link>
            </div>
          ) : null}

          <ChartBar percentage={memberExpObjRate} />
        </S.ProfileBar>
      </header>
    </S.MyProfileComponent>
  );
}

export default MyProfile;
