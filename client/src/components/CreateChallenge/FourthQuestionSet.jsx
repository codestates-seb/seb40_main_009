import { useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';
import * as S from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';
import exampleImage from '../../image/example.png';
import { checkImageSize } from '../../function/checkImageSize';
import { useEffect } from 'react';

const TimeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export default function FourthQuestionSet({ register, watch, errors }) {
  const [pageStateNumber, setStatePageNumber] = useRecoilState(
    createChallengeStateNumber
  );
  const [imageTransform, setImageTransfrom] = useState(exampleImage);
  const [threeMoreAuthCycle, setThreeMoreAuthCycle] = useState(false);

  /**이미지 미리보기 */
  const imagePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageTransfrom(reader.result);
        resolve();
      };
    });
  };

  /**인증 시간 3번 선택시 주관식으로 전환 */
  const checkAuthCycle = (event) => {
    if (event.target.value === '3') {
      setThreeMoreAuthCycle(true);
    }
  };

  /**모든 값 입력시 제출 버튼 활성화 */
  const answerCheck = (event) => {
    const allValidateList = [
      'challengeExamImagePath',
      'challengeAuthDescription',
      'challengeAuthCycle',
      'challengeAuthAvailableTime',
    ];

    const validateList = allValidateList.filter(
      (element) => element !== event.target.name
    );

    event.target.value &&
    watch(validateList[0]) &&
    watch(validateList[1]) &&
    watch(validateList[2])
      ? setStatePageNumber(5)
      : setStatePageNumber(4);
  };

  //throw
  const lastCheck = () => {
    if (
      Number(watch('challengeAuthCycle')) ===
      Number(watch('challengeAuthAvailableTime').length)
    ) {
      setStatePageNumber(6);
    } else {
      console.error('인증 빈도와 인증 시간의 갯수가 다릅니다');
      alert('인증 빈도와 시간이 다릅니다');
      setStatePageNumber(5);
    }

    if (Number(watch('challengeExamImagePath').length) > 3) {
      console.error('인증 사진은 최대 3개까지 설정 가능합니다');
      alert('인증 사진은 최대 3장까지 설정 가능합니다.');
      setStatePageNumber(5);
    }
  };

  useEffect(() => {
    setImageTransfrom(exampleImage);
  }, []);

  return (
    <S.CreateAsk>
      <section className="imgSection">
        {imageTransform && (
          <S.ImgExample src={imageTransform} alt="preview.img" />
        )}
      </section>
      <div className="question">
        <h3>인증방법</h3>
        <span>최대 3장까지 설정 가능합니다.</span>
        <input
          type={'file'}
          accept="image/*"
          {...register('challengeExamImagePath', {
            required: 'Please Upload Image',
          })}
          onChange={(event) => {
            if (checkImageSize(event.target.files)) {
              imagePreview(event.target.files[0]);
              answerCheck(event);
            }
          }}
          multiple
        />
      </div>

      <div className="question">
        <h3>인증 방법을 설명해주세요</h3>
        <input
          {...register('challengeAuthDescription', {
            required: 'Please Write validExplain',
            minLength: {
              value: 2,
              message: 'Please Enter 2 characters',
            },
          })}
          placeholder="인증 방법 설명하기"
          onChange={(event) => answerCheck(event)}
        />
        {errors.challengeAuthDescription?.type === 'minLength' &&
          errors.challengeAuthDescription.message}
      </div>

      <div className="question">
        <h3>인증 빈도</h3>
        {!threeMoreAuthCycle ? (
          <>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice challengeAuthCycle',
                })}
                onClick={checkAuthCycle}
                value={'1'}
                onChange={(event) => answerCheck(event)}
              />
              하루 한번
            </label>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice challengeAuthCycle',
                })}
                onClick={checkAuthCycle}
                value={'2'}
                onChange={(event) => answerCheck(event)}
              ></input>
              하루 두번
            </label>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice challengeAuthCycle',
                })}
                onClick={checkAuthCycle}
                value={'3'}
                onChange={(event) => answerCheck(event)}
              ></input>
              세번 이상
            </label>
          </>
        ) : null}

        {threeMoreAuthCycle ? (
          <>
            <span>원하는 횟수를 입력하세요</span>
            <input
              type={'number'}
              {...register('challengeAuthCycle', {
                required: 'Please Choice challengeAuthCycle',
                validate: (value) => value < 25,
              })}
              placeholder="그럼 몇번?"
              onChange={(event) => answerCheck(event)}
            />
          </>
        ) : null}
      </div>

      <div className="question">
        <h3>인증 시간</h3>
        <span>선택한 시간부터 최대 10분간 인증이 가능합니다.</span>
        <TimeContainer>
          {timeTable.map((el) => (
            <label key={el}>
              <input
                type={'checkbox'}
                {...register('challengeAuthAvailableTime', {
                  required: 'Please Choice Validate Time',
                })}
                value={el}
                onChange={(event) => answerCheck(event)}
              />
              {el}
            </label>
          ))}
        </TimeContainer>
      </div>

      {pageStateNumber === 5 ? (
        <input
          type={'button'}
          {...register('lastCheck')}
          value={'모든 내용을 입력하셨습니까?'}
          className="checkInputButton"
          onClick={() => lastCheck()}
        />
      ) : null}
    </S.CreateAsk>
  );
}

const timeTable = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
