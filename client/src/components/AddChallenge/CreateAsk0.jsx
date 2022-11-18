import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';

const CreateAsk = styled.section``;

function ChallengeAsk() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const onClick = (e) => {
    setCreateChallenge({ ...create, category: e.target.value });
  };
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...create, ...data });
  };

  return (
    <CreateAsk>
      <form onSubmit={handleSubmit(onValid)}>
        <h3>카테고리를 선택하세요</h3>
        <button onClick={onClick} value={1} type="button">
          버킷리스트
        </button>
        <button onClick={onClick} value={2} type="button">
          공유 챌린지
        </button>
        <button onClick={onClick} value={3} type="button">
          오프라인 챌린지
        </button>
        <h3>함께할 최소인원수를 정해주세요</h3>
        <input
          {...register('minperson', { required: 'Please Write Content' })}
          placeholder="최소 인원수를 입력하세요"
          type={'number'}
        />
        <h3>함께할 최대인원수를 정해주세요</h3>
        <input
          {...register('maxperson', { required: 'Please Write Content' })}
          placeholder="최대 인원수를 입력하세요"
          type={'number'}
        />
        <h3>챌린지 참가금액을 입력해주세요</h3>
        <input
          {...register('money', { required: 'Please Write Content' })}
          placeholder="참가 금액"
          type={'number'}
        />
        <button>저장</button>
      </form>
    </CreateAsk>
  );
}

export default ChallengeAsk;
