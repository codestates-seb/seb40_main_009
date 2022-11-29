import { useState, useRef } from 'react';
// import ProfilePicture from '../../image/ProfilePicture.png';
import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function ProfileImage({ profileimage }) {
  const [Image, setImage] = useState({ profileimage });
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage();
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
        alt="profile img"
        src={profileimage}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        // style={{ display: 'none' }}
        accept="image/*"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
    </S.ImageUploadComponent>
  );
}

export default ProfileImage;
