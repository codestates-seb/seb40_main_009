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

function CreateChallenge() {
  const number = useRecoilValue(createNumber);

  return (
    <CreateContainer>
      {number === 1 ? <ChallengeAsk1 /> : null}
      {number === 2 ? <ChallengeAsk2 /> : null}
      {number === 3 ? <ChallengeAsk3 /> : null}
      {number === 4 ? <ChallengeAsk4 /> : null}
    </CreateContainer>
  );
}

export default CreateChallenge;
