const router = require("express").Router();

const {
  User,
  ShoppingCart,
  Product,
  OrderProducts,
  PaymentInfo,
  ShippingAddress,
} = require("../db");
module.exports = router;


//get cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "address"] },
      include: {
        model: ShoppingCart,
        where: { orderFilled: "false" },
        include: Product,
      },
    });
    if (!user) {
      let newCart = await ShoppingCart.create({
        userId: req.params.id,
      });
      res.send(newCart);
    } else {
      let cart = user.carts[0];
      res.send(cart.products);
    }
    //we want to return an array of items for the cart page, OR we can return the whole user.
  } catch (err) {
    next(err);
  }
});

//add to cart, needs a userId, inventory, and productId

router.post("/:id/cart/add", async (req, res, next) => {
  try {
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: false,
      },
      include: Product,
      separate: true,
    });
    if (!cart) {
      await ShoppingCart.create({
        userId: req.params.id,
      });
    }
    //This finds and gives a cart with only the value pending

    let newOrder = await OrderProducts.create({
      cartId: cart.id,
      productId: 1 * req.body.productId,
      inventory: 1 * req.body.inventory,
      totalPrice: 1 * req.body.inventory * req.body.price,
    });

    //slow as shit have to make it reload
    await cart.reload();
    res.send(cart.products);
  } catch (err) {
    next(err);
  }
});



router.put("/:id/cart/update", async (req, res, next) => {
  try {
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: false,
      },
      include: {
        model: Product,
        where: { id: req.body.productId },
      },
    });

    //This finds us the path to the relevant product, and its order information for the cart.
    //The path to what we want to change is below
    let order = cart.products[0].orderProduct;
    await order.update({
      inventory: 1 * req.body.inventory,
      totalPrice: cart.products[0].price * req.body.inventory,
    });

    //item inventory gets updated
    res.send(cart.products[0]);
  } catch (err) {
    next(err);
  }
});

//remove item from cart
router.delete("/:id/cart/:productId/remove", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: ShoppingCart,
        where: { orderFilled: "false" },
        include: [
          {
            model: Product,
            where: { id: req.params.productId },
          },
        ],
      },
    });
    let cart = user.carts[0].products[0].orderProduct;
    if (!cart) {
      res.status(404).send("Item not in cart");
    }

    await cart.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//this route will delete the entire cart, but only for carts that are pending
router.delete("/:id/cart/clear", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: ShoppingCart,
        where: { orderFilled: "false" },
      },
    });
    let cart = user.carts[0];
    if (!cart) {
      res.status(404).send("Item not in cart");
    }

    await cart.destroy();
    await ShoppingCart.create({
      userId: req.params.id,
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
