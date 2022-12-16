import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  createChallengePageNumber,
  createChallengeStateNumber,
} from '../atoms/atoms';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  AddContainer,
  Container,
  NextButton,
} from '../style/CreateChallenge/CreateChallengePage.styled';

import CreateChallenge from '../components/CreateChallenge/CreateChallenge';

export default function CreateChallengePage() {
  const [pageNumber, setPageNumber] = useRecoilState(createChallengePageNumber);
  const stateNumber = useRecoilValue(createChallengeStateNumber);
  const navigate = useNavigate();
  window.localStorage.removeItem('challengeId');

  useEffect(() => {
    //현재 상태에 맞춰 url 변화
    navigate(`/createchallenge/${pageNumber}`);
  }, [pageNumber]);

  return (
    <AddContainer>
      <Container>
        <NextButton style={{ visibility: 'hidden' }} />

        <CreateChallenge />

        {pageNumber > 3 || stateNumber === pageNumber ? (
          <NextButton style={{ visibility: 'hidden' }} />
        ) : (
          <NextButton onClick={() => setPageNumber(pageNumber + 1)}>
            {'>'}
          </NextButton>
        )}
      </Container>
    </AddContainer>
  );
}
