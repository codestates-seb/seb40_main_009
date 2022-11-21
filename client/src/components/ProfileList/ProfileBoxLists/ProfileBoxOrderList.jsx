import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import BoxOrderList from './BoxOrderList';
// import dummy from '../../../../db.json';

function ProfileBoxChallenge(props) {
  return (
    <S.ProfileBoxOrderListComponent>
      <h1 className="title">결제내역</h1>
      <S.ProfileBoxOrderList>
        <div className="orderId-size">결제번호</div>
        <div className="requestuniquenumber-size">주문번호</div>
        <div className="itemName-size">챌린지 이름</div>
        <div className="approved_at-size">결제시간</div>
        <div className="totalAmount-size">결제금액</div>
      </S.ProfileBoxOrderList>
      <BoxOrderList />
      <BoxOrderList />
      <BoxOrderList />
    </S.ProfileBoxOrderListComponent>
  );
}

export default ProfileBoxChallenge;
