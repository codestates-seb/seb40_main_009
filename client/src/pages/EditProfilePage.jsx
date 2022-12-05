import axios from 'axios';
import { useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import {
  EditProfileComponent,
  Edit,
  CancelBtn,
  EditBtn,
  ImageUploadComponent,
} from '../style/MyProfilePageStyle/EditProfileStyle';

function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [editProfileLists, setEditProfileLists] = useState(location.state.data);

  const memberName = editProfileLists.memberName;
  const memberDescription = editProfileLists.memberDescription;
  const memberImagePath = editProfileLists.memberImagePath;

  const textData = {
    memberName: memberName,
    memberDescription: memberDescription,
  };
  console.log('textdata', textData);

  const dataValue = JSON.stringify(textData);
  const stringData = new Blob([dataValue], { type: 'application/json' });
  const EditData = {
    stringData,
    memberImagePath,
  };

  // console.log('xxxx', data);

  // 프로필 이미지

  const [Image, setImage] = useState(memberImagePath);
  const fileInput = useRef(null);

  const onChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      setEditProfileLists({
        ...editProfileLists,
        memberImagePath: event.target.files[0],
      });
    } else {
      //업로드 취소할 시
      setImage(event.target.files[0]);
      return;
    }

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  // Todo async await으로 바꾸기, 리프레쉬 토큰
  const patchEdit = () => {
    console.log(EditData);
    const data = new FormData();
    data.append('image', EditData.memberImagePath);
    data.append('patch', stringData);
    const config = {
      method: 'patch',
      url: `/member/${params.name}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': 'none',
        Authorization: localStorage.getItem('authorizationToken'),
      },
      data,
    };
    axios(config)
      .then((response) => {
        console.log('response', response);
        localStorage.setItem('LoginName', editProfileLists.memberName);
        navigate(`/profile/${editProfileLists.memberName}`); // name을 받아오는 방법
      })

      .catch(function (error) {
        console.log(error);
        alert('닉네임은 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.');
      });
  };

  const onChangeEdit = (event) => {
    setEditProfileLists({
      ...editProfileLists,
      [event.target.name]: event.target.value,
    });
    console.log(editProfileLists);
  };

  // 취소 버튼을 누르면 이전 마이페이지로 돌아감
  const clickedCancel = () =>
    navigate(`/profile/${editProfileLists.memberName}`);

  return (
    <EditProfileComponent>
      <h1 className="title">프로필 수정</h1>
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
          accept="image/*"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
      </ImageUploadComponent>
      <Edit>
        <div>닉네임</div>
        <input
          className="name"
          name="memberName"
          onChange={onChangeEdit}
          value={editProfileLists.memberName}
        />
        <div>자기소개</div>
        <textarea
          placeholder="자기소개를 입력해주세요"
          className="introduction"
          name="memberDescription"
          onChange={onChangeEdit}
          value={editProfileLists.memberDescription}
          style={{ resize: 'none' }}
        />
        <div className="button">
          <CancelBtn onClick={clickedCancel}>취소</CancelBtn>
          <EditBtn onClick={patchEdit}>수정하기</EditBtn>
        </div>
      </Edit>
    </EditProfileComponent>
  );
}

export default EditProfilePage;
