const LocalCart = () => {
  let [cart, setCart] = useState([]);

  let localCart = localStorage.getItem("cart");

  const addItem = (item) => {
    let cartCopy = [...cart];
    let { id } = item;

    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);
    if (existingItem) {
      existingItem.quantity += item.inventory;
    } else {
      cartCopy.push(item);
    }
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };
  const updateItem = (itemID, amount) => {
    let cartCopy = [...cart];
    let existentItem = cartCopy.find((item) => item.id == itemID);
    if (!existentItem) return;

    existentItem.inventory += amount;

    if (existentItem.inventory <= 0) {
      cartCopy = cartCopy.filter((item) => item.id != itemID);
    }
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };
  const removeItem = (itemID) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.ID != itemID);
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };
  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
  }, []);

  return <div></div>;
};
