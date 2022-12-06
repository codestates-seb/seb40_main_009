import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createChallangeRepresentationImage,
  createChallengeStateNumber,
} from '../../atoms/atoms';
import { checkImageSize } from '../../function/checkImageSize';

import * as S from '../../style/CreateChallenge/Challenge.styled';

import exampleImg from '../../image/example.png';

export default function SecondQuestionSet({ register, watch }) {
  const setStatePageNumber = useSetRecoilState(createChallengeStateNumber);
  const [imageTransform, setImageTransfrom] = useRecoilState(
    createChallangeRepresentationImage
  );

  /**이미지 미리보기 세팅 */
  const setImagePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageTransfrom(reader.result);
        resolve();
      };
    });
  };

  const answerCheck = (event) => {
    const allValidateList = [
      'challengeRepImagePath',
      'challengeTitle',
      'challengeDescription',
    ];

    const validateList = allValidateList.filter(
      (element) => element !== event.target.name
    );

    event.target.value && watch(validateList[0]) && watch(validateList[1])
      ? setStatePageNumber(3)
      : setStatePageNumber(2);
  };

  useEffect(() => {
    setImageTransfrom(exampleImg);
  }, []);

  return (
    <S.CreateAsk>
      <section className="imgSection">
        <S.ImgExample src={imageTransform} alt="preview.img" />
      </section>
      <div className="question">
        <h3>대표 이미지를 설정해주세요</h3>
        <input
          type={'file'}
          {...register('challengeRepImagePath', {
            required: 'Please Upload Picture',
          })}
          onChange={(event) => {
            if (checkImageSize(event.target.files)) {
              setImagePreview(event.target.files[0]);
              answerCheck(event);
            }
          }}
        />
      </div>
      <div className="question">
        <h3>챌린지 제목을 입력해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeTitle', { required: 'Please Write Title' })}
          onChange={(event) => answerCheck(event)}
          placeholder="ex) 미라클 모닝 챌린지"
        />
      </div>
      <div className="question">
        <h3>챌린지 내용을 입력해주세요</h3>
        <textarea
          {...register('challengeDescription', {
            required: 'Please Write Content',
          })}
          onChange={(event) => answerCheck(event)}
          placeholder="ex) 매일 아침 지정된 시간에 인증합니다."
        />
      </div>
    </S.CreateAsk>
  );
}
