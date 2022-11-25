import styled from 'styled-components';

export const Container = styled.div`
  width: 1024px;
  height: 500px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: #eff1fe;
  /* border: 1px solid black; */
  border-radius: 8px;
`;

export const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;
