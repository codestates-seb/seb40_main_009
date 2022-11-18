import styled from 'styled-components';
import { keyframes } from 'styled-components';

// MyProfilePage.jsx
export const MyProfilePageComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  margin: auto;
  padding-top: 10rem;
`;

// MyProfile.jsx
export const MyProfileComponent = styled.div`
  .profile-info {
    display: flex;
    justify-content: space-between;
  }
  .readonly-box {
    width: 25rem;
    height: 5rem;
  }
  p {
    margin-right: 1rem;
  }
  margin-bottom: 5rem;
`;

export const ProfileList = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const ProfileBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 5rem;
  .buttonLists {
    display: flex;
    justify-content: right;
  }
`;
export const ProfileEditButton = styled.button`
  width: 4rem;
  height: 2.5rem;
  margin-left: 1rem;
  background-color: #eff1fe;
  color: #8673ff;
  border: none;
  cursor: pointer;
`;

// ProfileImage.jsx

export const ImageUploadComponent = styled.div`
  .profilePicture {
    width: 180px;
    height: 180px;
    border-radius: 30px;
  }
  display: flex;
  flex-direction: column;
`;

export const move = keyframes`
	0%{
    	width: 0;
      color: rgba(255, 255, 255, 0);
    }
    70%{
      color: rgba(255, 255, 255, 1);
    }
    100%{
    	width: 72%;
    }
`;

// ChartBar.jsx
export const ChartBarComponent = styled.div`
  .level-bar {
    width: 350px;
  }
  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #eff1fe;
    font-weight: 600;
    font-size: 0.8rem;
  }

  .progress-bar .progress {
    width: 72%; // 나타내고자 하는 퍼센트 값을 넣으면 됩니다.
    height: 20px;
    padding: 0;
    text-align: center;
    background-color: #b0b4f9;
    color: #fff;
    text-align: right;
    line-height: 1.4rem;
    animation: ${move} 3s 1;
  }
`;
