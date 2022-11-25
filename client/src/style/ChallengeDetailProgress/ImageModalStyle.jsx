import styled from 'styled-components';

export const Container = styled.div`
  width: 1024px;
  height: 500px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 70%);
  background-color: #eff1fe;
  border-radius: 8px;
  overflow: auto;
`;

export const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const ImageWrapper = styled.div`
  margin: 5% 0 5% 5%;
  margin-top: 3%;
  margin-left: 1%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 93%;
`;

export const Images = styled.div`
  margin-bottom: 3%;
  width: 90%;
  border: 1px solid blue;
  height: 180px;
`;
