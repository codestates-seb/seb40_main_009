import styled from 'styled-components';

export const ProfileBoxChallengeComponent = styled.div`
  margin: 2.5rem;
  .challenge-box {
    display: flex;
    margin-top: 2.5rem;
  }
  .challenge-box-image {
    width: 200px;
    height: 200px;
    border-radius: 60px;
    margin-right: 3rem;
  }
  .challenge-box-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .challenge-box-info-lists {
    display: flex;
    justify-content: space-between;
    padding-right: 20%;
  }
  .notice {
    text-align: right;
    font-size: 16px;
    color: #d9d9d9;
  }
  tag {
    font-size: 16px;
    background-color: #aec4fa;
    padding: 0.2rem;
    margin: 0.2rem;
    border-radius: 10%;
  }
`;
