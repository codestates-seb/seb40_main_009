import styled from 'styled-components';

export const TimeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const ErrorMessage = styled.div`
  position: relative;
  color: red;

  > span {
    position: absolute;
    top: 100px;
  }
`;

export const CreateAsk = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  } */

  .imgSection {
    margin-bottom: 20px;
    border: 1px solid gray;
  }

  .inputBox {
    width: 400px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
  }

  .question {
    height: 80px;
    margin-top: 20px;

    > textarea {
      resize: none;
      width: 400px;
      height: 50px;
      border-radius: 10px;
      border: 2px solid black;
      text-align: center;
    }

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
  .dateInput {
    width: 200px;
  }

  .checkInputButton {
    margin-top: 100px;
  }
`;

//ask2 & 4 이미지 미리보기
export const ImgExample = styled.img`
  width: 400px;
  height: 400px;
`;
