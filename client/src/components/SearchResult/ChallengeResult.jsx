import Challenge from '../ChallengeList/Challenge';
import * as S from '../../style/ChallengeList/ChallengeList.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ChallengeResult() {
  const [challengeList, setChallengeList] = useState([]);

  const challengeSearch = async () => {
    try {
      const response = await axios.get(
        `/challenges/search?searchTitle=초코비&sort-by=populairy&page=1&size=10`,
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

  console.log(challengeList);

  useEffect(() => {
    challengeSearch();
  }, []);

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
