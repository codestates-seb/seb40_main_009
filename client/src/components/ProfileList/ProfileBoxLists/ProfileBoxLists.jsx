import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import { useState, useEffect } from 'react';
import ProfileBoxChallenge from './ProfileBoxChallenge';
import ProfileBoxChallengeList from './ProfileBoxChallengeList';
import ProfileBoxOrderList from './ProfileBoxOrderList';

function ProfileBoxLists({
  participatingChallenges = [],
  endChallenges = [],
  memberName,
}) {
  const [clickedTab, setClickedTab] = useState(0); //router 사용하기
  const [challenges, setChallenges] = useState(participatingChallenges);
  const LoginName = localStorage.getItem('LoginName');
  const tabName = {
    0: '도전 중',
    1: '도전 내역',
    2: '결제 내역',
  };

  // const data = {p}

  useEffect(() => {
    if (clickedTab === 0) {
      setChallenges(participatingChallenges);
    }
    if (clickedTab === 1) {
      setChallenges(endChallenges);
    }
    if (clickedTab === 2) {
      setChallenges([]); // 빈배열을 주는 이유: 아래 내용을 빈배열로 만들고 새로운 내용 넣음
    }
  }, [participatingChallenges, endChallenges, clickedTab]);

  return (
    <S.ProfileBoxComponent>
      <header>
        {[0, 1, 2].map((tab) => (
          <S.Tab
            key={tab}
            className={clickedTab === tab ? 'active-tabs' : 'tabs'}
            // style={{
            //   display:
            //     clickedTab === 2 && memberName !== LoginName ? 'none' : 'block',
            // }}
            onClick={() => {
              setClickedTab(tab);
            }}
          >
            {tabName[tab]}
          </S.Tab>
        ))}
      </header>
      <section>
        {clickedTab !== 2 &&
          challenges.map((challenge) => (
            <ProfileBoxChallenge
              key={challenge.challengeId}
              challengeTitle={challenge.challengeTitle}
              memberReward={challenge.memberReward}
              memberSuccessDay={challenge.memberSuccessDay}
              challengeRepImage={challenge.challengeRepImage}
              objectPeriod={challenge.objectPeriod}
              objDay={challenge.objDay}
              memberChallengeSuccessRate={challenge.memberChallengeSuccessRate}
              clickedTab={clickedTab}
            />
          ))}
        {clickedTab === 2 && <ProfileBoxOrderList />}
      </section>
    </S.ProfileBoxComponent>
  );
}
export default ProfileBoxLists;
