import styled from 'styled-components';

export const UpperCard = styled.div`
  transition: 0.5s;

  img {
    width: 230px;
    height: 230px;
    border-radius: 10px;
  }

  h4 {
    opacity: 0.4;
    margin: 10px 0 0;
    padding: 0;
    color: black;
    text-align: center;
    font-size: 1.2em;
  }
`;

export const LowerCard = styled.div`
  padding-top: 120px;
  text-align: center;

  > span {
    margin-top: 10px;
    border-radius: 10px;
    padding: 8px 8px 0px 8px;
    display: inline-block;
    text-decoration: none;
    height: 20px;
    color: ${(props) => (props.checkLateParticipate ? '#8673ff' : 'gray')};
    font-size: 14px;
    cursor: pointer;

    :hover {
      height: 22px;
      background-color: ${(props) =>
        props.checkLateParticipate ? '#8673ff' : 'gray'};
      color: #fff;
    }
  }
`;

export const CardContents = styled.div`
  transition: 0.5s;
  border-radius: 10px;

  &.face1 {
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    background-color: ${(props) =>
      props.checkLateParticipate ? '#eff1fe' : 'gray'};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
  }

  &.face2 {
    height: 200px;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-100px);
  }
`;

export const CardContainer = styled.div`
  position: relative;
  margin-top: -90px;
  margin-bottom: -30px;

  :hover {
    ${CardContents} {
      &.face1 {
        background-color: ${(props) =>
          props.checkLateParticipate ? '#8673ff' : 'gray'};
        transform: translateY(10px);
      }

      &.face2 {
        transform: translateY(-100px);
      }
    }
    ${UpperCard} {
      > h4 {
        opacity: 1;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
`;
