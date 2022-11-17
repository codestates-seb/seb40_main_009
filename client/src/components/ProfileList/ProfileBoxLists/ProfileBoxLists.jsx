import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import { useState } from 'react';
import ProfileBoxChallenge from './ProfileBoxChallenge';
import ProfileBoxChallengeList from './ProfileBoxChallengeList';
import ProfileBoxOrderList from './ProfileBoxOrderList';

function ProfileBoxLists() {
  let [clickedTab, setClickedTab] = useState(0);
  console.log(clickedTab);

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
        {clickedTab === 0 ? <ProfileBoxChallenge /> : null}
        {clickedTab === 1 ? <ProfileBoxChallengeList /> : null}
        {clickedTab === 2 ? <ProfileBoxOrderList /> : null}
      </section>
    </S.ProfileBoxComponent>
  );
}

export default ProfileBoxLists;
