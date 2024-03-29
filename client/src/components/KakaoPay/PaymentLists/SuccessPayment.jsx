import axios from 'axios';
import { useEffect } from 'react';
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

  const location = useLocation();
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(`/`);
  };

  const pgToken = location.search.split('=')[1];
  const PG_TOKEN = pgToken.replace('&tid', '');
  const TID = localStorage.getItem('TID');

  const getData = async () => {
    try {
      const response = await axios.get(
        `/order/kakaopay/success?pg_token=${PG_TOKEN}&tid=${TID}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: localStorage.getItem('authorizationToken'),
          },
        }
      );
      localStorage.setItem('memberMoney', response.data.data.memberMoney);
      navigate(`/`);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    getData();
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
