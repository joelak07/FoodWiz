const menuItems = {
    'Idly,Sambar,Chutney': 17,
    'Vada,Sambar,Chutney': 22,
    'Pongal/KitchadiUpma': 32,
    'Poori Masala': 34,
    'Plain Dosa': 32,
    'Uthappam':32,
    'Masala Dosa': 36,
    'Podi Dosa':37,
    'Bread Toast': 5,
    'Ghee Roast': 50,
    'Masala Ghee Roast': 60,
    'Rava Dosa, Podi Dosa': 37,
    'Chole Bhatura': 55,
    'Aloo Paratha with Curd': 28,
    'Corn Flakes with cold/hot milk': 35,
    'Chocos with Cold/hot milk': 45,
    'Corn Cheese Dosa': 70,
    'Vada Paav': 32,
    'Egg Dosa': 37,
    'Chicken Kheema Dosa': 90,
    'Chicken Cheese Dosa': 70,
    'Chicken Curry Dosa': 90,
    'Scrambled Egg': 27,
    'Boiled Egg': 21,
    'Banana Roti': 27,
    'Bread Omelette': 27,
    'Masala Omelette': 27,
    'Cheese Omelette': 50,
    'Egg Masala': 55,
    'Fried Egg': 27,
    'Spanish Omelette': 35,
    'French Toast': 27,
    'Egg Burji': 27,
    'Full Boiled Egg': 21,
    'Plain Naan/Kulcha/Roti': 17,
    'Butter Naan/Kulcha/Roti': 23,
    'Phulka': 16,
    'Phulka Butter': 18,
    'Chapathi/Paratha + Curry': 35,
    'Veg Fried Rice/Noodles': 55,
    'Paneer Fried Rice/Noodles': 65,
    'Szechwan Veg Noodles/Rice': 65,
    'Mushroom Fried Rice/Noodles': 65,
    'Gobi 65 /Aloo 65': 43,
    'Paneer 65/Mushroom 65': 60,
    'Veg Manchurian': 67,
    'Gobi Manchurian/ Paneer Tikka': 67,
    'Paneer Manchurian': 72,
    'Chilly Gobi/Aloo Chilly': 60,
    'American Chopsy Veg': 85,
    'Veg Meals with curd': 55,
    'Plain Rice':30,
    'Curd': 12,
    'Veg Biryani/Spl. Fried Rice': 58,
    'Paneer plater': 65,
    'Kadai Veg': 60,
    'Paneer Chat pata': 72,
    'Paneer Butter Masala': 65,
    'Palak Paneer': 60,
    'Paneer Peas Masala': 60,
    'Green Peas Masala': 55,
    'Mixed Veg Curry': 55,
    'Gobi Masala': 55,
    'Aloo Gobì Masala': 60,
    'Aloo Capsicum Masala': 60,
    'Aloo Muttar/Aloo jeera': 50,
    'Samosa Channa Chat': 28,
    'Kachori Chat': 28,
    'Bread Channa Chat': 28,
    'Baby Corn 65': 43,
    'Egg Fried Rice/Noodles': 60,
    'Chicken Fried Rice/Noodles': 86,
    'Szechwan Chicken Fried Rice': 90,
    'Szechwan Chicken Noodles': 90,
    'Chicken 65/Chicken Tikka': 90,
    'Chicken Masala /Curry': 90,
    'Malai Chicken /Mughlal': 100,
    'Chicken Saagwala': 90,
    'Chicken Hydrabadi/gravy': 90,
    'Hariyali Chicken/Nilagiri': 90,
    'Reshmy/Harabara Kebab': 100,
    'Chicken Biryani with Egg': 100,
    'Hyderabadi Chicken Biriyani':110,
    'Malabar Chicken Biriyani':110,
    'Mugalai Chicken Biriyani':110,
    'Ambur Chicken Biriyani':110,
    'Egg Biryani': 80,
    'Mutton Biryani with Egg': 140,
    'Nattu kozhi Biryani + Egg': 140,
    'Chicken roganjosh': 95,
    'Chicken Kholapuri': 95,
    'Chicken Tikka masala': 95,
    'Chicken Tikka Lababdar': 95,
    'Malai Chicken Tikka Masala': 95,
    'Chicken Chetinad': 95,
    'Lollypop saucy':100,
    'Chicken Karakozhambu': 95,
    'Chicken Do Plazha': 95,
    'Chicken Makhani': 95,
    'Chicken Sukka': 95,
    'Plain Rice': 30,
    'Bindi Masala/Bindi do piazha': 85,
    'Veg do piazha/Hydrabadi': 95,
    'Malai Koftha Curry': 95,
    'Bindi Jaipuri/65': 95,
    'Channa Masala Butter': 95,
    'Panneer Fingers': 50,
    'Chicken Loly pop': 65,
    'Chicken Steak': 85,
    'Dragon Chicken, 555 Chicken': 85,
    'Aloo Bonda': 21,
    'Raw Banana Bajji': 21,
    'Onion Pakoda': 21,
    'Veg Samosa': 21,
    'Onion Samosa': 21,
    'Paav Bhaji': 38,
    'Paav Bhaji with cheese': 50,
    'Paav Bhaji Spl.': 55,
    'Veg puffs': 12,
    'Paneer puffs': 16,
    'Veg Burger': 45,
    'Veg & Cheese Burger': 55,
    'Veg Sandwich Toasted': 35,
    'Kachodi Fry, Samosa Fry': 55,
    'Toasted Veg Club Sandwich': 55,
    'Egg Puffs': 15,
    'Chicken Puffs': 18,
    'Chicken Rolls': 23,
    'Chicken Francky': 65,
    'Chicken Sandwich Toasted': 65,
    'Hawain Chicken Sandwich': 65,
    'Chicken Hot Dog': 65,
    'Chicken Spring Rolls, Kothu Parota': 65,
    'Omelete Sandwich': 19,
    'Toasted Egg Sandwich': 29,
    'Chicken Tikka Sandwich': 65,
    'Chicken Burgert Cheese': 65,
    'Grilled Chicken': 100,
    'Tandoori Chicken': 100,
    'Tangdi Kebab,ChickenTikka': 100,
    'Dhal Fry': 53,
    'Dhal Masala': 95,
    'Thadka': 95,
    'Malabar Chicken Masala': 90,
    'Chicken Punjabi /Spi.Chicken': 40,
    'Chicken Chowmein': 40,
    'Bisibilla Bath': 100,
    'Bagala Bath': 90,
    'Prawn Manchurian': 110,
    'Fish Pepper Masala': 110,
    'Fish fry (2 slice)': 80,
    'Chally Fish/ Chilly Manchurian': 75,
    'Maggie Noodies': 85,
    'Veg Pastha': 100,
    'Egg Pastha/ Panneer Pastha': 90,
    'Chicken Pastha': 110,
    'Coco / Chocolate Coffee': 65,
    'Veg, Clear, Noodle Soup': 30,
    'Tomato Soup, Chetinad soup': 35,
    'Chicken Soup': 40,
    'Papad ( Masala/ Roasted)': 20,
    'Garlic roti, Stuffed Roti': 20,
    'Baby corn Masala/Manchurian': 65,
    'French Fries': 42,
    'Panneer Dosa /Mushroom Dosa': 50,
    'Double Egg Dosa': 50,
    'Baby Corn Dosa': 50,
    'Tea': 13,
    'Ice Lemon Tea': 13,
    'Green Tea': 13,
    'Milk': 15,
    'Coffee': 15,
    'Ginger': 15,
    'MasalaTea': 15,
    'Apple': 55,
    'Kiwi': 55,
    'Avacado Juice': 55,
    'Sweet lime': 45,
    'Lemon Juice':25,
    'Chickoo': 45,
    'Guava': 45,
    'Pineapple': 40,
    'Grape': 40,
    'Banana': 40,
    'Water Melon': 30,
    'Mash Melon': 30,
    'Lassi': 45,
    'Cold Boost': 45,
    'Cold Coffee': 45,
    'Milk Shakes (AllFlavours)': 65,
    'Pomagranut': 57,
    'Mango': 57,
    'Orange Juice': 57,
    'Lemon': 23,
    'Mint Juice': 23,
    'Butter Milk': 23,
    'Horlicks': 25,
    'Boost': 25,
    'Gulab Jamun': 20,
    'Rasmulal': 20,
    'Rasgula': 20,
    'Gova Mysore Paak': 10,
    'Mothichoor Laddu': 10,
    'Dry Jamun': 20,
    'Dates Laddu': 20,
    'Milk Sweet': 20,
    'Special Sweet': 25,
    'Redvelvet Pastry': 85,
    'Muffins All flavours': 20,
    'Special Pastries': 53,
    'Vanilla,Strawberry Cakes': 32,
    'Swiss Rolls,Jam Roll': 32,
    'Queen of Pudding': 64,
    'Papdi Chat': 27,
    'Pani Poori': 27,
    'Channa Chat': 27,
    'Dhai Papdi Chat': 27,
    'Bhel Poori': 27,
    'Dha Poori': 27,
    'Dhai Vada': 32,
    'Dhai Samosa': 32,
    'Channa Masala': 27,
    'Black Channa Masala': 27,
    'Aloo Tikki': 27,
    'Eggless Cake': 23,
    'Sponge Cake': 23,
    'Plum Cake': 28,
    'Pastries (All Flavours)': 50,
    'Chocolate Cake': 45,
    'Chocolate Croissants': 23,
    'Doughnut Chocolate': 35,
    'Doughnut Stuffed': 55,
    'Brownie fudge': 75,
    '7 C Jar': 95,
    'Redvelvet Jar': 95,
    'Brownie Sandwich': 75,
    'Choco Lava': 50,
    'Moose Cup': 55,
    'Red Velvet Cup': 55,
    'Apple Pie': 75,
  };

  module.exports = menuItems;