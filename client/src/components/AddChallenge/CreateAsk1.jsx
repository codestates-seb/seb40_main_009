import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';

const CreateAsk = styled.section``;

function ChallengeAsk1() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...data, ...create });
  };
  return (
    <CreateAsk>
      <form onSubmit={handleSubmit(onValid)}>
        <h3>챌린지 제목을 입력해주세요</h3>
        <input
          {...register('title', { required: 'Please Write Title' })}
          placeholder="챌린지 제목 적기"
        />
        <h3>챌린지 내용을 입력해주세요</h3>
        <input
          {...register('content', { required: 'Please Write Content' })}
          placeholder="콘텐츠 내용 적기"
        />
        <button>저장</button>
      </form>
    </CreateAsk>
  );
}

export default ChallengeAsk1;
