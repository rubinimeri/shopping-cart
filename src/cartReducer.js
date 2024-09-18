export default function cartReducer(state, action) {
    switch (action.type) {
      case "added_to_cart": {
        return {
          cart: [
            ...state.cart, 
            { 
              ...action.newProduct,
              quantity: 1
            }
          ]
        }
      }
      case "changed_product_quantity": {
        return {
          cart: 
           state.cart
           .map(product => {
             if(product.id == action.productId) {
              product.quantity = action.quantity;
              return product;
             } else {
              return product;
             }
           })
        }
      }
      case "added_to_quantity": {
        return {
          cart: 
          state.cart
          .map(product => {
            if(product.id == action.productId) {
             product.quantity += action.quantity;
             return product;
            } else {
             return product;
            }
          })
        }
      }
      case "incremented_product_quantity": {
        return {
          cart: 
           state.cart
           .map(product => {
             if(product.id == action.productId) {
              product.quantity += 1;
              return product;
             } else {
              return product;
             }
           })
        }
      }
      case "decremented_product_quantity": {
        return {
          cart: 
           state.cart
           .map(product => {
             if(product.id == action.productId) {
              product.quantity -= 1;
              return product;
             } else {
              return product;
             }
           })
        }
      }
      case "deleted_product": {
        return {
          cart: state.cart.filter(product => product.id !== action.productId)
        }
      }
      default: {
        throw new Error('Invalid dispatch: ' + action.type);
      }
    }
  }