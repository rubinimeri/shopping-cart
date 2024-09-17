import { useState } from "react";
import styles from "./Shop.module.css";
import { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useOutletContext } from "react-router-dom";

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (r.status >= 400) {
          throw new Error("server error");
        }
        return r.json();
      })
      .then((r) => {
        setProducts(r.map(item => ({...item, quantity:0})))
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

function Shop() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("men's clothing");
  const { state, dispatch } = useOutletContext();

  function handleAddToCart(e) {
    e.preventDefault();
    const { id } = e.target.closest('a');
    const newProduct = products.find(product => product.id == id)

    if(!state.cart.some(product => product.id === newProduct.id))
      dispatch({
        type: "added_to_cart",
        newProduct
      })
  }

  function handleCategoryChange(e) {
    setCategory(e.target.textContent.toLowerCase());
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <main className={styles.main}>
      <div className={styles.reviews}>
        <div>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <p className={styles.review}>4.77 / 5 BASED ON 1902 REVIEWS</p>
      </div>
      <div className={styles.titleContainer}>
        <h1>{category.toUpperCase()}</h1>
        <h2>DOLOR SIT AMET</h2>
      </div>
      <ul className={styles.categories}>
        <li
          onClick={handleCategoryChange}
          className={category === "men's clothing" ? styles.active : ""}
        >
          MEN{"'"}S CLOTHING
        </li>
        <li
          onClick={handleCategoryChange}
          className={category === "women's clothing" ? styles.active : ""}
        >
          WOMEN{"'"}S CLOTHING
        </li>
        <li
          onClick={handleCategoryChange}
          className={category === "electronics" ? styles.active : ""}
        >
          ELECTRONICS
        </li>
        <li
          onClick={handleCategoryChange}
          className={category === "jewelery" ? styles.active : ""}
        >
          JEWELERY
        </li>
        <li
          onClick={handleCategoryChange}
          className={category === "see all" ? styles.active : ""}
        >
          SEE ALL
        </li>
      </ul>
      <div className={styles.productList}>
        {category !== "see all" ?
          products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductCard
              key={product.id}
              handleAddToCart={handleAddToCart}
              {...product}
              />
            )) :
          products
            .map((product) => (
              <ProductCard
              key={product.id}
              handleAddToCart={handleAddToCart}
              {...product}
              />
            ))}
      </div>
    </main>
  );
}

export default Shop;
