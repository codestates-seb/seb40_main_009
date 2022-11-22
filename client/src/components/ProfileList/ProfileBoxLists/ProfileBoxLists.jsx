import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import { useState } from 'react';
import ProfileBoxChallenge from './ProfileBoxChallenge';
import ProfileBoxChallengeList from './ProfileBoxChallengeList';
import ProfileBoxOrderList from './ProfileBoxOrderList';

function ProfileBoxLists() {
  const [clickedTab, setClickedTab] = useState(0); //router 사용하기
  console.log(clickedTab);
  const TabComponent = {
    0: <ProfileBoxChallenge />,
    1: <ProfileBoxChallengeList />,
    2: <ProfileBoxOrderList />,
  };
  return (
    <S.ProfileBoxComponent>
      <header>
        <S.Tab
          className={clickedTab === 0 ? 'active-tabs' : 'tabs'}
          // eventKey="link-0"
          onClick={() => {
            setClickedTab(0);
          }}
        >
          도전 중
        </S.Tab>
        <S.Tab
          className={clickedTab === 1 ? 'active-tabs' : 'tabs'}
          // eventKey="link-1"
          onClick={() => {
            setClickedTab(1);
          }}
        >
          도전내역
        </S.Tab>
        <S.Tab
          className={clickedTab === 2 ? 'active-tabs' : 'tabs'}
          // eventKey="link-2"
          onClick={() => {
            setClickedTab(2);
          }}
        >
          결제내역
        </S.Tab>
      </header>
      <section>
        {/* 삼항이 넘어가면 사용하지 않는 게 좋음 const TabComponent = {
  '0' : Component,
  '1' : Component
}*/}

        {TabComponent[clickedTab]}
        {/* {clickedTab === 0 ? <ProfileBoxChallenge /> : null}
        {clickedTab === 1 ? <ProfileBoxChallengeList /> : null}
        {clickedTab === 2 ? <ProfileBoxOrderList /> : null} */}
        {/* {clickedTab === 0 ? (
          <ProfileBoxChallenge />
        ) : clickedTab === 1 ? (
          <ProfileBoxChallengeList />
        ) : clickedTab === 2 ? (
          <ProfileBoxOrderList />
        ) : null} */}
      </section>
    </S.ProfileBoxComponent>
  );
}

export default ProfileBoxLists;
