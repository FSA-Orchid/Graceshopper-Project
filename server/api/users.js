const router = require('express').Router();
const { User, ShoppingCart, Product, OrderProducts } = require('../db');
module.exports = router;

//get cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: 'password' },
      include: {
        model: ShoppingCart,
        where: { orderFilled: 'false' },
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

router.post('/:id/cart/add', async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody');
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: false,
      },
      include: Product,
    });
    if (!cart) {
      cart = await ShoppingCart.create({
        userId: req.params.id,
      });
    }
    //This finds and gives a cart with only the value pending

    let newOrder = await OrderProducts.create({
      cartId: cart.id,
      productId: req.body.productId,
      inventory: 1 * req.body.inventory,
      totalPrice: 1 * req.body.inventory * req.body.price,
    });
    console.log(newOrder);
    console.log(cart.products);

    res.send(cart.products[cart.products.length - 1]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/cart/update', async (req, res, next) => {
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
    await order.set({
      inventory: 1 * req.body.inventory,
      totalPrice: cart.products[0].price * req.body.inventory,
    });
    //item inventory gets updated
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//remove item from cart
router.delete('/:id/cart/remove', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: 'password' },
      include: {
        model: ShoppingCart,
        where: { orderFilled: 'false' },
        include: [
          {
            model: Product,
            where: { id: req.body.id },
          },
        ],
      },
    });
    let cart = user.carts[0].products[0].orderProduct;
    if (!cart) {
      res.status(404).send('Item not in cart');
    }

    await cart.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//this route will delete the entire cart, but only for carts that are pending
router.delete('/:id/cart/clear', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: 'password' },
      include: {
        model: ShoppingCart,
        where: { orderFilled: 'false' },
      },
    });
    let cart = user.carts[0];
    if (!cart) {
      res.status(404).send('Item not in cart');
    }

    await cart.destroy();
    await ShoppingCart.create({
      userId: req.params.id,
    })
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//this route will set the cart to being an archive of the order and will change quantites
router.put('/:id/cart/complete', async (req, res, next) => {
  try {
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: 'false',
      },
      include: Product,
    });
    if (!cart) {
      res.status(404).send('There is no order to fulfill');
    }

    //closes the order
    let finalCart = await cart.set({
      orderFilled: 'true',
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
    })
    //just to make sure it saves, will check if redundant

    res.send(finalCart);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just

      // send everything to anyone who asks!

      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
