import { useNavigate, useParams } from 'react-router-dom';
import { ProfileBoxChallengeComponent } from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
//반복되는 대상 맵 필요x

function ProfileBoxList({
  challengeId,
  memberReward,
  challengeTitle,
  clickedTab,
  challengeRepImage,
  memberSuccessDay,
  objDay,
  memberChallengeSuccessRate,
  endChallengesData,
}) {
  const navigate = useNavigate();
  // console.log('endChallengesData>>', endChallengesData);

  // 챌린지 클릭시 이동
  const onClickChallenge = () => {
    navigate(`/detail/${challengeId}`);
  };

  // console.log('clickedTab>>', clickedTab);
  // console.log('challengeId>>', challengeId);
  // 문제 => 각각의 탭 잘 나오다 0번째 탭을 클릭하고 이동하면 모두 0번 째 내용으로만 나옴
  return (
    <>
      {clickedTab === 1 && endChallengesData === [] ? (
        <div
          role="img"
          aria-label="writing hand"
          style={{
            width: '100%',
            height: '450px',
            marginTop: '1%',
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '20px',
            alignItems: 'center',
          }}
        >
          인증사진을 올려주세요.😊
        </div>
      ) : (
        <ProfileBoxChallengeComponent onClick={onClickChallenge}>
          <div className="title">
            <h1>
              {clickedTab === 0 && '도전 중'}
              {clickedTab === 1 && '도전내역'}
              {clickedTab === 2 && '결제내역'}
              {clickedTab === 0 && <span className="tag">NOW</span>}
            </h1>
            <span className="percentage">{memberChallengeSuccessRate}%</span>
          </div>
          <form className="challenge-box">
            <img
              src={challengeRepImage}
              className="challenge-box-image"
              alt="challenge-box-img"
            />
            <div className="challenge-box-info">
              <p>{challengeTitle}</p>
              <div className="challenge-box-info-lists">
                <p>
                  성공일수:{memberSuccessDay} / 목표일수:{objDay}
                </p>
                <p>
                  예상환급금:&nbsp;
                  {memberReward
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  &nbsp; 원
                </p>
              </div>
            </div>
          </form>
          <p className="notice">
            *수수료로 인해 예상금액과 실제 환급금액은 서로 상이할 수 있음.
          </p>
        </ProfileBoxChallengeComponent>
      )}
    </>
  );
}

export default ProfileBoxList;
