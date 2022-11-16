import MyProfile from '../components/ProfileList/MyProfile';
import styled from 'styled-components';

const MyProfilePageComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  margin: auto;
`;

function MyProfilePage() {
  return (
    <MyProfilePageComponent>
      <MyProfile />
    </MyProfilePageComponent>
  );
}

export default MyProfilePage;
