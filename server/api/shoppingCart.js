const router = require("express").Router();
const { User, ShoppingCart, Product, OrderProducts } = require("../db");



router.get("/:id", async (req, res, next) => {
  try {
    const user = await ShoppingCart.findOne({
        model: ShoppingCart,
        where: {
          orderFilled: 'true',
          userId: req.params.id
        },
        include:
          Product
    });

    if(!user){
     res.status(404).send('No Order History Found')
    }
    else {
    let cart = user.carts
    res.send(cart);
    }
    //we want to return an array of items for the cart page, OR we can return the whole user.
  } catch (err) {
    next(err);
  }
});

module.exports = router;
