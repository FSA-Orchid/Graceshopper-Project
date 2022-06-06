"use strict";
const { db, User, Product, ShoppingCart } = require("../server/db");
const products = [
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl: "https://m.media-amazon.com/images/I/61Jtkzywa3L._AC_SL1500_.jpg",
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
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/fender-electric-guitars-solid-body-fender-american-standard-stratocaster-olympic-white-2015-lefty-u3689248302-29000411775111_2000x.jpg?v=1650195127",
    model: "Stratocaster",
    year: "2002",
    color: "olympic white",
    condition: "new",
    description: "standard",
    price: 39900,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://media.guitarcenter.com/is/image/MMGS7/L21517000001000-00-1600x1600.jpg",
    model: "Telecaster HH",
    year: "1997",
    color: "Maple/Tidepool",
    condition: "new",
    description: "Player Series",
    price: 200000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://images.reverb.com/image/upload/s--GJvbHdzw--/f_auto,t_supersize/v1557177432/o1atratrutsts71r1jeq.jpg",
    model: "Stratocaster American Standard",
    year: "2021",
    color: "Sun Burst",
    condition: "new",
    description: "Pro Series",
    price: 220000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0110160804_gtr_frt_001_rr.jpg",
    model: "Jaguar",
    year: "1960",
    color: "Sky Blue",
    condition: "new",
    description: "Standard",
    price: 199000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0115510372_gtr_frt_001_rr.jpg",
    model: "Mustang",
    year: "2022",
    color: "Sonic Blue",
    condition: "new",
    description: "American Performer Model",
    price: 139999,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0144012589_gtr_frt_001_rr.jpg",
    model: "Duo-Sonic",
    year: "2020",
    color: "Maple",
    condition: "new",
    description: "Player Series",
    price: 79999,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender",
    imageUrl:
      "https://www.fmicassets.com/Damroot/FacebookJpg/10001/0147352391_fen_ins_frt_1_rr.jpg",
    model: "Meteora",
    year: "2019",
    color: "Silverburst",
    condition: "new",
    description: "Player Series",
    price: 39900,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://media.guitarcenter.com/is/image/MMGS7/L21517000001000-00-1600x1600.jpg",
    model: "Telecaster HH",
    year: "1997",
    color: "Maple/Tidepool",
    condition: "new",
    description: "Player Series",
    price: 200000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://images.reverb.com/image/upload/s--GJvbHdzw--/f_auto,t_supersize/v1557177432/o1atratrutsts71r1jeq.jpg",
    model: "Stratocaster American Standard",
    year: "2021",
    color: "Sun Burst",
    condition: "new",
    description: "Pro Series",
    price: 220000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0110160804_gtr_frt_001_rr.jpg",
    model: "Jaguar",
    year: "1960",
    color: "Sky Blue",
    condition: "new",
    description: "Standard",
    price: 199000,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0115510372_gtr_frt_001_rr.jpg",
    model: "Mustang",
    year: "2022",
    color: "Sonic Blue",
    condition: "new",
    description: "American Performer Model",
    price: 139999,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0144012589_gtr_frt_001_rr.jpg",
    model: "Duo-Sonic",
    year: "2020",
    color: "Maple",
    condition: "new",
    description: "Player Series",
    price: 79999,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Fender Squire",
    imageUrl:
      "https://www.fmicassets.com/Damroot/FacebookJpg/10001/0147352391_fen_ins_frt_1_rr.jpg",
    model: "Meteora",
    year: "2019",
    color: "Silverburst",
    condition: "new",
    description: "Player Series",
    price: 39900,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Gibson",
    imageUrl:
      "https://img.kytary.com/eshop_ie/velky_v2/na/637297321233000000/6c8083f5/64762182/epiphone-les-paul-custom-alpine-white-opened.jpg",
    model: "Les Paul Custom",
    year: "2022",
    color: "Alpine White",
    condition: "new",
    description: "50's model",
    price: 39900,
    inventory: 5,
  },
  {
    instrument: "Guitar",
    make: "Gibson",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIH60MPq3r0vYvd4tsxGq1Bsx9Rgh3FJ2S66F276_vCl8rz5tdZ8uhsOOIkmF3eI1GaVs&usqp=CAU",
    model: "Les Paul Special",
    year: "1962",
    color: "olympic white",
    condition: "used",
    description: "All original build",
    price: 169900,
    inventory: 2,
  },
  {
    instrument: "Guitar",
    make: "Gibson",
    imageUrl:
      "https://media.sweetwater.com/api/i/q-85__ha-bc0d6e673cf98bd3__hmac-086f0879907df5ed9270843181abee1ba8846ff2/images/items/1800/EILS6ITNH-xlarge.jpg",
    model: "Les Paul Standard",
    year: "2009",
    color: "Sunburst",
    condition: "used",
    description: "60's model, original build",
    price: 55000,
    inventory: 4,
  },

  {
    instrument: "Guitar",
    make: "Gibson",
    imageUrl:
      "https://static.gibson.com/product-images/USA/USAI9Q269/Ebony/front-banner-1600_900.png",
    model: "Les Paul Classic",
    year: "1966",
    color: "black",
    condition: "used",
    description: "60's model",
    price: 200000,
    inventory: 8,
  },
  {
    instrument: "Bass",
    make: "Fender",
    imageUrl: "https://www.talkbass.com/attachments/sjmbt3ts1-jpg.1337123/",
    model: "JazzMaster",
    year: "2015",
    color: "white",
    condition: "used",
    description: "standard",
    price: 150000,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender",
    imageUrl:
      "https://www.samash.com/media/catalog/product/f/p/fplyrjbass-p_7.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=1200&width=1200&canvas=1200:1200",
    model: "Jazz",
    year: "2000",
    color: "cream",
    condition: "new",
    description: "standard",
    price: 499900,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender",
    imageUrl:
      "https://media.guitarcenter.com/is/image/MMGS7/L57533000001000-00-720x720.jpg",
    model: "Precision",
    year: "2022",
    color: "Turquise",
    condition: "new",
    description: "Limited Edition",
    price: 84999,
    inventory: 6,
  },
  {
    instrument: "Bass",
    make: "Music Man",
    imageUrl:
      "https://images.reverb.com/image/upload/s---gaaSqmD--/f_auto,t_large/v1605216177/egqica26tckb1avnykhf.png",
    model: "Stingray",
    year: "2011",
    color: "white",
    condition: "used",
    description: "standard",
    price: 499999,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Gibson",
    imageUrl:
      "https://images.gibson.com/Products/Electric-Guitars/Bass/USA/EB-12-Bass/Gallery-Images/BAEBSMCH1-Finish-Shot.jpg",
    model: "EB",
    year: "2020",
    color: "white",
    condition: "new",
    description: "standard",
    price: 280000,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Gibson",
    imageUrl:
      "https://images.gibson.com/Products/Electric-Guitars/2015/Thunderbird-Bass/BAT15VSBC1_MAIN_HERO_01.jpg",
    model: "Thunderbird",
    year: "2019",
    color: "white",
    condition: "new",
    description: "standard",
    price: 259999,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender",
    imageUrl: "https://m.media-amazon.com/images/I/61kM2s2l1dL._AC_SL1500_.jpg",
    model: "Mustang",
    year: "2020",
    color: "Surf Green",
    condition: "new",
    description: "standard",
    price: 69900,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender Squire",
    imageUrl: "https://m.media-amazon.com/images/I/61kM2s2l1dL._AC_SL1500_.jpg",
    model: "Mustang",
    year: "2020",
    color: "Surf Green",
    condition: "new",
    description: "standard",
    price: 49900,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender Squire",
    imageUrl: "https://www.talkbass.com/attachments/sjmbt3ts1-jpg.1337123/",
    model: "JazzMaster",
    year: "2015",
    color: "white",
    condition: "used",
    description: "standard",
    price: 95000,
    inventory: 2,
  },
  {
    instrument: "Bass",
    make: "Fender Squire",
    imageUrl:
      "https://media.guitarcenter.com/is/image/MMGS7/L57533000001000-00-720x720.jpg",
    model: "Precision",
    year: "2022",
    color: "Turquise",
    condition: "new",
    description: "Limited Edition",
    price: 64999,
    inventory: 6,
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
    isAdmin: true,
  },
  {
    username: "demo",
    password: "demo",
    email: "demoaccount@demo.com",
    address: "Demoland",
    isAdmin: false,
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
