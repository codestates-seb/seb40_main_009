import * as S from '../style/DetailPage/DetailPageStyle';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';

function ChallengeDetail() {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState([]);

  // 챌린지조회
  useEffect(() => {
    setLoading(true);
    axios
      // .get(`http://localhost:3001/challenge?challengeCategoryId=2`)
      .get(`http://localhost:3001/challenge`)
      .then((res) => {
        setChallenge(res.data);
        setLoading(false);
        console.log('challenge>>>', challenge);
      })
      .catch((error) => {
        window.alert(error);
        console.log('error', error);
      });
  }, []);

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      <S.Recruitment>
        <img src="./img/smile.jpg" alt="도전 할 항목의 이미지" />
        <div>
          {/* 챌린지 설명 */}
          <S.Description>
            <div className="challenge-name">{challenge.challengeTitle}</div>

            <S.Title>
              <div className="pd-5">
                <S.PaddingB>최소 / 최대 인원</S.PaddingB>
                <S.PaddingB>챌린지 기간</S.PaddingB>
                <S.PaddingB>챌린지 금액</S.PaddingB>
                {/* <S.PaddingB>모인 금액</S.PaddingB> */}
              </div>
              <div>
                <S.PaddingB>{`${challenge.challengeMinParty} / ${challenge.challengeMaxParty}`}</S.PaddingB>
                <S.PaddingB>{`${challenge.challengeStartDate} ~ ${challenge.challengeEndDate}`}</S.PaddingB>
                <S.PaddingB>{challenge.challengeFeePerPerson}</S.PaddingB>
                {/* <S.PaddingB>모인 금액</S.PaddingB> */}
              </div>
            </S.Title>
            {/* 참여버튼 */}
            <S.BtnWrapper>
              <button className="custom-btn btn-8">
                <span>참여하기</span>
              </button>
              {/* <div>공유아이콘</div> */}
            </S.BtnWrapper>
          </S.Description>
        </div>
      </S.Recruitment>

      {/* 챌린지 설명 */}
      <S.Certification>
        <S.Wrapper>
          <div className="title">챌린지 설명</div>
          <div className="pd-5">{challenge.challengeDescription}</div>
        </S.Wrapper>
        {/* 인증 설명 */}
        <S.Wrapper>
          <div className="title">인증 방법</div>
          <div className="pd-5">{challenge.challengeAuthDescription}</div>
        </S.Wrapper>
        {/* 인증 예시 */}
        <S.Wrapper>
          <div className="title">인증 예시</div>
          <img src="./img/smile.jpg" alt="*" />
        </S.Wrapper>
      </S.Certification>

      <S.Review>
        <div>후기 사진</div>
        <div style={{ border: '2px solid red', marginTop: '3%' }}>
          <img src="*" alt="" />
        </div>
      </S.Review>
    </S.Container>
  );
}

export default ChallengeDetail;
