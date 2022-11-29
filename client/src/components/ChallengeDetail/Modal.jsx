import axios from 'axios';
import { useState } from 'react';

import {
  Container,
  Close,
} from '../../style/ChallengeDetailProgress/ModalStyle';

export default function Modal({ setModalOpen, challengeId }) {
  const [imageTransform, setImageTransfrom] = useState('');
  const [image, setImage] = useState();
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const imageUpload = (file) => {
    // console.log('file>>>', file);
    //이미지 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageTransfrom(reader.result);
        resolve();
      };
    });
  };

  const uploadImage = async () => {
    const data = new FormData(); // 폼 데이터 생성
    //이미지 선택시 이미지값 넣기
    data.append('cert', image); //이미지 추가
    alert('ggg', image);
    try {
      await axios
        .patch(`/challenges/cert/${challengeId}`, data, {
          headers: {
            'content-type': 'multipart/form-data',
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NkBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.i4rAIdLBMReygLX0hfFZzySqQAnnc5fG-j6AhBQhW5KW-qaHk9PPuuzCrhC3rR0xamUVlHeR0-QgLElR1WLjMQ',
          },
        })
        .then(alert(image));
    } catch (error) {
      console.error('error', error);
    }
  };

  console.log('나야나', image);

  return (
    <Container>
      <Close onClick={closeModal}>X</Close>
      <div style={{ margin: '5%' }}>
        {imageTransform !== '' ? (
          <img
            src={imageTransform}
            alt="업로드한 이미지 미리보기"
            style={{ width: '400px', height: '400px', marginBottom: '2%' }}
          />
        ) : null}

        <h3 style={{ marginBottom: '2%' }}>인증사진을 선택해주세요</h3>
        <form onSubmit={uploadImage}>
          <input
            type={'file'}
            onChange={(e) => {
              imageUpload(e.target.files[0]);
              setImage(e.target.files[0]);
            }}
          />

          <button type="submit">인증사진 올리기</button>
        </form>
      </div>
    </Container>
  );
}
