import styled from 'styled-components';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CreateChallenge from '../components/CreateChallenge/CreateChallenge';
import { createNumber, validBtn } from '../atoms/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

const NextBtn = styled.button`
  width: 30px;
  height: 30px;
`;

function CreateChallengePage() {
  const [number, setNumber] = useRecoilState(createNumber);
  const checkBtn = useRecoilValue(validBtn);
  const navigate = useNavigate();

  useEffect(() => {
    //현재 상태에 맞춰 url 변화
    navigate(`/createchallenge/${number}`);
  }, [number]);
  return (
    <AddContainer>
      <Container>
        {number < 2 ? (
          <NextBtn style={{ visibility: 'hidden' }} />
        ) : (
          <NextBtn onClick={() => setNumber(number - 1)}>{'<'}</NextBtn>
        )}
        <CreateChallenge />
        {number > 3 ? (
          <NextBtn style={{ visibility: 'hidden' }} />
        ) : checkBtn === false ? (
          <NextBtn style={{ visibility: 'hidden' }} />
        ) : (
          <NextBtn onClick={() => setNumber(number + 1)}>{'>'}</NextBtn>
        )}
      </Container>
    </AddContainer>
  );
}

export default CreateChallengePage;

// selection3: {
//     startDate: addDays(Date.now(), 0),
//     endDate: null,
//     key: 'selection3',
//     autoFocus: false,
//   },
