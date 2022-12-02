import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { paymentData } from '../../../atoms/payment';

import { useLocation, useNavigate } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from 'react-icons/ai';
import {
  CancellationPaymentComponent,
  WiseLife,
  DescriptionContainer,
  FooterLogo,
} from '../../../style/KakaoPay/KakaoPayStyle';

function SuccessPayment() {
  const challengeId = localStorage.getItem('challengeId');
  const createChallengeData = localStorage.getItem('createChallengeData');
  const location = useLocation();
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(`/`);
  };

  const pgToken = location.search.split('=')[1];
  const PG_TOKEN = pgToken.replace('&tid', '');

  const TID = localStorage.getItem('TID');

  console.log(createChallengeData);

  const participateChallenge = async () => {
    try {
      await axios.get(
        `order/kakaopay/success/1?pg_token=${PG_TOKEN}&tid=${TID}`,
        {
          headers: {
            Authorization: localStorage.getItem('authorizationToken'),
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const createChallenge = async () => {
    try {
      await axios.post(
        `order/kakaopay/success/pg_token=${PG_TOKEN}&tid=${TID}`,
        {
          headers: {
            Authorization: localStorage.getItem('authorizationToken'),
          },
          data: createChallengeData,
        }
      );
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    if (createChallengeData) {
      createChallenge();
    } else {
      participateChallenge();
    }
  }, []);

  return (
    <CancellationPaymentComponent>
      <div className="font-width">
        <WiseLife>
          <div className="order-state">슬기로운 생활</div>
          <div>행복한 삶을 살고 싶다면, 목표에 의지하라</div>
        </WiseLife>
        <div className="just-flex">
          <div></div>
          <div>
            <h1>결제 완료</h1>
            <BsHouse
              size={150}
              style={{ marginLeft: '50px' }}
              onClick={onClickImg}
            />
          </div>
        </div>
        <FooterLogo>
          <DescriptionContainer>
            <div className="name">슬기로운 생활</div>
            <div className="icon">
              <AiFillGithub />
              <AiFillTwitterCircle />
              <AiFillLinkedin />
              <AiFillInstagram />
            </div>
          </DescriptionContainer>
          <div className="text">
            &#40;주&#41; 슬기로운 생활 | 대표: 김민섭 김유현 오영운 한병주
            김은비 심이서
          </div>
        </FooterLogo>
      </div>
    </CancellationPaymentComponent>
  );
}
export default SuccessPayment;
