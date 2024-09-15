import styles from "./ProductPage.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((r) => {
        if (r.status >= 400) {
          throw new Error("server error");
        }
        return r.json();
      })
      .then((r) => setProduct(r))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};

function ProductPage() {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  function handleQuantityChange(e) {
    const { value } = e.target;
    setQuantity(parseInt(value));
  }

  function handleIncrementQuantity() {
    setQuantity(quantity + 1);
  }

  function handleDecrementQuantity() {
    setQuantity(quantity - 1 !== 0 ? quantity - 1 : quantity)
  }

  function handleAddToCart() {
    addToCart(productId, product, quantity)
  }


  return (
    <main className={styles.product}>
      <div className={styles.image}>
        <img
          className={styles.mainImg}
          src={product.image}
          alt={product.description}
        />
      </div>

      <div className={styles.info}>
        <h1>{product.title.toUpperCase()}</h1>
        <h2>
          {product.price}.00<strong>$</strong>
        </h2>
        <p>{product.description.toUpperCase()}</p>
        <div className={styles.add}>
          <div className={styles.container}>
            <button 
            disabled={quantity === 1 ? true : false}
            onClick={handleDecrementQuantity}>-</button>
            <input 
            type="tel" 
            value={quantity}
            onChange={handleQuantityChange}
            name="quantity" 
            id="quantity" />
            <button
            onClick={handleIncrementQuantity}>+</button>
          </div>
          <button
          onClick={handleAddToCart}>ADD</button>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
