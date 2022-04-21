"use strict";
const { db, User, Product, ShoppingCart } = require("../server/db");
const products = [
  {
    instrument: "Guitar",
    make: "Fender",
    model: "Stratocaster",
    year: "1997",
    color: "olympic white",
    condition: "new",
    description: "Jimmi Hendrix Costume Model",
    price: 59900,
    inventory: 9,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    model: "Stratocaster",
    year: "1997",
    color: "olympic white",
    condition: "new",
    description: "Jimmi Hendrix Costume Model",
    price: 39900,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Squire",
    model: "Telecaster",
    year: "2008",
    color: "sun burst",
    condition: "new",
    description: "nashville tweeter",
    price: 79900,
    inventory: 6,
  },
  {
    instrument: "Guitar",
    make: "Gibson",
    model: "Les Paul",
    year: "1966",
    color: "sun burst",
    condition: "new",
    description: "chug chug",
    price: 69900,
    inventory: 8,
  },
  {
    instrument: "Bass",
    make: "Fender",
    model: "JazzMaster",
    year: "2002",
    color: "white",
    condition: "new",
    description: "smooth jazz",
    price: 49900,
    inventory: 2,
  },
];
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
  {
    username: "cody",
    password: "123",
    email: "cody@coder.com",
    address: "9430 Grace Hopper Ln",
  },
  {
    username: "murphy",
    password: "123",
    email: "murphy@coder.com",
    address: "134 Fullstack Ave",
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
  await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );
  console.log(`seeded ${users.length} users`);
}

//Creating Pruducts

console.log(`seeded ${products.length} users`);
console.log(`seeded successfully`);

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
