// provide a button and use onClick to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart.
// list out the Cart items in another column
function ShoppingCart({availableItems}) {
  const { Button } = ReactBootstrap;

  const [stock, setStock] = React.useState(availableItems);
  const [cart, setCart] = React.useState([]);


  const moveToCart = (e) => {
      // create product and numInStock variables
      let [product, numInStock] = e.target.innerHTML.split(":")
      console.log([product, numInStock])

      // Determine if numInStock is greater than 0. If not, find the product that was clicked and update its numInStock
      if (Number(numInStock) > 0) {
          let item = stock.filter((i) => i.product === product)[0]
          let remStock = stock.filter((i) => i.product !== product)
          item.inStock -= 1

          // Update the stock state to include the new stock
          setStock([...remStock, item])
          // console.log(item, stock)

          // Update cart
          let cartItem = cart.filter((i) => i.product === item.product)[0]
          let remCart = cart.filter((i) => i.product !== item.product)

          if (!cartItem) {
              // add the item to the cart if not present
              cartItem = {product: item.product, inCart: 1}
          }
          else {
              cartItem.inCart += 1
          }
          // Update the cart state to include the updated item
          setCart([...remCart, cartItem])
          // console.log(cartItem, cart)
      }

      else return

  }

  function Cart({ cartitems }) {
      const { Button } = ReactBootstrap;

      console.log('rendering Cart');

      // function to remove from cart
      const removeFromCart = (e) => {
          let [product, numInCart] = e.target.innerHTML.split(":");

          if (Number(numInCart) > 0) {
              console.log("decrementing item in cart: ", product, numInCart);
              numInCart -= 1;

              let temp;

              // update cart
              cart.map((item, index) => {
                  if (item.product === product) {
                      item.inCart = numInCart;

                      if (Number(item.inCart) === 0) {
                          // if the cart is emptied of this item, remove it
                          console.log("deleting item from cart: ", product, numInCart);
                          temp = cart.filter((i) => i.product !== product);
                      }
                  }
              });

              if (temp) {setCart([...temp])} else {setCart([...cart])}

              // update stock
              stock.map((item, index) => {
                  if (item.product === product) {
                      item.inStock += 1;
                  }
              });
              setStock([...stock]);

          }
      };

      const availableItemsButtons = cartitems.map((item, index) => {
        return (
          <Button id={item.product} key={index} onClick={removeFromCart}>
            {item.product}:{item.inCart}
          </Button>
        );
      });

      return (
        <ul id="cart-items" style={{ listStyleType: 'none' }} key="cart">
          {availableItemsButtons}
        </ul>
      );
    }

  // No need to update code beyond this point
  const availableItemsButtons = availableItems.map((item, index) => {
    return (
      <Button id={item.product} key={index} onClick={moveToCart}>
        {item.product}:{item.inStock}
      </Button>
    );
  });

  // Note: React requires a single Parent element, that's why we use <>
  return (
    <>
      <ul key="stock" style={{ listStyleType: 'none' }}>
        {availableItemsButtons}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

// create state for stock and cart using React.useState
const availableItems = [
    {product: 'Jacket', inStock: 2},
    {product: 'Pants', inStock: 3},
    {product: 'Scarf', inStock: 0},
    {product: 'Pajamas', inStock: 3},
    {product: 'Shirt', inStock: 1},
];


ReactDOM.render(<ShoppingCart availableItems={availableItems}/>, document.getElementById('root'));

