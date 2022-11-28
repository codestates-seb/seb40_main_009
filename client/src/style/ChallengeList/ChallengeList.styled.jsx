import styled from 'styled-components';

export const ListContainer = styled.section`
  padding-top: 60px;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  > :nth-child(1) {
    margin-top: 20px;
    > a {
      > button {
        :hover {
          background-color: #8673ff;
          color: white;
        }
      }
      :hover {
        color: white;
      }
    }
    > div {
      position: relative;
      > select {
        position: absolute;
        width: 130px;
        height: 30px;
        top: -30px;
        right: 0px;
      }
    }
  }
`;

export const Container = styled.section`
  padding: 92px 30px 80px 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const AddChallengeButton = styled.button`
  position: fixed;
  width: 70px;
  height: 70px;
  border-radius: 100px;
  z-index: 3;
  top: calc(100% - 150px);
  right: 20%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  :hover {
    background-color: #d3dbfc;
    color: #8673ff;
  }

  :active {
    background-color: #8673ff;
    color: white;
  }
`;

export const Tab = styled.button`
  width: 100px;
  height: 40px;
  position: relative;
  border-radius: 15px 15px 0 0;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? `#8673ff` : `white`)};
  color: ${(props) => (props.isActive ? `white` : 'black')};
`;
