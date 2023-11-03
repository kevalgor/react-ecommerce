import { Box, Modal, Typography, Card } from "@mui/material";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1200,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: "#F6AD55 0px 1px 6px 0px",
};

const OrderModal = ({ visibleOrderModal, closeOrderModal, order }: any) => {
  console.log("order: ", order);
  return (
    <Box>
      <Modal
        open={visibleOrderModal}
        onClose={closeOrderModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card className="product-card">
            <Box className="product-card-image">
              <img src={order?.product?.image} alt="product"></img>
            </Box>
            <Box className="product-card-content">
              <Typography gutterBottom variant="h5" component="div">
                {order?.product?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                {order?.product?.description}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Quantity:</b> {order?.quantity}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Order amount:</b> {order?.orderAmount} ₹
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Discount:</b> {order?.discount} ₹
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Paid amount:</b> {order?.paidAmount} ₹
              </Typography>
            </Box>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderModal;
