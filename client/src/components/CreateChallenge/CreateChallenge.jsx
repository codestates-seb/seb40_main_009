import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import styled from 'styled-components';

import {
  createChallengePageNumber,
  createChallengeStateNumber,
} from '../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import FirstQuestionSet from './FirstQuestionSet';
import SecondQuestionSet from './SecondQuestionSet';
import ThirdQuestionSet from './ThirdQuestionSet';
import FourthQuestionSet from './FourthQuestionSet';

const CreateContainer = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default function CreateChallenge() {
  const [pageNumber, setPageNumber] = useRecoilState(createChallengePageNumber);
  const [pageStateNumber, setPageStateNumber] = useRecoilState(
    createChallengeStateNumber
  );

  const navigate = useNavigate();

  /**신규 챌린지 생성 데이터 전송 */
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState,
    setError,
    clearErrors,
  } = useForm();
  const { errors } = formState;

  /**유효성 검사 & 데이터 전송 */
  const onValid = async (setData) => {
    const dataBox = setData; // 전체 데이터
    const representImage = setData.challengeRepImagePath[0]; // 챌린지 대표 이미지
    const exampleImage = setData.challengeExamImagePath; // 챌린지 인증 이미지

    const data = new FormData(); // 폼 데이터 생성
    data.append('rep', representImage); // 대표 이미지 추가

    // 인증 이미지 추가
    for (let i = 0; i < exampleImage.length; i++) {
      data.append('example', exampleImage[i]);
    }
    delete dataBox.challengeRepImagePath; // 이미지 데이터 삭제
    delete dataBox.challengeExamImagePath;
    delete dataBox.lastCheck;

    const dataValue = JSON.stringify(dataBox); // 텍스트 형식 JSON 변환

    const stringData = new Blob([dataValue], { type: 'application/json' }); // 텍스트 데이터 Blob에 추가
    data.append('post', stringData); // post 데이터 추가

    try {
      const response = await axios.post('/challenges', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // 전송 타입 설정
          'ngrok-skip-browser-warning': 'none',
          Authorization: localStorage.getItem('authorizationToken'),
        },
      });
      const minusMoney = response.data.data.challengeFeePerPerson;
      localStorage.setItem(
        'memberMoney',
        Number(localStorage.getItem('memberMoney')) - minusMoney
      );
      await setPageStateNumber(1);
      await setPageNumber(1);
      await navigate('/challengelist/bucketlist');
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const challengeComponents = [
    <FirstQuestionSet
      register={register}
      watch={watch}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
    />,
    <SecondQuestionSet register={register} watch={watch} errors={errors} />,
    <ThirdQuestionSet
      register={register}
      watch={watch}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
    />,
    <FourthQuestionSet
      register={register}
      watch={watch}
      getValues={getValues}
      errors={errors}
    />,
  ];

  return (
    <CreateContainer>
      <form onSubmit={handleSubmit(onValid)}>
        {challengeComponents[pageNumber - 1]}
        {pageStateNumber === 6 ? <button>submit</button> : null}
      </form>
    </CreateContainer>
  );
}
