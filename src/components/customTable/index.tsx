import { useState } from "react";
import { toast } from "react-toastify";
import OrderModal from "../orderModal";
import { getConsumerAccessToken } from "../../utils/session";
import "./style.css";
import { Typography } from "@mui/material";
import { apiCall } from "../../utils/api";

const CustomTable = ({ orders }: any) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [visibleOrderModal, setVisibleOrderModal] = useState(false);
  const openOrderModal = () => setVisibleOrderModal(true);
  const closeOrderModal = () => setVisibleOrderModal(false);
  const userAccessToken = getConsumerAccessToken() || "";

  const viewOrder = async (orderId: string) => {
    try {
      const result = await apiCall({
        reqMethod: "GET",
        endPoint: `/order/${orderId}`,
        userAccessToken,
      });
      setOrderDetails(result?.data);
      openOrderModal();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{ margin: "0px 80px", overflowX: "auto" }}>
      <OrderModal
        visibleOrderModal={visibleOrderModal}
        closeOrderModal={closeOrderModal}
        order={orderDetails}
      />
      <table>
        <thead>
          <tr>
            <th className="w-3/12">{"id"}</th>
            <th className="w-3/12">{"product"}</th>
            <th className="w-1/12">{"quantity"}</th>
            <th className="w-2/12">{"orderAmount"}</th>
            <th className="w-1/12">{"discount"}</th>
            <th className="w-2/12">{"paidAmount"}</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length ? (
            orders.map((order: any, index: any) => {
              return (
                <tr key={order?._id} onClick={() => viewOrder(order?._id)}>
                  <td className="w-3/12">{order?._id}</td>
                  <td className="w-3/12">{order?.product?.title}</td>
                  <td className="w-1/12">{order?.quantity}</td>
                  <td className="w-2/12">{order?.orderAmount} ₹</td>
                  <td className="w-1/12">{order?.discount || 0} ₹</td>
                  <td className="w-2/12">{order?.paidAmount} ₹</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <Typography className="text-center">No records</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
