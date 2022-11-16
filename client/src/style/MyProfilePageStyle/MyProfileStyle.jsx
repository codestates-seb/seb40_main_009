import styled from 'styled-components';

export const MyProfileComponent = styled.div`
  .profile-info {
    display: flex;
    justify-content: space-between;
  }
  .profile-image {
    width: 180px;
    height: 180px;
    border-radius: 30px;
  }

  .profile-list {
    display: flex;
    margin: 1rem 0;
  }
  .readonly-box {
    width: 25rem;
    height: 5rem;
  }
  .profile-bar {
    margin: 1rem;
  }
  .profile-edit-button {
    width: 2.5rem;
    height: 1.5rem;
    margin: 0 89%;
    background-color: #eff1fe;
    color: #8673ff;
    border: none;
    cursor: pointer;
  }
  p {
    margin-right: 1rem;
  }
`;
