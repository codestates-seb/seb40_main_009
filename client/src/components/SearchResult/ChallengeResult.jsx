import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '../../style/ChallengeList/ChallengeList.styled';

import Challenge from '../ChallengeList/Challenge';

export default function ChallengeResult({ searchValue }) {
  const [challengeList, setChallengeList] = useState([]);

  /**챌린지 검색 결과 데이터 요청 */
  const challengeSearch = async () => {
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
  };

  useEffect(() => {
    challengeSearch();
  }, []);

  return (
    <Container>
      {challengeList.map(
        ({
          challengeId,
          challengeTitle,
          challengeDescription,
          challengeRepImagePath,
        }) => (
          <Challenge
            id={challengeId}
            title={challengeTitle}
            description={challengeDescription}
            key={challengeId}
            image={challengeRepImagePath}
          />
        )
      )}
    </Container>
  );
}
