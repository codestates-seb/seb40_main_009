import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';
import ChartBar from './ChartBar';

import { Link, useLocation } from 'react-router-dom';

import { GiMedallist } from 'react-icons/gi';

function MyProfile({
  memberImagePath,
  memberName,
  memberDescription,
  percentage,
  level,
}) {
  const location = useLocation();
  const data = location.statep;
  console.log('aaaa', data);
  const profileData = { memberImagePath, memberName, memberDescription };
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
            <p>인기도0 ❤️</p>
          </S.ProfileList>
          <div className="profile-list">
            <p>
              <GiMedallist />
            </p>
            <p>챌린지성공률: {percentage}%</p>
          </div>
          <textarea
            className="readonly-box"
            placeholder={memberDescription}
            readOnly
          />
        </div>
        <S.ProfileBar>
          <div className="buttonLists">
            <S.ProfileEditButton>환급받기</S.ProfileEditButton>
            <Link
              to="/profile/edit"
              state={{
                data: profileData,
              }}
            >
              <S.ProfileEditButton>edit</S.ProfileEditButton>
            </Link>
          </div>
          <ChartBar percentage={percentage} />
        </S.ProfileBar>
      </header>
    </S.MyProfileComponent>
  );
}

export default MyProfile;
