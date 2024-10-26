import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const products = [
  { id: 1, name: "Product 1", price: 10 }, // Price in INR
  { id: 2, name: "Product 2", price: 20 }, // Price in INR
  { id: 3, name: "Product 3", price: 30 }, // Price in INR
];

interface ProductListProps {
  onAddToCart: (product: any) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "20px",
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{ width: 300, padding: "20px", margin: "10px" }}
        >
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body2">
              Price: ₹{product.price}
            </Typography>{" "}
            {/* Updated to INR */}
          </CardContent>
          <Button variant="outlined" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
