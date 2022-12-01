import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../style/MyProfilePageStyle/EditProfileStyle';
import ProfileImage from '../components/ProfileList/ProfileImage';
function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  //   console.log(editProfileLists);
  const [editProfileLists, setEditProfileLists] = useState(location.state.data);

  const name = editProfileLists.memberName;
  // const name = params.memberName;
  // console.log(location.state.data);

  // const data = location.state.data;
  // console.log('ㅇㅁㅅㅁ', data);
  // 왜 안받아도 있는거지

  // console.log('aaaa', name);
  // console.log(params.name);

  // try catch로 하면 500이 나오는 이유는? Authorization을 못 받는듯!
  const config = {
    method: 'patch',
    url: `/member/${params.name}`, // ${name}을 했을 떄 왜 안되는 걸까ㅜ
    headers: {
      'ngrok-skip-browser-warning': 'none',
      Authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0OUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.NDuVoTw2oLhpffs07n_f0LMCZKUXSjA9R694EQVzHCwAFkzlay3EyWeWYdazmPDRagLOsSOrjjT5SZrjoKGMnw',
    },
    data: editProfileLists,
  };
  const patchEdit = () => {
    axios(config)
      .then((response) => {
        console.log(response);
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
  // console.log(editProfileLists.memberName);

  // 취소 버튼을 누르면 이전 마이페이지로 돌아감
  const clickedCancel = () =>
    navigate(`/profile/${editProfileLists.memberName}`);

  return (
    <S.EditProfileComponent>
      <h1 className="title">프로필 수정</h1>
      <ProfileImage
        profileimage={editProfileLists.profileimage}
        // name="profileimage"
        // // onClick={onChangeEdit}
        // value={editProfileLists.profileimage}
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
