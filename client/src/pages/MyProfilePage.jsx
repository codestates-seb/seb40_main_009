import MyProfile from '../components/ProfileList/MyProfile';
import * as S from '../style/MyProfilePageStyle/MyProfilePageStyle';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';

function MyProfilePage() {
  return (
    <S.MyProfilePageComponent>
      <MyProfile />
      <ProfileBoxLists />
    </S.MyProfilePageComponent>
  );
}

export default MyProfilePage;
