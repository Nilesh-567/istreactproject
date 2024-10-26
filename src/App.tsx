import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import {
  Button,
  Snackbar,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { Alert } from "@mui/material";
import QRCode from "qrcode.react";

const App: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [openQRModal, setOpenQRModal] = useState(false);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setOpenModal(true); // Open modal to choose quantity
  };

  const handleConfirmAddToCart = () => {
    const productWithQuantity = { ...selectedProduct, quantity };
    setCart([...cart, productWithQuantity]);
    setOpenModal(false); // Close modal after adding to cart
    setOpenSnackbar(true); // Show success snackbar
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCheckout = () => {
    setOpenConfirmPopup(true); // Open the confirmation popup
  };

  const handleConfirmPayment = () => {
    setOpenConfirmPopup(false); // Close the confirmation popup
    setOpenQRModal(true); // Open the QR code modal
  };

  const getUPIPaymentString = (total: number) => {
    const upiID = "6299695907-2@ybl"; // Developer's UPI ID
    return `upi://pay?pa=${upiID}&pn=Developer&am=${total}&cu=INR`;
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <ProductList onAddToCart={handleAddToCart} />
      <Cart cartItems={cart} onCheckout={handleCheckout} />

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item successfully added to cart!
        </Alert>
      </Snackbar>

      {/* Modal for selecting quantity */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Select Quantity
          </Typography>
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleConfirmAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Modal>

      {/* Confirmation Popup (Before QR code) */}
      <Modal open={openConfirmPopup} onClose={() => setOpenConfirmPopup(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Confirm Payment
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Total Amount: ₹{total}
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmPayment}
            >
              Yes, Confirm
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenConfirmPopup(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for QR Code */}
      <Modal open={openQRModal} onClose={() => setOpenQRModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Scan to Pay ₹{total}
          </Typography>
          <QRCode value={getUPIPaymentString(total)} size={256} />
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setOpenQRModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
