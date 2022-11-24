import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from '../style/MyProfilePageStyle/EditProfileStyle';

import ProfileImage from '../components/ProfileList/ProfileImage';

function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [editProfileLists, setEditProfileLists] = useState(location.state.data);
  //   console.log(editProfileLists);
  // const params = useParams();
  const name = editProfileLists.memberName;
  // const name = params.memberName;
  console.log(location.state.data);
  console.log(name);

  // try catch로 하면 500이 나오는 이유는? Authorization을 못 받는듯!
  const config = {
    method: 'patch',
    url: `member/test3`, // ${name}을 했을 떄 왜 안되는 걸까ㅜ
    headers: {
      'ngrok-skip-browser-warning': 'none',
      Authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0M0BrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.A1nWc1oBvYRdhtcfWZDNZjxqSP6S2ZC2q5kguWE8HDlvxCJMgtRVG2p22_NiqMc3ZCLcUWE8N-Bo-uA9Jlga2A',
    },
    data: editProfileLists,
  };

  const patchEdit = () => {
    axios(config)
      .then((response) => {
        console.log(response);
        navigate('/profile/edit/:name'); // name을 받아오는 방법
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // // patch요청
  // const patchEdit = async () => {
  //   try {
  //     console.log('aaaaa', editProfileLists);
  //     axios
  //       .patch(`member/${name}`, {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'none',
  //           Authorization:
  //             'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.FlS9lUOnWzAi9UFkZOT2UqT4FYmGiiRsST2wfPJErEiQLYYsJw9jSMwYaEwrM1DceWXltVQ5r8o0_OWjFGJa8w',
  //         },
  //         data: editProfileLists,
  //       })

  //       .then(() => {
  //         console.log('dkdk');
  //         setEditProfileLists();
  //         navigate('/profile/:name');
  //       });
  //   } catch (error) {
  //     console.log('error: ', error);
  //     console.log('지나갑니다');
  //   }
  // };

  const onChangeEdit = (e) => {
    setEditProfileLists({
      ...editProfileLists,
      [e.target.name]: e.target.value,
    });
    console.log(editProfileLists);
  };
  console.log(editProfileLists.memberName);
  return (
    <S.EditProfileComponent>
      <h1 className="title">프로필 수정</h1>

      <ProfileImage
        profileimage={editProfileLists.profileimage}
        name="profileimage"
        // onClick={onChangeEdit}
        value={editProfileLists.profileimage}
      />
      <S.Edit>
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
        />
        <div className="button">
          <S.CancelBtn>취소</S.CancelBtn>
          <S.EditBtn onClick={patchEdit}>수정하기</S.EditBtn>
        </div>
      </S.Edit>
    </S.EditProfileComponent>
  );
}

export default EditProfilePage;
