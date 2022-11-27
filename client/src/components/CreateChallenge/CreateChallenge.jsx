import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import {
  createChallengePageNumber,
  createChallengeStateNumber,
} from '../../atoms/atoms';
import ChallengeAsk1 from './CreateAsk1';
import ChallengeAsk2 from './CreateAsk2';
import ChallengeAsk3 from './CreateAsk3';
import ChallengeAsk4 from './CreateAsk4';
import { useNavigate } from 'react-router-dom';

const CreateContainer = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default function CreateChallenge() {
  const pageNumber = useRecoilValue(createChallengePageNumber);
  const pageStateNumber = useRecoilValue(createChallengeStateNumber);
  const navigate = useNavigate();

  /**신규 챌린지 생성 데이터 전송 */
  const { register, handleSubmit, watch, getValues } = useForm();

  /**유효성 검사 & 데이터 전송 */
  const onValid = async (setData) => {
    const dataBox = setData; // 전체 데이터
    const rep = setData.challengeRepImagePath[0]; // 챌린지 대표 이미지
    const example = setData.challengeExamImagePath; // 챌린지 인증 이미지

    const data = new FormData(); // 폼 데이터 생성
    data.append('rep', rep); // 대표 이미지 추가

    // 인증 이미지 추가
    for (let i = 0; i < example.length; i++) {
      data.append('example', example[i]);
    }
    delete dataBox.challengeRepImagePath; // 이미지 데이터 삭제
    delete dataBox.challengeExamImagePath;
    delete dataBox.lastCheck;

    const dataValue = JSON.stringify(dataBox); // 텍스트 형식 JSON 변환

    const blob = new Blob([dataValue], { type: 'application/json' }); // 텍스트 데이터 Blob에 추가
    data.append('post', blob); // post 데이터 추가

    try {
      await axios.post('/challenges', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // 전송 타입 설정
          'ngrok-skip-browser-warning': 'none',
          Authorization:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NkBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.i4rAIdLBMReygLX0hfFZzySqQAnnc5fG-j6AhBQhW5KW-qaHk9PPuuzCrhC3rR0xamUVlHeR0-QgLElR1WLjMQ',
        },
      });
      await navigate(-1);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <CreateContainer>
      <form onSubmit={handleSubmit(onValid)}>
        {pageNumber === 1 ? (
          <ChallengeAsk1 register={register} watch={watch} />
        ) : null}
        {pageNumber === 2 ? (
          <ChallengeAsk2 register={register} watch={watch} />
        ) : null}
        {pageNumber === 3 ? <ChallengeAsk3 register={register} /> : null}
        {pageNumber === 4 ? (
          <>
            <ChallengeAsk4
              register={register}
              watch={watch}
              getValues={getValues}
            />
          </>
        ) : null}
        {pageStateNumber === 6 ? <button>submit</button> : null}
      </form>
    </CreateContainer>
  );
}
