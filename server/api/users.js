const router = require("express").Router();
const { User, ShoppingCart, Product, OrderProducts } = require("../db");
module.exports = router;

//get cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {exclude: 'password'},
      include:
        {
        model: ShoppingCart,
        where: {orderFilled: 'false'},
        include:
          Product
        }
    });
    console.log(user)
    if(!user.carts.length){
     user.carts = await ShoppingCart.create({
       userId: user.id,
      })
    }
    let cart = user.carts[0]
    res.send(cart);
    //we want to return an array of items for the cart page, OR we can return the whole user.
  } catch (err) {
    next(err);
  }
});

//add to cart, needs a userId, quantity, and productId
router.put("/:id/cart/add", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {exclude: 'password'},
      include:
        {
        model: ShoppingCart,
        where: {orderFilled: 'false'},
        include: [{
          model: Product,
          where: {id: req.body.id}
        }]
    }});
    if(!user.carts.products.length){
      user.carts = await OrderProducts.create({
        cartId: user.carts.cartId,
        productId: req.body.productId,
        quantity: req.body.quantity
      })
    }
    else {
      user.carts.products[req.body.productId] = {
        quantity: this.quantity + req.body.quantity}
    }
  const cart = user.cart
  res.send(cart)
  }
  catch (err) {
    next(err);
  }
})


//remove item
router.delete("/:id/cart/remove"), async (req,res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {exclude: 'password'},
      include:
        {
        model: ShoppingCart,
        where: {orderFilled: 'false'},
        include:
          Product
        }
    });
    if(!user.carts.orderProduct[req.body.productId]){
      res.status(404).send('Item not in cart')
    }
    let removed = await user.cart.orderProduct.destroy()
    res.send(removed)
    }
  catch (err) {
    next(err);
  }
}


router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just

      // send everything to anyone who asks!

      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

