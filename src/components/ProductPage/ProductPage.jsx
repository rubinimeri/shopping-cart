import styles from "./ProductPage.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

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
  const {state, dispatch} = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  function handleQuantityChange(e) {
    const { value } = e.target;
    setQuantity(isNaN(parseInt(value)) ? '' : parseInt(value))
  }

  function handleAddToCart() {
    if(!state.cart.some(product => product.id == productId)) {
      dispatch({
        type: "added_to_cart",
        newProduct: product
      })
      dispatch({
        type: "added_to_quantity",
        productId,
        quantity: quantity-1
      })
    }
    else
      dispatch({
        type: "added_to_quantity",
        productId,
        quantity
      })
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
          {product.price}<strong>$</strong>
        </h2>
        <p>{product.description.toUpperCase()}</p>
        <div className={styles.add}>
          <div className={styles.container}>
            <QuantitySelector
             handleIncrement={() => setQuantity(quantity + 1)}
             handleChange={handleQuantityChange}
             handleDecrement={() => setQuantity(quantity - 1 !== 0 ? quantity - 1 : quantity)}
             width="100px"
            >
              {quantity}
            </QuantitySelector>
          </div>
          <Button
           isDisabled={isNaN(quantity) || quantity == 0}
           handleClick={handleAddToCart} >
            ADD
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
