import styled from 'styled-components';
import Challenge from '../components/ChallengeList/Challenge';

const ChallengeListContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  margin-top: 140px;
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 15px;
`;

function ChallengeList() {
  return (
    <ChallengeListContainer>
      <Container>
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
      </Container>
    </ChallengeListContainer>
  );
}

export default ChallengeList;
