import { BoxOrderListComponent } from '../../../style/MyProfilePageStyle/ProfileBoxListsStyle/ProfileBoxListsStyle';
import dayjs from 'dayjs';

function BoxOrderList({ orderLists }) {
  return (
    <>
      {orderLists.map((order, index) => (
        <BoxOrderListComponent>
          <>
            <div className="orderId-size" key={index}>
              {order.orderId}
            </div>
            <div className="requestuniquenumber-size">
              {order.requestuniquenumber}
            </div>
            <div className="itemName-size">{order.itemName}</div>
            <div className="approved_at-size">
              {dayjs(new Date(order.approved_at)).format('YYYY-MM-DD')}
            </div>
            <div className="totalAmount-size">{order.totalAmount}원</div>
          </>
        </BoxOrderListComponent>
      ))}
    </>
  );
}

export default BoxOrderList;
