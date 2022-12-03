import styled from 'styled-components';

export const ChallengeListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  > button {
    width: 100px;
    height: 40px;
    border-radius: 15px 15px 0 0;
    text-align: center;
    top: 60px;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:nth-child(1) {
    }

    &:nth-child(2) {
      left: 110px;
    }

    &:nth-child(3) {
      left: calc(100% - 210px);
    }
    &:nth-child(4) {
      left: calc(100% - 100px);
    }

    :hover {
      background-color: #8673ff;
      color: white;
    }
  }
`;

export const Container = styled.section`
  margin-top: 100px;
  padding: 92px 30px 80px 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.3);
`;
