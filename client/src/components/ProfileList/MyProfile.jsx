import styled from 'styled-components';
import ChartBar from './ChartBar';
import { GiMedallist } from 'react-icons/gi';

const MyProfileComponent = styled.div`
  .profile-info {
    display: flex;
    justify-content: space-between;
  }
  .profile-image {
    width: 180px;
    height: 180px;
    border-radius: 30px;
  }

  .profile-list {
    display: flex;
    margin: 1rem 0;
  }
  .readonly-box {
    width: 25rem;
    height: 5rem;
  }
  .profile-bar {
    margin: 1rem;
  }
  .profile-edit-button {
    width: 2.5rem;
    height: 1.5rem;
    margin: 0 89%;
    background-color: #eff1fe;
    color: #8673ff;
    border: none;
    cursor: pointer;
  }
  p {
    margin-right: 1rem;
  }
`;
function MyProfile() {
  return (
    <MyProfileComponent>
      <header className="profile-info">
        <img
          className="profile-image"
          src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize"
          alt="profile img"
        />
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
    </MyProfileComponent>
  );
}

export default MyProfile;
