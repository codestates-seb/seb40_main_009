import Challenge from '../ChallengeList/Challenge';
import * as S from '../../style/ChallengeList/ChallengeList.styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export default function ChallengeResult({ searchValue }) {
  const [challengeList, setChallengeList] = useState([]);

  const challengeSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `/challenges/search?searchTitle=${searchValue}&sort-by=populairy&page=1&size=10`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const challenges = response.data.data;
      setChallengeList(challenges);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [searchValue]);

  console.log('challenge리스트', challengeList);

  useEffect(() => {
    challengeSearch();
  }, [challengeSearch]);

  return (
    <S.Container>
      {challengeList.map(
        ({ challengeId, challengeTitle, challengeDescription }) => (
          <Challenge
            challengeId={challengeId}
            challengeTitle={challengeTitle}
            challengeDescription={challengeDescription}
            key={challengeId}
          />
        )
      )}
    </S.Container>
  );
}
