import styled from 'styled-components';

import { FaSearch } from 'react-icons/fa';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 0.7% 0;
  position: fixed;
  /* margin-bottom: 120px; */
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  z-index: 2;
`;

export const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  color: #8673ff;
  cursor: pointer;
  font-size: 20px;
`;

export const ChallengeButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #ffffff;
  color: #787878;
  font-size: 16px;
  cursor: pointer;
`;

export const Search = styled.div`
  position: relative;
  width: 500px;
  & input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 30px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    box-shadow: 3px 7px 12px 0 #c2c2c2;
  }
  & ul {
    width: 94%;
    padding: 20px 12px 10px 12px;
    color: #787878;
    left: 18px;
    border-radius: 0 0 10px 10px;
    background-color: #ffff;
    font-size: 15px;
    position: absolute;
  }
`;

export const UserSearchResult = styled.div`
  :hover {
    background-color: #f2f4fe;
  }
`;

export const Icon = styled(FaSearch)`
  width: 17px;
  position: absolute;
  top: 10px;
  right: 0;
  margin: 0;
  color: #787878;
`;
