import axios from 'axios';
import { useState, useEffect } from 'react';
import ProfileImage from '../components/ProfileList/ProfileImage';
import * as S from '../style/MyProfilePageStyle/EditProfileStyle';

function EditProfilePage() {
  const [myProfile, setMyProfile] = useState({
    profileimage: '',
    name: '',
    introduction: '',
  });

  const onChangeEdit = (e) => {
    setMyProfile({
      ...myProfile,
      [e.target.name]: e.target.value,
    });
    console.log(myProfile);
  };

  // get요청
  useEffect(() => {
    axios.get(`http://localhost:3001/userprofile`).then((res) => {
      console.log(res.data);
      setMyProfile(...res.data);
    });
  }, []);
  return (
    <S.EditProfileComponent>
      <h1 className="title">프로필 수정</h1>

      <ProfileImage
        profileimage={myProfile.profileimage}
        name="profileimage"
        onClick={onChangeEdit}
        value={myProfile.profileimage}
      />
      <S.Edit>
        <div>닉네임</div>
        <input
          className="name"
          name="name"
          onChange={onChangeEdit}
          value={myProfile.name}
        />
        <div>자기소개</div>
        <textarea
          placeholder="자기소개를 입력해주세요"
          className="introduction"
          name="introduction"
          onChange={onChangeEdit}
          value={myProfile.introduction}
        />
        <div className="button">
          <S.CancelBtn>취소</S.CancelBtn>
          <S.EditBtn>수정하기</S.EditBtn>
        </div>
      </S.Edit>
    </S.EditProfileComponent>
  );
}

export default EditProfilePage;
