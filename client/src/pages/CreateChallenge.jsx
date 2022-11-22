import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createNumber, validButton } from '../atoms/atoms';

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
  height: 850px;
  padding: 92px 30px 80px 30px;
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
  const [number, setNumber] = useRecoilState(createNumber); // 이름바꾸기 페이지 넘어가는것을 알수있게
  const checkButton = useRecoilValue(validButton);
  const navigate = useNavigate();

  useEffect(() => {
    //현재 상태에 맞춰 url 변화
    navigate(`/createchallenge/${number}`);
  }, [number]);

  return (
    <AddContainer>
      <Container>
        {
          <NextButton
            style={number < 2 && { visibility: 'hidden' }}
            onClick={() => setNumber(number - 1)}
          >
            {'<'}
          </NextButton>
        }
        {/* {number < 2 ? (
          <NextButton style={{ visibility: 'hidden' }} />
        ) : (
          <NextButton onClick={() => setNumber(number - 1)}>{'<'}</NextButton>
        )} */}

        <CreateChallenge />

        {number > 3 ? (
          <NextButton style={{ visibility: 'hidden' }} />
        ) : checkButton === false ? (
          <NextButton style={{ visibility: 'hidden' }} />
        ) : (
          <NextButton onClick={() => setNumber(number + 1)}>{'>'}</NextButton>
        )}
      </Container>
    </AddContainer>
  );
}
