import styled from 'styled-components';

export const CreateAsk = styled.section`
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .inputBox {
    height: 30px;
    text-align: center;
    border-radius: 10px;
  }

  .question {
    height: 80px;
    margin-bottom: 15px;

    > h3 {
      margin-bottom: 10px;
      text-align: center;
    }

    > span {
      margin-bottom: 10px;
      text-align: center;
      display: block;
    }

    > div {
      display: flex;
      > button {
        height: 30px;
      }
    }
  }

  .submitBtn {
    width: 50px;
    height: 30px;
    background-color: #8673ff;
    border: 1px solid #d3dbfc;
    border-radius: 5px;
    color: white;
    :hover {
      background-color: #aec4fa;
    }
  }
`;
