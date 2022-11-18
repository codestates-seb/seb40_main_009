import styled from 'styled-components';

export const ProfileBoxComponent = styled.div`
  display: flex;
  flex-direction: column;
  section {
    border: 0.1rem solid #d9d9d9;
  }
  header {
    display: flex;
  }
  .tabs {
    background-color: #eff1fe;
  }
  .active-tabs {
    background-color: #8673ff;
  }
  .content {
    background: white;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
  }
  .content hr {
    width: 100px;
    height: 2px;
    background: #222;
    margin-bottom: 5px;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
`;

export const Tab = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px 15px 0 0;
  text-align: center;
  position: relative;
  border: none;
  cursor: pointer;
`;
