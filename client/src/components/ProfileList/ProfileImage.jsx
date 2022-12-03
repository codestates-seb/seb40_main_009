import { useState, useRef } from 'react';

import { ImageUploadComponent } from '../../style/MyProfilePageStyle/EditProfileStyle';

function ProfileImage({ memberImagePath }) {
  const [Image, setImage] = useState(memberImagePath);
  const fileInput = useRef(null);
  console.log('qqq', Image);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      // setEditImage(e.target.files[0]);
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
    <ImageUploadComponent>
      <img
        className="profilePicture"
        alt="profile img"
        src={Image}
        value={memberImagePath}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        // style={{ display: 'none' }}
        accept="image/avif,image/webp,image/apng,image/svg+xml"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
    </ImageUploadComponent>
  );
}

export default ProfileImage;
