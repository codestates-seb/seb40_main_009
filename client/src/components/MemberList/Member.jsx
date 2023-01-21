import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import { UserContainer } from '../../style/MemberList/MemberList.styled';
import { useRecoilValue } from 'recoil';
import { LoginState } from '../Login/KakaoLoginData';

export default function Member({
  name,
  badge,
  followerCount,
  created_at,
  image,
}) {
  const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const date = format(parseISO(created_at), 'yyyy-MM-dd');

  /**유저 상세 페이지로 이동*/
  const moveToMemberDetail = () => {
    if (!isLogin) {
      alert('로그인 후 확인하실 수 있습니다.');
      navigate('/');
    } else {
      navigate(`/profile/${name}`);
    }
  };

  return (
    <div>
      <UserContainer onClick={moveToMemberDetail}>
        <div>
          <div>
            <div style={{ width: '120px' }}>
              <img
                alt="memberImage"
                src={image}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '10px',
                  // border: '1px solid red',
                  boxShadow: '3px 7px 12px 0 #c2c2c2',
                }}
              />
              <span>{name}</span>
            </div>
          </div>
          <div>{badge}</div>
          <div>{followerCount}</div>
          <div>{date}</div>
        </div>
      </UserContainer>
    </div>
  );
}
