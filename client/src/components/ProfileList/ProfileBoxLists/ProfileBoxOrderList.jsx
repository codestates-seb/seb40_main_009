import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  ProfileBoxOrderListComponent,
  ProfileBoxOrderList,
} from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

import BoxOrderList from './BoxOrderList';

function ProfileBoxChallenge() {
  const [orderLists, setOrderLists] = useState([]);

  // get요청
  const getOrderLists = async () => {
    try {
      const response = await axios.get(`/order/list`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Authorization: localStorage.getItem('authorizationToken'),
        },
      });
      const orderList = response.data.data;
      setOrderLists(orderList);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getOrderLists();
  }, []);

  return (
    <ProfileBoxOrderListComponent>
      <h1 className="title">결제내역</h1>
      <ProfileBoxOrderList>
        <div className="orderId-size">결제번호</div>
        <div className="requestuniquenumber-size">주문번호</div>
        <div className="itemName-size">챌린지 이름</div>
        <div className="approved_at-size">결제시간</div>
        <div className="totalAmount-size">결제금액</div>
      </ProfileBoxOrderList>
      <BoxOrderList orderLists={orderLists} />
    </ProfileBoxOrderListComponent>
  );
}

export default ProfileBoxChallenge;
