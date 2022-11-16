import React from 'react';
import * as S from '../../style/Common/MainPageStyle';
function MainPage() {
  return (
    <S.MainContainer>
      <S.Container>
        <div style={{ height: '50vh', backgroundColor: 'orange' }}>배너</div>
        <div style={{ height: '50vh' }}>신규챌린지</div>
        <div
          style={{
            height: '50vh',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'orange',
          }}
        >
          <div>이달의 랭커</div>
          <div>전체 랭킹</div>
        </div>
      </S.Container>
    </S.MainContainer>
  );
}

export default MainPage;
