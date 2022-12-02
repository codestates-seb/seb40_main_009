import * as S from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';

function BoxOrderList(
  orderId,
  approved_at,
  requestuniquenumber,
  itemName,
  totalAmount
) {
  // 날짜 바꾸기
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }
  const data = {
    orderId,
    approved_at,
    requestuniquenumber,
    itemName,
    totalAmount,
  };
  console.log('111', data);
  function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }
  return (
    <S.BoxOrderList>
      {/* <div className="orderId-size">{orderId}</div>
      <div className="requestuniquenumber-size">{requestuniquenumber}</div>
      <div className="itemName-size">{itemName}</div>
      <div className="approved_at-size">
        {toStringByFormatting(new Date(approved_at))}
      </div>
      <div className="totalAmount-size">{totalAmount}원</div> */}
      <div className="orderId-size">aaaa</div>
      <div className="requestuniquenumber-size">bbbb</div>
      <div className="itemName-size">cccc</div>
      <div className="approved_at-size">
        {/* {toStringByFormatting(new Date(approved_at))} */}
        2022-11-30
      </div>
      <div className="totalAmount-size">{totalAmount}원</div>
    </S.BoxOrderList>
  );
}

export default BoxOrderList;
