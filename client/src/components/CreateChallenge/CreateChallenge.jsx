import { useRecoilValue } from 'recoil';
import { createNumber } from '../../atoms/atoms';
import styled from 'styled-components';
import ChallengeAsk1 from './CreateAsk1';
import ChallengeAsk2 from './CreateAsk2';
import ChallengeAsk3 from './CreateAsk3';
import ChallengeAsk4 from './CreateAsk4';

const CreateContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function CreateChallenge() {
  const questionNumber = useRecoilValue(createNumber);

  return (
    <CreateContainer>
      {questionNumber === 1 ? <ChallengeAsk1 /> : null}
      {questionNumber === 2 ? <ChallengeAsk2 /> : null}
      {questionNumber === 3 ? <ChallengeAsk3 /> : null}
      {questionNumber === 4 ? <ChallengeAsk4 /> : null}
    </CreateContainer>
  );
}
