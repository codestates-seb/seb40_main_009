import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

function BoxOrderList() {
  const [payment, setPayment] = useState({
    orderId: '',
    approved_at: '',
    requestuniquenumber: '',
    itemName: '',
    totalAmount: '',
  });

  // get요청
  useEffect(() => {
    axios.get(`http://localhost:3001/orderlists`).then((res) => {
      console.log(res.data);
      setPayment(...res.data);
    });
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
      <div className="orderId-size">{payment.orderId}</div>
      <div className="requestuniquenumber-size">
        {payment.requestuniquenumber}
      </div>
      <div className="itemName-size">{payment.itemName}</div>
      <div className="approved_at-size">
        {toStringByFormatting(new Date(payment.approved_at))}
      </div>
      <div className="totalAmount-size">{payment.totalAmount}원</div>
    </S.BoxOrderList>
  );
}

export default BoxOrderList;
