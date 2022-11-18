import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

function ProfileBoxList() {
  return (
    <S.ProfileBoxChallengeComponent>
      <h1>
        도전 중인 챌린지
        <tag>NOW</tag>
      </h1>
      <form className="challenge-box">
        <img
          className="challenge-box-image"
          alt="challenge box img"
          src="https://cdn.pixabay.com/photo/2020/01/21/11/39/running-4782722_1280.jpg"
        />
        <div className="challenge-box-info">
          <p>매일 30분 운동하기</p>
          <div className="challenge-box-info-lists">
            <p>출근 일수 / 목표 출석 수</p>
            <p>예상환급금:100,000원</p>
          </div>
        </div>
      </form>
      <p className="notice">
        *수수료로 인해 예상금액과 실제 환급금액은 서로 상이할 수 있음.
      </p>
    </S.ProfileBoxChallengeComponent>
  );
}

export default ProfileBoxList;
