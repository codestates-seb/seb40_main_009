import { useState, useRef } from 'react';
import ProfilePicture from '../../image/ProfilePicture.png';
import * as S from '../../style/MyProfilePageStyle/ProfileImageStyle';

function ProfileImage() {
  const [Image, setImage] = useState(ProfilePicture);
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(ProfilePicture);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <S.ImageUploadComponent>
      <img
        className="profilePicture"
        alt="ProfilePicture"
        src={Image}
        onClick={() => {
          fileInput.current.click();
        }}
      ></img>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
    </S.ImageUploadComponent>
  );
}

export default ProfileImage;
