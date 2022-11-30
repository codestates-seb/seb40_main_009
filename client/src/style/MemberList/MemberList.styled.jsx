import styled from 'styled-components';

export const ListContainer = styled.section`
  width: 1024px;
  margin: 0 auto;
  padding-top: 100px;

  > :nth-child(1) {
    > button {
      width: 100px;
      height: 40px;
      position: relative;
      border-radius: 15px 15px 0 0;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;

      &.clickedBtn {
        background-color: #8673ff;
        color: white;
      }

      :hover {
        background-color: #8673ff;
        color: white;
      }
    }
  }
`;

export const IndexContainer = styled.section`
  width: 80%;
  height: 30px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #aec4fa;
  > button {
    width: 25%;
    text-align: center;
    border: none;
    background-color: #aec4fa;
    cursor: pointer;
  }
`;

export const Container = styled.section`
  padding: 30px 0 50px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 컴포넌트
export const UserContainer = styled.div`
  width: 80%;
  height: 50px;
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > a {
    margin-top: 3px;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-around;

    > div {
      width: 25%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: 30px;
        border-radius: 100px;
      }
      > span {
        padding-left: 10px;
      }
    }
    :hover {
      color: #8673ff;
    }
  }
  :hover {
    border: 2px solid #8673ff;
  }
`;
