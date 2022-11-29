import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import { useState } from 'react';
import ProfileBoxChallenge from './ProfileBoxChallenge';
import ProfileBoxChallengeList from './ProfileBoxChallengeList';
import ProfileBoxOrderList from './ProfileBoxOrderList';

function ProfileBoxLists({ participatingChallenges, endChallenges }) {
  const [clickedTab, setClickedTab] = useState(0); //router 사용하기
  const TabComponent = {
    0: <ProfileBoxChallenge />,
    1: <ProfileBoxChallengeList />,
    2: <ProfileBoxOrderList />,
  };
  // console.log('99', participatingChallenges.memberChallengeId);
  return (
    <S.ProfileBoxComponent>
      <header>
        <S.Tab
          className={clickedTab === 0 ? 'active-tabs' : 'tabs'}
          onClick={() => {
            setClickedTab(0);
          }}
        >
          도전 중
        </S.Tab>
        <S.Tab
          className={clickedTab === 1 ? 'active-tabs' : 'tabs'}
          onClick={() => {
            setClickedTab(1);
          }}
        >
          도전내역
        </S.Tab>
        <S.Tab
          className={clickedTab === 2 ? 'active-tabs' : 'tabs'}
          onClick={() => {
            setClickedTab(2);
          }}
        >
          결제내역
        </S.Tab>
      </header>
      <section>{TabComponent[clickedTab]}</section>
    </S.ProfileBoxComponent>
  );
}

export default ProfileBoxLists;
