import styled from 'styled-components';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import CreateChallenge from '../components/AddChallenge/CreateChallenge';
import { createNumber } from '../atoms/atoms';
import { useRecoilState } from 'recoil';
const AddContainer = styled.section`
  padding-top: 120px;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Container = styled.section`
  height: 900px;
  padding: 92px 30px 80px 30px;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function AddChallenge() {
  const [number, setNumber] = useRecoilState(createNumber);

  return (
    <AddContainer>
      <Container>
        <CreateChallenge />
        {number > 2 ? null : (
          <button onClick={() => setNumber(number + 1)}>{'>'}</button>
        )}
        {number < 1 ? null : (
          <button onClick={() => setNumber(number - 1)}>{'<'}</button>
        )}
      </Container>
    </AddContainer>
  );
}

export default AddChallenge;

// selection3: {
//     startDate: addDays(Date.now(), 0),
//     endDate: null,
//     key: 'selection3',
//     autoFocus: false,
//   },
