import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import FollowersDetail from './FollowersDetail';

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
  followers = [],
}) {
  //edit페이지로 가져갈 데이터
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

  const navigate = useNavigate();
  const LoginName = localStorage.getItem('LoginName');
  const name = memberName;

  const handleClickRefund = () => {
    Swal.fire(
      '여러분의 포인트는 데모데이가 끝나고</br>운영진이 맛있게 먹었습니다!'
    );
  };

  return (
    <MyProfileComponent>
      <header className="profile-info">
        <img src={memberImagePath} className="image-size" alt="profile-img" />
        <div>
          <ProfileList>
            <div>{memberName}</div>
            <Follower
              followStatus={followStatus}
              followerCount={followerCount}
              followers={followers}
            />
          </ProfileList>
          <div className="profile-list">
            <p>
              챌린지성공률:
              {Math.floor(memberChallengePercentage)}%
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
              <ProfileEditButton onClick={handleClickRefund}>
                환급받기
              </ProfileEditButton>
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
