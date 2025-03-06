import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
