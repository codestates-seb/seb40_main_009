import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  ProfileBoxOrderListComponent,
  ProfileBoxOrderList,
} from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

import BoxOrderList from './BoxOrderList';

function ProfileBoxChallenge() {
  const [orderLists, setOrderLists] = useState([
    {
      itemName: '',
      orderId: '',
      requestuniquenumber: '',
      approved_at: '',
      totalAmount: '',
    },
  ]);

  console.log('lisy', orderLists);

  // get요청;
  const getOrderLists = async () => {
    try {
      axios
        .get(`order/list`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization: localStorage.getItem('authorizationToken'),
          },
        })
        .then((response) => {
          const order = response.data;
          console.log('order', order);
          setOrderLists(order);
          // setOrderLists(order.data);
          console.log('set', setOrderLists);
        })
        .catch(async (error) => {
          if (error.response.data.status === 401) {
            try {
              const responseToken = await axios.get('/token', {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  refresh: localStorage.getItem('refreshToken'),
                },
              });
              await localStorage.setItem(
                'authorizationToken',
                responseToken.headers.authorization
              );
            } catch (error) {
              console.log('재요청 실패', error);
            }
          }
        });
    } catch (error) {
      console.log(error);
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
      <BoxOrderList
        orderId={orderLists.orderId}
        approved_at={orderLists.approved_at}
        requestuniquenumber={orderLists.equestuniquenumber}
        itemName={orderLists.itemName}
        totalAmount={orderLists.totalAmount}
      />
    </ProfileBoxOrderListComponent>
  );
}

export default ProfileBoxChallenge;
