import styled from 'styled-components';

import { FaSearch } from 'react-icons/fa';

export const Select = styled.select`
  /* 생략 */
  font-size: 1rem;
  color: #494949;
  background-color: #fff;

  padding: 0.2em;
  margin-right: 15px;

  border: 1px solid #aaa;
  border-radius: 0.5em;
`;

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
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  color: #8673ff;
  cursor: pointer;
  font-size: 25px;
  width: 17%;
`;

export const ChallengeButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #ffffff;
  color: #494949;
  font-size: 16px;
  margin-right: 1%;
  cursor: pointer;
  :hover {
    background-color: #a294ff;
    opacity: 0.3;
    color: #ffffff;
    border-radius: 10%;
    padding: 5px;
  }
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
    padding: 10px 12px 10px 12px;
    color: #494949;
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
  padding: 1%;
`;

export const DropdownMypage = styled.li`
  /* background: blue; */

  &:hover {
    border-bottom: 3px solid #8673ff;
  }
  margin-bottom: 10px;
`;

export const DropdownLogout = styled.li`
  /* background: blue; */

  &:hover {
    border-bottom: 3px solid #8673ff;
  }
`;

export const Icon = styled(FaSearch)`
  width: 17px;
  position: absolute;
  top: 10px;
  right: 0;
  margin: 0;
  color: #494949;
`;
