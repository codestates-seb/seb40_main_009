import styled from 'styled-components';

export const OrderSheetInfoPageComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  color: #595959;
  margin: auto;
  padding-top: 7rem;
  .order-sheet {
    border-top: 0.2rem solid #595959;
    border-bottom: 0.12rem solid #595959;
  }
  .order-lists {
    display: flex;
  }
  .challenge-title {
    margin: 1rem 0;
  }
  .challenge-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .image-size {
    width: 200px;
    height: 200px;
    margin: 2.5rem 2.5rem 2.5rem 0;
  }
  .order-title {
    font-size: 24px;
    margin: 1rem 0;
  }
  .order-info {
    display: flex;
    margin-top: 1rem;
  }
  .order-left {
    width: 100%;
  }
  .order-info-top {
    line-height: 3rem;
    padding-bottom: 4rem;
  }
  .order-info-bottom {
    line-height: 3rem;
    border-top: 0.12rem solid #595959;
    padding-top: 1rem;
    padding-bottom: 4rem;
  }
  .pay-button {
    width: 200px;
    height: 60px;
    background-color: #fbe34d;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }

  .order-right {
    margin: 1rem 0rem 0rem 1rem;
  }
`;
