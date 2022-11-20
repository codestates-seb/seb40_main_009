import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { createChallenge, validBtn } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';

function ChallengeAsk2() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [checkBtn, setCheckBtn] = useRecoilState(validBtn);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...data, ...create });
    setCheckBtn(true);
  };

  useEffect(() => {
    setCheckBtn(false);
  }, []);
  return (
    <S.CreateAsk>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="question">
          <h3>챌린지 제목을 입력해주세요</h3>
          <input
            className="inputBox"
            {...register('title', { required: 'Please Write Title' })}
            placeholder="챌린지 제목 적기"
          />
        </div>
        <div className="question">
          <h3>챌린지 내용을 입력해주세요</h3>
          <input
            className="inputBox"
            {...register('content', { required: 'Please Write Content' })}
            placeholder="콘텐츠 내용 적기"
          />
        </div>
        <div className="question">
          <h3>챌린지 대표 이미지를 설정해주세요</h3>
          <input
            type={'file'}
            placeholder="챌린지를 설명할 수 있는 대표 이미지를 선택해주세요"
            {...register('titleImage', { required: 'Please Upload Picture' })}
          />
        </div>
        <button className="submitBtn">저장</button>
      </form>
    </S.CreateAsk>
  );
}

export default ChallengeAsk2;
