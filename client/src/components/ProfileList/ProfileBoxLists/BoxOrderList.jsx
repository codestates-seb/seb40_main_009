import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

function BoxOrderList() {
  const [orderLists, setOrderLists] = useState([
    {
      orderId: '',
      approved_at: '',
      requestuniquenumber: '',
      itemName: '',
      totalAmount: '',
    },
  ]);

  console.log(orderLists);

  // // get요청
  // useEffect(() => {
  //   axios.get(`http://localhost:3001/orderlists`).then((res) => {
  //     console.log(res.data);
  //     setPayment(...res.data);
  //   });
  // }, []);

  // get요청
  const getOrder = async () => {
    try {
      axios
        .get(`order/list`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.FlS9lUOnWzAi9UFkZOT2UqT4FYmGiiRsST2wfPJErEiQLYYsJw9jSMwYaEwrM1DceWXltVQ5r8o0_OWjFGJa8w',
          },
        })
        .then((response) => {
          const order = response.data;
          // console.log(order);
          setOrderLists(order.data);
        });
    } catch (error) {
      console.log('error: ', error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  // 날짜 바꾸기
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }

  function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }
  return (
    <S.BoxOrderList>
      <div className="orderId-size">{orderLists.orderId}</div>
      <div className="requestuniquenumber-size">
        {orderLists.requestuniquenumber}
      </div>
      <div className="itemName-size">{orderLists.itemName}</div>
      <div className="approved_at-size">
        {toStringByFormatting(new Date(orderLists.approved_at))}
      </div>
      <div className="totalAmount-size">{orderLists.totalAmount}원</div>
    </S.BoxOrderList>
  );
}

export default BoxOrderList;
