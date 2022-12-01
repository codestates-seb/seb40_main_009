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
    // memberBadge,
  };
  const location = useLocation();
  const LoginName = localStorage.getItem('LoginName');

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
              {/* {{ memberBadge } === '새내기' ? (
                <GiMedallist style={{ color: 'red' }} />
              ) : null}
              {{ memberBadge } === '좀치는도전자' ? (
                <GiMedallist style={{ color: 'orange' }} />
              ) : null}
              {{ memberBadge } === '열정도전자' ? (
                <GiMedallist style={{ color: 'yellow' }} />
              ) : null}
              {{ memberBadge } === '모범도전자' ? (
                <GiMedallist style={{ color: 'green' }} />
              ) : null}
              {{ memberBadge } === '우수도전자' ? (
                <GiMedallist style={{ color: 'blue' }} />
              ) : null}
              {{ memberBadge } === '챌린지장인' ? (
                <GiMedallist style={{ color: 'navy' }} />
              ) : null}
              {{ memberBadge } === '시간의지배자' ? (
                <GiMedallist style={{ color: 'violet' }} />
              ) : null}
              {{ memberBadge } === '챌린지신' ? (
                <GiMedallist style={{ color: 'purple' }} />
              ) : null} */}

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
