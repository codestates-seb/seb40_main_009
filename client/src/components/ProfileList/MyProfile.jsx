import ChartBar from './ChartBar';
import ProfileImage from './ProfileImage';
import { GiMedallist } from 'react-icons/gi';
import * as S from '../../style/MyProfilePageStyle/MyProfileStyle';

function MyProfile() {
  return (
    <S.MyProfileComponent>
      <header className="profile-info">
        <ProfileImage />
        <div className="profile-lists">
          <div className="profile-list">
            <p>닉네임</p>
            <p>인기도0 ❤️</p>
          </div>
          <div className="profile-list">
            <p>
              <GiMedallist />
            </p>
            <p>챌린지성공률: 72%</p>
          </div>
          <input
            className="readonly-box"
            placeholder="자기소개를 입력해 주세요."
            readOnly
          />
        </div>
        <div className="profile-bar">
          <button className="profile-edit-button">edit</button>
          <ChartBar />
        </div>
      </header>
    </S.MyProfileComponent>
  );
}

export default MyProfile;
