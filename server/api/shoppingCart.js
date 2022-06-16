const router = require("express").Router();
const { User, ShoppingCart, Product, OrderProducts } = require("../db");



router.get("/:id", async (req, res, next) => {
  try {
    const order = await ShoppingCart.findAll({
        model: ShoppingCart,
        where: {
          orderFilled: 'true',
          userId: req.params.id
        },
        include:
          Product
    });

    if(!order){
     res.status(404).send('No Order History Found')
    }
    else {
    res.send(order);
    }
    //we want to return an array of items for the cart page, OR we can return the whole user.
  } catch (err) {
    next(err);
  }
});


//This router will create a filled cart and products within the cart, so when a person sign's up, they will inherit the orders done with their email
router.post("/notLogged/:cartid", async (req,res,next) => {
  try{
    await OrderProducts.create({
      cartId: req.params.cartid,
      productId: 1 * req.body.productId,
      inventory: 1 * req.body.inventory,
      totalPrice: 1 * req.body.inventory * req.body.price,
    })

    res.send('Success')
  }
  catch(err) {
    next(err)
  }
})
module.exports = router;
