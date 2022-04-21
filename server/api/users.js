const router = require("express").Router();
const { User, Cart, Product, orderProduct } = require("../db");
module.exports = router;

//get cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {exclude: ['password']},
      include: [
        {
        model: Cart,
        where: {status: 'pending'},
        include:[{
          model: orderProduct,
          include: Product
        }]
        }
      ]
    });
    if(!user.cart.length){
     user.cart = await Cart.create({
       userId: user.id,
       status: 'pending'
      })
    }
    let cart = user.cart
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
      attributes: {exclude: ['password']},
      include: [{
        model: Cart,
        where: {status: 'pending'},
        include:[{
          model: orderProduct,
          include: Product
        }]
      }]
    });
    if(!user.cart.orderProduct[req.body.productId]){
      user.cart = await orderProduct.create({
        cartId: user.cart.cartId,
        quantity: req.body.quantity
      })
    }
    else {
      user.cart.orderProduct[req.body.productId] = {
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
      attributes: ["id", "username"],
      include: [
        {
        model: Cart,
        where: {status: 'pending'},
        include:[{
          model: orderProduct,
          where: {productId: req.body.productId},
          include: Product
        }]
        }
      ]
    });
    if(!user.cart.orderProduct[req.body.productId]){
      res.status(404).send('Item not in cart')
    }
    user.cart.orderProduct.destroy()
    res.status(200)
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

