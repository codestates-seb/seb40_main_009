import styled from 'styled-components';

export const ChallengeListContainer = styled.section`
  width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  > :nth-child(1) {
    margin-top: 20px;
    > button {
      width: 100px;
      height: 40px;
      position: relative;
      border-radius: 15px 15px 0 0;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;

      > :nth-child(3) :nth-child(4) {
      }

      :hover {
        background-color: #8673ff;
        color: white;
      }
    }
  }
`;

export const Container = styled.section`
  padding: 92px 30px 80px 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.3);
`;
