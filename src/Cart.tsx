import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface CartProps {
  cartItems: any[];
  onCheckout: () => void; // New prop to trigger checkout
}

const Cart: React.FC<CartProps> = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Typography variant="h4" sx={{ margin: "20px" }}>
        Cart
      </Typography>
      {cartItems.map((item, index) => (
        <Card key={index} sx={{ width: 300, padding: "20px", margin: "10px" }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">Price: ₹{item.price}</Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h5" sx={{ margin: "20px" }}>
        Total: ₹{total}
      </Typography>
      <Button variant="contained" color="success" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
