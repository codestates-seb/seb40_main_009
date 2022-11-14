import styled from 'styled-components';
import Challenge from '../components/ChallengeList/Challenge';
import * as S from '../style/ChallengeList/ChllengeList.styled';

const SearchContainer = styled.section`
  > button {
    width: 100px;
    height: 40px;
    border-radius: 15px 15px 0 0;
    text-align: center;
    top: 60px;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:nth-child(1) {
    }

    &:nth-child(2) {
      left: 110px;
    }

    :hover {
      background-color: #8673ff;
      color: white;
    }
  }
`;

const SearchResultContainer = styled.section``;

function SearchResult() {
  return (
    <SearchContainer>
      <button>챌린지</button>
      <button>유저</button>
      <SearchResultContainer></SearchResultContainer>
      <S.Container>
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
      </S.Container>
    </SearchContainer>
  );
}

export default SearchResult;
