import styled from 'styled-components';

export const EditProfileComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  margin: auto;
  padding-top: 7rem;
  .title {
    font-size: 24px;
    border-bottom: 1px solid black;
    margin-bottom: 2.5rem;
  }
`;

export const Edit = styled.div`
  margin-top: 2.5rem;
  line-height: 2rem;
  .name {
    width: 200px;
    height: 30px;
  }
  .introduction {
    width: 750px;
    height: 150px;
    white-space: pre-line;
  }
  .button {
    text-align: right;
    margin-top: 2rem;
  }
`;

export const CancelBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 1rem;
  background-color: #eff1fe;
  border: none;
  color: #8673ff;
`;
export const EditBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: #8673ff;
  color: #ffffff;
  border: none;
`;
