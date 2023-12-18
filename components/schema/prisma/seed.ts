import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.product.count({ take: 10 })

  if (!count) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Earthen Bottle',
          image:
            'https://ikiru.in/cdn/shop/files/1_Bottle_Glass_938x823.webp?v=1697199976',
          price: 8.28,
          quantity: 30,
          introduction:
            'The Earthen Bottle are unique and eco-friendly alternatives to plastic water bottles. Made from natural clay, these bottles offer a range of benefits that make them a popular choice for those who prioritize health, sustainability, and style.',
          descriptions: [
            'One of the key benefits of earthen clay water bottles is that they keep water naturally cool. Mitti cool water bottles are especially popular in India, where they are used to keep water cool even in the hottest temperatures.',
            'In addition to their cooling properties, terracotta clay water bottles are also durable and long-lasting. They are resistant to cracks, scratches, and chipping, making them a great investment for those looking for a water bottle that will last for years.',
            'Overall, the Earthen Bottle are great choices for those who want to reduce their plastic consumption and enjoy the benefits of natural and eco-friendly products. With their unique design, durability, and health benefits, they are sure to become a favorite for those who value sustainability and style.',
          ],
          highlights: [
            'Handcrafted',
            'Sustainable',
            'Food Safe',
            'Reviving traditions',
            'Nutrition value',
          ],
          remainQuantity: 30,
        },
        {
          name: 'Nomad Tumbler',
          image:
            'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
          price: 20,
          quantity: 40,
          introduction:
            'The Nomad Tumbler is an essential item for the adventurer at heart. Crafted with precision with a keen awareness of the needs of those continuously on the move, this tumbler is designed to keep your beverages at the ideal temperature, whether hot or cold.',
          descriptions: [
            "Cradled in the comfort of sturdy stainless steel, this high-quality tumbler is marked by its exquisite durability, a companion that's built to accompany you on every journey. It sports a double-walled insulation system that ensures your drinks stay warm or cold for hours. Coffee lovers can savor their hot caffeine fix throughout the morning, while those partial to a refreshing cold drink in the afternoon won't be disappointed either.",
            'Space has been maximized in the design of the Nomad Tumbler to ensure it can carry an ample amount of your favorite drinks. However, not for a second has the sleek aesthetics been compromised by the practical design. It is a joy to hold, a combination of commanding presence and surprising lightness that fits securely in the grip of your hand.',
            'The Nomad Tumbler is known not only for its attractive design but also for its functionality. It is equipped with a spill-proof lid, a feature highly appreciated by those who spend a lot of time on the road. The construction of the tumbler guarantees easy cleaning, and the material used provides resistance to odor and taste residue. These features allow the Nomad Tumbler to keep your beverages pure and refreshing.',
            "In the world of tumblers, the Nomad stands out as an adventurer's trusty companion. Whether you're heading for a leisurely day outdoors or an intense hike in the wilderness, the Nomad Tumbler is a reliable choice to keep your favorite beverages at their prime. Pack it in your bag, keep it on your office desk or use it in your daily commute – the Nomad Tumbler is made for all situations, experiences, and journeys.",
            "Care Instructions and Disclaimer: Firstly terracotta is porous in nature so it's alkaline. You should avoid using salt. The best thing to use is baking soda, water, or white vinegar. Personally recommend only using baking soda don't use Bluebird baking soda, use local baking soda in small packets. Put water in a big bucket, and take 2-3 fist full of soda and rub the product with it also put baking soda in the bucket and soak the product in the bucket overnight, next day ask her/him to remove it and let it dry completely it should become back to normal.",
          ],
          highlights: [
            'High-quality and Durable: Constructed with sturdy stainless steel, ensuring its capability to withstand the rigors of daily use and outdoor adventures.',
            'Double-walled Insulation: This feature keeps beverages at their ideal temperature, hot or cold, for extended periods.',
            'Spacious Design: Packs ample space for your favorite drinks without compromising its sleek aesthetics.',
            'Lightweight: Despite its sturdy build, it is lightweight and comfortable to hold, offering an easy grip.',
            'Spill-proof Lid: Minimizes the risk of unwanted spills, particularly useful for those on the move.',
            'Easy to Clean: Promotes hygiene and freshness as the build and material prevent odor and taste residue.',
            'Versatile: The Nomad Tumbler is attractive and practical, ideal for outdoor trips, office locations, or everyday commuting.',
          ],
          remainQuantity: 40,
        },
        {
          name: 'Focus Paper Refill',
          image:
            'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
          price: 9,
          quantity: 100,
          introduction:
            'Refill your existing drafters tablet with this elegant, guided pad. Classically designed and the ideal size for your notetaking needs. Best of all, if you reach 100 pages of daily notes, creative thoughts, or doodles, simply refill again and again for a well-organized life. Refill will fit in both gold and black backers, as well as our new acrylic backer.',
          descriptions: [],
          highlights: [
            'This noire drafters tablet notepad refill features 100 perforated guided pages',
            'Perfectly sized for your desktop at 6 - 3/8" x 8 - 7/8"',
            'The paper pad refill can be used on its own or beautifully complement your existing drafters tablet',
            'Ideal for scheduling, to-do lists, grocery lists, and daily note taking',
          ],
          remainQuantity: 100,
        },
        {
          name: 'Wingback Mechanical Pencil',
          image:
            'https://images.squarespace-cdn.com/content/v1/5349ba13e4b095a3fb0ba65c/56fd3696-c029-4db2-8e7e-5802789ec489/Wingback-Mechanical-Pencil-Knurling.jpeg?format=1500w',
          price: 9,
          quantity: 125,
          introduction:
            'The Wingback Mechanical Pencil is engineered to write as far as your journey takes you. With a wide 10mm (3/8 inch) diameter and diamond knurled grip, it sits comfortably in the hand to reduce writing fatigue, while the satisfying weight of its materials encourages more time to be taken with every stroke. A retractable lead sleeve protects the graphite and eliminates nib wobble, and a bespoke internal mechanism holds up to 2.4m of lead. It should keep you writing, sketching, drawing and designing as long as your creativity lasts. Every pencil can be personalised with a laser engraved inscription of up to 50 characters along the length of the barrel.',
          descriptions: [
            'From design and materials to manufacture and packaging, we don’t cut corners. Our aerospace grade metal is sourced from Europe, machine turned by our manufacturing partners in Birmingham, then laser engraved, assembled and packaged in London. Everything can be personalised and made to order. It takes time, but so does anything worth holding onto.',
            'Brass will age as its surface oxidises and interacts with natural oils in your skin. Like our leather hides, it will develop a rich patina, becoming more unique over time, yet can be polished back to its original lustre. By contrast, stainless steel is harder and more corrosion resistant, meaning it won’t require additional care to keep it looking like new.',
          ],
          highlights: [
            'An all-metal mechanical pencil engineered to fit 10x more lead',
            'Balanced weight and wide diameter for improved grip and comfort',
            'Retractable lead sleeve protects graphite and eliminates nib wobble',
            'Fits  1.4m of 0.9mm, 2.4m of 0.7mm or 4.8m of 0.5mm diameter lead (40 refills)',
            'Add personalisation of up to 50 characters, engraved along the barrel',
            'Engineered in England from aerospace-grade brass',
            'Bespoke mechanism built by specialist manufacturer in Iwaki, Japan',
            'Delivered in a bespoke cotton sleeve and with a pack of 30 lead refills',
            'Available in our other metals',
            'Backed by our guarantee - Try for 30 days. Keep for 30 years.',
          ],
          remainQuantity: 125,
        },
      ],
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
