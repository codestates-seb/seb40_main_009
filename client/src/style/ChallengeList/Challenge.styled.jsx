import styled from 'styled-components';

export const ContentA = styled.div`
  transition: 0.5s;

  img {
    max-width: 250px;
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

export const ContentB = styled.div`
  padding-top: 100px;
  text-align: center;
  > a {
    margin-top: 10px;
    display: inline-block;
    text-decoration: none;
    height: 20px;

    :hover {
      background: #8673ff;
      color: #fff;
    }
  }
`;

export const Face = styled.div`
  transition: 0.5s;
  border-radius: 10px;

  &.face1 {
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    background: #eff1fe;
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

export const Card = styled.div`
  position: relative;
  margin-top: -90px;
  margin-bottom: -30px;

  :hover {
    ${Face} {
      &.face1 {
        transform: translateY(10px);
      }

      &.face2 {
        transform: translateY(-100px);
      }
    }
    ${ContentA} {
      > h4 {
        opacity: 1;
        font-weight: bold;
        color: #8673ff;
      }
    }
  }
`;
