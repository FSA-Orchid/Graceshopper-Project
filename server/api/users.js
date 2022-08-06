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

router.put("/notLogged", async (req, res, next) => {
  try {
    console.log(req.body, "BODY HERE");
    let exists = await User.findOne({
      where: { email: req.body.email },
    });

    if (exists) {
      res
        .status(401)
        .send(
          "Email is already registered to an account, please login to continue checkout"
        );
      return;
    } else {
      let newCart = await ShoppingCart.create({
        userEmail: req.body.email,
        orderFilled: true,
      });
      res.send(newCart);
    }
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

//this route will set the cart to being an archive of the order and will change quantites
router.put("/:id/cart/complete", async (req, res, next) => {
  try {
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: "false",
      },
      include: Product,
    });
    if (!cart) {
      res.status(404).send("There is no order to fulfill");
    }

    //closes the order
    let finalCart = await cart.set({
      orderFilled: "true",
    });

    //item inventory gets updated

    finalCart.products.map(async (product) => {
      await product.set({
        inventory: product.inventory - product.orderProduct.inventory,
      });
      await product.save();
    });
    await finalCart.save();
    await ShoppingCart.create({
      userId: req.params.id,
    });
    //just to make sure it saves, will check if redundant

    res.send(finalCart);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just

      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "address", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/payment", async (req, res, next) => {
  try {
    const payments = await PaymentInfo.findAll({
      where: { userId: req.params.id },
      attributes: {exclude: ["cardNumber"]},
    });
    res.send(payments);
  } catch (err) {
    next(err);
  }
});

//post routes for payment and shipping information
router.post("/:id/payment", async (req, res, next) => {
  try {
    let body = req.body
    const payment = await PaymentInfo.create({
      name: body.name,
      state: body.state,
      city: body.city,
      zipCode: 1*body.zipCode,
      apartmentNumber: body.apartmentNumber,
      streetAddress: body.streetAddress,
      userId: req.params.id,
      cardNumber: body.cardNumber,
      securityCode: body.securityCode,
      expirationDate: body.expirationDate,
      cardType: body.cardType,
    });
    res.send(payment);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/shipping", async (req, res, next) => {
  try {
    const shipments = await ShippingAddress.findAll({
      where: { userId: req.params.id },
    });
    res.send(shipments);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/shipping", async (req, res, next) => {
  try {
    let body = req.body
    console.log(req.body)
    const shipping = await ShippingAddress.create({
      firstName: body.firstName,
      lastName: body.lastName,
      state: body.state,
      email: body.email,
      city: body.city,
      zipCode: 1*body.zipCode,
      apartmentNumber: body.apartmentNumber,
      streetAddress: body.streetAddress,
      userId: req.params.id,
    });

    res.send(shipping);
  } catch (err) {
    next(err);
  }
});

//In reality will remove the address from user
router.put("/shippingUp", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.findOne({
      where: { id: req.body.shipping.id },
    });
    shipping.update(req.body.shipping);
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});

//will remove payment info from user
router.put("/paymentUp", async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne({
      where: { id: req.body.payment.id },
    });
    payment.update(req.body.payment);
    res.send(payment);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/shipping", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.findOne({
      where: { id: req.body.shipping.id, userId: req.params.id },
    });
    shipping.update({ userId: null });
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/payment", async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne({
      where: { id: req.body.payment.id, userId: req.params.id },
    });
    payment.update({ payment: null });
    res.send(payment);
  } catch (err) {
    next(err);
  }
});

router.put("/notLoggedShipping", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.create(req.body.shipping)
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});

//will remove payment info from user
router.put("/paymentUp", async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne({
      where: { id: req.body.payment.id },
    });
    payment.update(req.body.payment);
    res.send(payment);
  } catch (err) {
    next(err);
  }
});



router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "username", "email", "address", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
    });

    await users.update(req.body);
    res.json(users);
  } catch (err) {
    next(err);
  }
});
