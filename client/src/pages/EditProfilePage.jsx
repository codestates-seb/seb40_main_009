import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../style/MyProfilePageStyle/EditProfileStyle';
import ProfileImage from '../components/ProfileList/ProfileImage';
import { text } from '@fortawesome/fontawesome-svg-core';
import { useRecoilValue } from 'recoil';
import { editImage } from '../atoms/Profile';
function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const isEditImage = useRecoilValue(editImage);

  //   console.log(editProfileLists);
  const [editProfileLists, setEditProfileLists] = useState(location.state.data);

  const memberName = editProfileLists.memberName;
  const memberDescription = editProfileLists.memberDescription;
  const memberImagePath = editProfileLists.memberImagePath;
  console.log('aa', memberImagePath);
  const textData = {
    memberName: memberName,
    memberDescription: memberDescription,
  };

  const dataValue = JSON.stringify(textData);
  const stringData = new Blob([dataValue], { type: 'application/json' });

  const data = {
    patch: stringData,
    image: memberImagePath,
  };
  console.log('xxxx', data);

  const config = {
    method: 'patch',
    url: `/member/${params.name}`, // ${name}을 했을 떄 왜 안되는 걸까ㅜ
    headers: {
      'Content-Type': 'multipart/form-data',
      'ngrok-skip-browser-warning': 'none',
      Authorization: localStorage.getItem('authorizationToken'),
    },
    data,
  };
  const patchEdit = () => {
    axios(config)
      .then((response) => {
        console.log(response);
        localStorage.setItem('LoginName', editProfileLists.memberName);
        navigate(`/profile/${editProfileLists.memberName}`); // name을 받아오는 방법
      })

      .catch(function (error) {
        console.log(error);
        alert('닉네임은 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.');
      });
  };

  // const patchEdit = async () => {
  //   try {
  //     axios
  //       .patch(`/member/${params.name}`, {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'none',
  //           // utf-8?
  //           // 'content-type': 'text/html; charset=utf-8',
  //           // 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //           Authorization: localStorage.getItem('authorizationToken'),
  //         },
  //       })
  //       .then((response) => {
  //         const edit = response.data;
  //         console.log('edit', edit);
  //         setEditProfileLists(edit.data);
  //         navigate(`/profile/${editProfileLists.memberName}`); // name을 받아오는 방법
  //       })
  //       .catch(async (error) => {
  //         if (error.response.data.status === 401) {
  //           try {
  //             const responseToken = await axios.get('/token', {
  //               headers: {
  //                 'ngrok-skip-browser-warning': 'none',
  //                 refresh: localStorage.getItem('refreshToken'),
  //               },
  //             });
  //             await localStorage.setItem(
  //               'authorizationToken',
  //               responseToken.headers.authorization
  //             );
  //             // await localStorage.setItem(
  //             //   'test',
  //             //   responseToken.headers.authorization
  //             // );
  //           } catch (error) {
  //             console.log('재요청 실패', error);
  //           }
  //         }
  //       });
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }

  const onChangeEdit = (event) => {
    setEditProfileLists({
      ...editProfileLists,
      [event.target.name]: event.target.value,
    });
    console.log(editProfileLists);
  };
  console.log('1111', editProfileLists);

  // 취소 버튼을 누르면 이전 마이페이지로 돌아감
  const clickedCancel = () =>
    navigate(`/profile/${editProfileLists.memberName}`);

  return (
    <S.EditProfileComponent>
      <h1 className="title">프로필 수정</h1>
      <ProfileImage
        memberImagePath={memberImagePath}
        name="profileimage"
        // onClick={onChangeEdit}
        value={editProfileLists.memberImagePath}
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
          <S.CancelBtn onClick={clickedCancel}>취소</S.CancelBtn>
          <S.EditBtn onClick={patchEdit}>수정하기</S.EditBtn>
        </div>
      </S.Edit>
    </S.EditProfileComponent>
  );
}

export default EditProfilePage;
