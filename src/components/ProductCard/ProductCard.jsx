import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";
import { useState } from "react";
import Button from "../Button/Button";

function ProductCard({ image, price, title, description, id, handleAddToCart}) {
  const [added, setAdded] = useState(false);

  function handleClick(e) {
    setAdded(true);
    handleAddToCart(e);
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <Link 
    id={id} 
    className={styles.productLink} 
    to={`/product/${id}`}>
      <div>
        <h3 className={styles.title}>{title.toUpperCase()}</h3>
      </div>
      <img src={image} alt={description} className={styles.image} />
      <div className={styles.buttonContainer}>
        {added ? 
          <button className={styles.added}>✓</button> :
          <Button handleClick={handleClick}>
            ADD - {price}$
          </Button>}
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  image: PropTypes.PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  handleAddToCart: PropTypes.func
};

export default ProductCard;
