import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  createChallengePageNumber,
  createChallengeStateNumber,
} from '../atoms/atoms';

import styled from 'styled-components';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import CreateChallenge from '../components/CreateChallenge/CreateChallenge';

const AddContainer = styled.section`
  padding-top: 80px;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Container = styled.section`
  padding: 0px 30px 80px 30px;
  height: 1000px;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NextButton = styled.button`
  width: 30px;
  height: 30px;
`;

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
