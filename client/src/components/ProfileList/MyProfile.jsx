import ChartBar from './ChartBar';
// import ProfileImage from './ProfileImage';
import { GiMedallist } from 'react-icons/gi';
import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function MyProfile(props) {
  return (
    <S.MyProfileComponent>
      <header className="profile-info">
        <img
          src={props.profileimage} //요청
          className="image-size"
          alt="profile-img"
        />
        <div>
          <S.ProfileList>
            <p>{props.name}</p>
            <p>인기도0 ❤️</p>
          </S.ProfileList>
          <div className="profile-list">
            <p>
              <GiMedallist />
            </p>
            <p>챌린지성공률: {props.percentage}%</p>
          </div>
          <textarea
            className="readonly-box"
            placeholder={props.introduction}
            readOnly
          />
        </div>
        <S.ProfileBar>
          <div className="buttonLists">
            <S.ProfileEditButton>환급받기</S.ProfileEditButton>
            <S.ProfileEditButton>edit</S.ProfileEditButton>
          </div>
          <ChartBar percentage={props.percentage} />
        </S.ProfileBar>
      </header>
    </S.MyProfileComponent>
  );
}

export default MyProfile;
