import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import { UserContainer } from '../../style/MemberList/MemberList.styled';

export default function Member({
  name,
  badge,
  followerCount,
  created_at,
  image,
}) {
  const date = format(parseISO(created_at), 'yyyy-MM-dd');

  return (
    <div>
      <UserContainer>
        <Link to={`/profile/${name}`}>
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
        </Link>
      </UserContainer>
    </div>

    // <S.UserContainer>
    //   <Link to={`/profile/${name}`}>
    //     <div>
    //       <img alt="memberImage" src={image} />
    //       <span>{name}</span>
    //     </div>
    //     <div>{badge}</div>
    //     <div>{followerCount}</div>
    //     <div>{date}</div>
    //   </Link>
    // </S.UserContainer>
  );
}
