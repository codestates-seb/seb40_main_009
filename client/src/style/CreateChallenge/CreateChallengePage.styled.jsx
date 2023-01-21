import styled from 'styled-components';

export const AddContainer = styled.section`
  padding-top: 80px;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const Container = styled.section`
  padding: 0px 30px 80px 30px;
  height: 1000px;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NextButton = styled.button`
  width: 30px;
  height: 30px;
`;

//createChallenge
export const CreateContainer = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > button {
      margin-top: 50px;
      width: 100px;
      height: 100px;
      border-radius: 20px;
      background-color: #8672ff;
      color: white;

      :hover {
        color: black;
        background-color: #e9e5ff;
        border: 1px solid #e9e5ff;
      }

      :active {
        color: #8672ff;
        background-color: #e9e5ff;
        border: 1px solid #8672ff;
      }
    }
  }
`;
