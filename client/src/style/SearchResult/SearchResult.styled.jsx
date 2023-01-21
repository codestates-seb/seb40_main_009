import styled from 'styled-components';

export const ListContainer = styled.section`
  padding-top: 80px;
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
