import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createChallenge, validBtn } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';

function ChallengeAsk1() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const checkBtn = useSetRecoilState(validBtn);

  const onClick = (e) => {
    setCreateChallenge({ ...create, category: e.target.value });
  };
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...create, ...data });
    checkBtn(true);
  };
  return (
    <S.CreateAsk>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="question">
          <h3>카테고리를 선택하세요</h3>
          <div>
            <button onClick={onClick} value={1} type="button">
              버킷리스트
            </button>
            <button onClick={onClick} value={2} type="button">
              공유 챌린지
            </button>
            <button onClick={onClick} value={3} type="button">
              오프라인 챌린지
            </button>
          </div>
        </div>
        <div className="question">
          <h3>함께할 최소인원수를 정해주세요</h3>
          <input
            className="inputBox"
            {...register('minperson', { required: 'Please Write Content' })}
            placeholder="최소 인원수를 입력하세요"
            type={'number'}
          />
        </div>
        <div className="question">
          <h3>함께할 최대인원수를 정해주세요</h3>
          <input
            className="inputBox"
            {...register('maxperson', { required: 'Please Write Content' })}
            placeholder="최대 인원수를 입력하세요"
            type={'number'}
          />
        </div>
        <div className="question">
          <h3>챌린지 참가금액을 입력해주세요</h3>
          <input
            className="inputBox"
            {...register('money', { required: 'Please Write Content' })}
            placeholder="참가 금액"
            type={'number'}
          />
        </div>
        <button className="submitBtn">저장</button>
      </form>
    </S.CreateAsk>
  );
}

export default ChallengeAsk1;
