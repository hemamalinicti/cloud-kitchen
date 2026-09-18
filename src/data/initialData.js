export const INITIAL_DISHES = [
  {
    id: 'dish-1',
    name: 'Coimbatore Kongu Nattu Kozhi Kuzhambu & Parotta',
    category: 'lunch',
    type: 'non-veg',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 142,
    spiceLevel: 3,
    calories: 540,
    protein: '36g',
    carbs: '46g',
    fat: '24g',
    prepTime: '25 mins',
    isTodaySpecial: true,
    isSoldOut: false,
    image: '/images/dishes/kongu_kozhi_parotta.png',
    description: 'Traditional Coimbatore style country chicken curry cooked with shallots (Chinna Vengayam), freshly ground Kongu masala, and cold-pressed gingelly oil. Served with 2 hot flaky Malabar Parottas.',
    ingredients: ['Nattu Kozhi (Country Chicken)', 'Chinna Vengayam (Small Shallots)', 'Hand-ground Kongu Spice', 'Gingelly Oil', 'Curry Leaves'],
    chef: 'Chef Muruganandam (Kongu Specialist)',
    chefAvatar: '/images/chefs/chef_muruganandam.png'
  },
  {
    id: 'dish-2',
    name: 'Madurai Style Mutton Chukka & Bun Parotta Box',
    category: 'dinner',
    type: 'non-veg',
    price: 329,
    originalPrice: 380,
    rating: 5.0,
    reviewsCount: 198,
    spiceLevel: 3,
    calories: 610,
    protein: '40g',
    carbs: '44g',
    fat: '28g',
    prepTime: '30 mins',
    isTodaySpecial: true,
    isSoldOut: false,
    image: '/images/dishes/mutton_chukka_parotta.png',
    description: 'Pan-roasted tender goat meat cooked down with black pepper, small onions, garlic, and aromatic Chettinad spices. Served with 2 Madurai Bun Parottas & Pepper Salna.',
    ingredients: ['Tender Goat Meat', 'Black Pepper', 'Madurai Parotta Batter', 'Garlic & Shallots', 'Ghee'],
    chef: 'Chef Meenakshi Sundaram',
    chefAvatar: '/images/chefs/chef_meenakshi.png'
  },
  {
    id: 'dish-3',
    name: 'Desi Ghee Podi Mini Tiffin Feast',
    category: 'breakfast',
    type: 'veg',
    price: 159,
    originalPrice: 190,
    rating: 4.9,
    reviewsCount: 215,
    spiceLevel: 2,
    calories: 420,
    protein: '14g',
    carbs: '62g',
    fat: '12g',
    prepTime: '15 mins',
    isTodaySpecial: true,
    isSoldOut: false,
    image: '/images/dishes/ghee_podi_tiffin.png',
    description: 'A grand South Indian Tamil mini tiffin box with 4 Ghee Idlis tossed in spicy Idli Podi, 1 Crispy Medu Vada, Mini Rava Masala Dosa, and authentic Kumbakonam Filter Coffee.',
    ingredients: ['Fermented Parboiled Rice', 'A2 Desi Ghee', 'Gunpowder Spice Podi', 'Coconut Chutney', 'Drumstick Sambar'],
    chef: 'Chef Soundarya Raman',
    chefAvatar: '/images/chefs/chef_soundarya.png'
  },
  {
    id: 'dish-4',
    name: 'Seeraga Samba Mutton Dum Biryani (Thalappakatti Style)',
    category: 'lunch',
    type: 'non-veg',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 176,
    spiceLevel: 2,
    calories: 580,
    protein: '35g',
    carbs: '55g',
    fat: '22g',
    prepTime: '25 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/mutton_biryani.png',
    description: 'Authentic Tamil Nadu Seeraga Samba rice Dum Biryani cooked with succulent mutton pieces, fresh mint, coriander, and freshly hand-ground biryani spices. Served with Onion Raita & Brinjal Kathirikai Gravy.',
    ingredients: ['Seeraga Samba Rice', 'Fresh Mutton', 'Green Chillies', 'Mint & Coriander', 'Kathirikai Gotsu'],
    chef: 'Chef Muruganandam (Kongu Specialist)',
    chefAvatar: '/images/chefs/chef_muruganandam.png'
  },
  {
    id: 'dish-5',
    name: 'Pollachi Coconut Milk Fish Kuzhambu & Matta Rice',
    category: 'dinner',
    type: 'non-veg',
    price: 269,
    originalPrice: 310,
    rating: 4.8,
    reviewsCount: 88,
    spiceLevel: 2,
    calories: 460,
    protein: '32g',
    carbs: '48g',
    fat: '16g',
    prepTime: '25 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/pollachi_fish_kuzhambu.jpg',
    description: 'Fresh Vanjaram (Seer) Fish simmered in Pollachi coconut milk, raw mango, tamarind, and green chilli curry. Paired with steamed Tamil Matta rice.',
    ingredients: ['Vanjaram (King Fish)', 'Fresh Pollachi Coconut Milk', 'Raw Green Mango', 'Tamarind Paste', 'Mustard Seeds'],
    chef: 'Chef Meenakshi Sundaram',
    chefAvatar: '/images/chefs/chef_meenakshi.png'
  },
  {
    id: 'dish-6',
    name: 'Tamil Traditional Banana Leaf Meals Thali (Full Sappadu)',
    category: 'lunch',
    type: 'veg',
    price: 199,
    originalPrice: 240,
    rating: 4.9,
    reviewsCount: 230,
    spiceLevel: 2,
    calories: 490,
    protein: '16g',
    carbs: '72g',
    fat: '14g',
    prepTime: '20 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/tamil_thali.png',
    description: 'A traditional Tamil banana leaf style thali box with Ponni Boiled Rice, Arachivitta Sambar, Pepper Rasam, Mor Kuzhambu, Poriyal, Kootu, Appalam, and Elaneer Payasam.',
    ingredients: ['Tamil Boiled Rice', 'Arachivitta Sambar', 'Pepper Garlic Rasam', 'Vegetable Kootu', 'Elaneer Payasam'],
    chef: 'Chef Soundarya Raman',
    chefAvatar: '/images/chefs/chef_soundarya.png'
  },
  {
    id: 'dish-7',
    name: 'Erode Pallipalayam Chicken Fry Box',
    category: 'dinner',
    type: 'non-veg',
    price: 239,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 112,
    spiceLevel: 3,
    calories: 510,
    protein: '34g',
    carbs: '30g',
    fat: '26g',
    prepTime: '20 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/erode_pallipalayam_chicken.png',
    description: 'Erode specialty chicken fry cooked with sliced coconut bits (Thengai Kothu), dried red chillies, shallots, and ginger-garlic without water. Super spicy and aromatic.',
    ingredients: ['Chicken Chunks', 'Coconut Bits (Thengai Kothu)', 'Dried Red Chillies', 'Small Onions', 'Gingelly Oil'],
    chef: 'Chef Muruganandam (Kongu Specialist)',
    chefAvatar: '/images/chefs/chef_muruganandam.png'
  },
  {
    id: 'dish-8',
    name: 'Pongal + Vada',
    category: 'breakfast',
    type: 'veg',
    price: 149,
    originalPrice: 180,
    rating: 5.0,
    reviewsCount: 164,
    spiceLevel: 1,
    calories: 440,
    protein: '12g',
    carbs: '58g',
    fat: '14g',
    prepTime: '15 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/pongal_vada.png',
    description: 'Authentic Kovai home-style A2 Ghee Cashew Ven Pongal served with 1 Crispy Medu Vada, Coconut Chutney & Drumstick Sambar.',
    ingredients: ['A2 Ghee Ven Pongal', 'Crispy Medu Vada', 'Coconut Chutney', 'Drumstick Sambar', 'Cashews'],
    chef: 'Chef Meenakshi Sundaram',
    chefAvatar: '/images/chefs/chef_meenakshi.png'
  },
  {
    id: 'dish-9',
    name: 'Chettinad Karaikudi Pepper Nandu (Crab) Kuzhambu',
    category: 'lunch',
    type: 'non-veg',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 95,
    spiceLevel: 3,
    calories: 420,
    protein: '38g',
    carbs: '28g',
    fat: '18g',
    prepTime: '30 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/karaikudi_crab_kuzhambu.png',
    description: 'Fresh sea crab cooked in Karaikudi Chettinad black pepper gravy with roasted coriander, fennel, and garlic. Served with piping hot Ponni Rice.',
    ingredients: ['Fresh Mud Crab', 'Roasted Black Pepper', 'Chettinad Masala', 'Shallots', 'Curry Leaves'],
    chef: 'Chef Meenakshi Sundaram',
    chefAvatar: '/images/chefs/chef_meenakshi.png'
  },
  {
    id: 'dish-10',
    name: 'Tirunelveli Street Style Chicken Kothu Parotta & Halwa',
    category: 'dinner',
    type: 'non-veg',
    price: 229,
    originalPrice: 270,
    rating: 4.9,
    reviewsCount: 134,
    spiceLevel: 3,
    calories: 590,
    protein: '32g',
    carbs: '52g',
    fat: '24g',
    prepTime: '20 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/tirunelveli_kothu_parotta.png',
    description: 'Spicy shredded Malabar Parotta tossed on hot iron grid with chicken curry, scrambled eggs, onions, and green chillies. Served with authentic Tirunelveli Wheat Ghee Halwa.',
    ingredients: ['Shredded Parotta', 'Chicken Curry', 'Eggs', 'Green Chillies', 'Tirunelveli Wheat Ghee Halwa'],
    chef: 'Chef Muruganandam (Kongu Specialist)',
    chefAvatar: '/images/chefs/chef_muruganandam.png'
  },
  {
    id: 'dish-11',
    name: 'Tanjore Special Vatha Kuzhambu & Keerai Kootu Thali',
    category: 'lunch',
    type: 'veg',
    price: 179,
    originalPrice: 210,
    rating: 4.8,
    reviewsCount: 108,
    spiceLevel: 2,
    calories: 410,
    protein: '14g',
    carbs: '65g',
    fat: '10g',
    prepTime: '20 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: '/images/dishes/tanjore_vatha_kuzhambu.jpg',
    description: 'Tangy Tanjore style dried berry (Sundakkai & Manathakkali) gravy in sesame oil, served with hot Ponni Boiled Rice, Fresh Keerai Kootu, Potato Roast & Appalam.',
    ingredients: ['Sundakkai Vathal', 'Gingelly Oil', 'Tamarind Extract', 'Pasalai Keerai', 'Ponni Rice'],
    chef: 'Chef Soundarya Raman',
    chefAvatar: '/images/chefs/chef_soundarya.png'
  },
  {
    id: 'dish-12',
    name: 'Chennai Saravana Style Ghee Onion Rava Dosa & Filter Coffee',
    category: 'breakfast',
    type: 'veg',
    price: 139,
    originalPrice: 165,
    rating: 4.9,
    reviewsCount: 182,
    spiceLevel: 1,
    calories: 380,
    protein: '10g',
    carbs: '52g',
    fat: '14g',
    prepTime: '15 mins',
    isTodaySpecial: false,
    isSoldOut: false,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    description: 'Super crisp net-textured Rava Dosa made with semolina, roasted cashews, crushed pepper, cumin, and fried onions. Served with Kara Chutney, Mint Chutney & Kumbakonam Filter Coffee.',
    ingredients: ['Rava (Semolina)', 'Whole Cashews', 'Cumin & Black Pepper', 'Shallots', 'Red Kara Chutney'],
    chef: 'Chef Soundarya Raman',
    chefAvatar: '/images/chefs/chef_soundarya.png'
  }
];

export const CHEFS_DATA = [
  {
    name: 'Chef Muruganandam',
    role: 'Head Chef - Kongu Nadu & Chettinad Specialist',
    experience: '20 Years Experience in Coimbatore & Erode',
    bio: 'Born in Erode, Chef Muruganandam is a master of authentic Kongu Nadu country chicken recipes, Pallipalayam chicken, and roasted shallot spice blends.',
    signatureDish: 'Kongu Nattu Kozhi Kuzhambu',
    avatar: '/images/chefs/chef_muruganandam.png'
  },
  {
    name: 'Chef Meenakshi Sundaram',
    role: 'Master Chef - Madurai & South Non-Veg Recipes',
    experience: '16 Years Experience in Madurai & Karaikudi',
    bio: 'Specializes in authentic Chettinad pepper roasts, Seeraga Samba Biryani, and traditional Madurai Bun Parottas made using cold-pressed gingelly oil.',
    signatureDish: 'Madurai Mutton Chukka',
    avatar: '/images/chefs/chef_meenakshi.png'
  },
  {
    name: 'Chef Soundarya Raman',
    role: 'Sous Chef - Tamil Vegetarian & Tiffin Specialist',
    experience: '14 Years Experience in Coimbatore',
    bio: 'Expert in Kovai home-style tiffins, Desi Ghee Podi Idlis, Arachivitta Sambar, and traditional banana leaf Tamil meals.',
    signatureDish: 'Full Tamil Boiled Rice Sappadu',
    avatar: '/images/chefs/chef_soundarya.png'
  }
];

export const WEEKLY_SUBSCRIPTION_MENU = {
  Monday: { 
    breakfast: 'Desi Ghee Podi Mini Idli (4 pcs) + Crispy Medu Vada + Kumbakonam Filter Coffee',
    lunch: 'Kongu Kozhi Kuzhambu + 3 Parottas + Boiled Egg', 
    dinner: 'Ghee Podi Idli + Sambar + Mint Chutney' 
  },
  Tuesday: { 
    breakfast: 'Chennai Saravana Style Ghee Onion Rava Dosa + Kara Chutney + Filter Coffee',
    lunch: 'Arachivitta Sambar Rice + Potato Poriyal + Appalam', 
    dinner: 'Chettinad Chicken Masala + 3 Chapattis' 
  },
  Wednesday: { 
    breakfast: 'Madurai Ven Pongal + Medu Vada + Drumstick Sambar + Filter Coffee',
    lunch: 'Pollachi Fish Kuzhambu + Ponni Rice + Rasam', 
    dinner: 'Kadhai Paneer / Veg Korma + Parottas' 
  },
  Thursday: { 
    breakfast: 'Kanchipuram Masala Idli + Coconut Chutney + Filter Coffee',
    lunch: 'Coimbatore Special Drumstick Sambar + Boiled Rice + Kootu', 
    dinner: 'Egg Curry / Mushroom Masala + Phulkas' 
  },
  Friday: { 
    breakfast: 'Crispy Wheat Poori (3 pcs) + Potato Masala & Chana + Filter Coffee',
    lunch: 'Thalappakatti Style Seeraga Samba Mutton Biryani', 
    dinner: 'Erode Pallipalayam Chicken Fry + Parottas' 
  },
  Saturday: { 
    breakfast: 'Soft Fluffy Set Dosa (3 pcs) + Spicy Vadacurry + Filter Coffee',
    lunch: 'Tamil Grand Banana Leaf Sappadu Thali', 
    dinner: 'Madurai Mutton Chukka + Chapattis' 
  },
  Sunday: { 
    breakfast: 'Soft Coconut Milk Appam (2 pcs) + Veg/Chicken Stew + Filter Coffee',
    lunch: 'Chef Special Kovai Sunday Feast & Jigarthanda', 
    dinner: 'Light Pepper Rasam Rice & Omelette / Idli Box' 
  }
};

export const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Karthik Subramaniam',
    role: 'IT Engineer (RS Puram, Coimbatore)',
    rating: 5,
    date: '2 days ago',
    comment: 'The Kongu Nattu Kozhi Kuzhambu tastes exactly like my grandmother’s home recipe in Erode! Fresh gingelly oil aroma, small onions, and delivered hot right to RS Puram at 1:00 PM.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Divya & Vimal',
    role: 'Residents (Peelamedu, Coimbatore)',
    rating: 5,
    date: 'Yesterday',
    comment: 'Subscribed to the 30-day Kovai tiffin plan for dinner in Peelamedu. Amazing Ghee Podi Idlis and Parottas. Clean packaging and zero preservative feel!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Dr. Anand Kumar',
    role: 'Medical Officer (Gandhipuram)',
    rating: 5,
    date: '3 days ago',
    comment: 'Ordered 35 Seeraga Samba Mutton Biryani boxes for our hospital team in Gandhipuram. Everyone was amazed by the authentic flavor and Madurai Jigarthanda dessert!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 4,
    name: 'Priya & Sundar',
    role: 'Software Lead (Saravanampatti)',
    rating: 5,
    date: '4 days ago',
    comment: 'Best daily tiffin service in Kovai for working couples! Erode Pallipalayam chicken fry and Arachivitta Sambar are divine. Always piping hot!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 5,
    name: 'Rajesh Kannan',
    role: 'Bank Manager (Saibaba Colony)',
    rating: 5,
    date: '5 days ago',
    comment: 'Pure Desi Ghee and cold-pressed oil cooking. Zero soda or artificial colors. My whole family relies on their Sunday Kovai Feast!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 6,
    name: 'Lakshmi Ammal',
    role: 'Professor (Race Course)',
    rating: 5,
    date: '1 week ago',
    comment: 'Catered 25 Kovai Banana Leaf Sappadu boxes for a family function in Race Course. Extremely prompt delivery and authentic Kongu taste!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const COIMBATORE_LOCATIONS = [
  'Gandhipuram',
  'RS Puram (R.S. Puram)',
  'Peelamedu',
  'Saravanampatti',
  'Race Course',
  'Saibaba Colony',
  'Ramanathapuram',
  'Singanallur',
  'Ukkadam',
  'Vadavalli',
  'Kovaipudur'
];

export const GALLERY_IMAGES = [
  {
    url: '/images/gallery/gallery_tile_14.jpg',
    title: 'Master Chef Garnishing Daily Tiffin Boxes in RS Puram',
    category: 'Kitchen Prep'
  },
  {
    url: '/images/gallery/gallery_tile_10.jpg',
    title: 'Master Chef Wok Station Cooking',
    category: 'Kitchen Prep'
  },
  {
    url: '/images/gallery/gallery_tile_11.jpg',
    title: 'Seeraga Samba Biryani & Curry Feast',
    category: 'Biryani & Feasts'
  },
  {
    url: '/images/gallery/gallery_tile_12.jpg',
    title: 'Eco-Friendly Kraft Meal Packaging Hub',
    category: 'Hygienic Packaging'
  },
  {
    url: '/images/gallery/gallery_tile_13.jpg',
    title: 'Chef Precision Micro-Herb Garnishing',
    category: 'Kitchen Prep'
  },
  {
    url: '/images/gallery/gallery_tile_1.jpg',
    title: 'Commercial Home Kitchen Team Assembly',
    category: 'Kitchen Team'
  },
  {
    url: '/images/gallery/gallery_tile_2.jpg',
    title: 'Artisanal Curry Bowl Finishing',
    category: 'Kitchen Prep'
  },
  {
    url: '/images/gallery/gallery_tile_3.jpg',
    title: 'Authentic South Indian Curry & Parotta Feast',
    category: 'Tamil Specials'
  },
  {
    url: '/images/gallery/gallery_tile_4.jpg',
    title: 'Sealed Leakproof Meal Boxes',
    category: 'Hygienic Packaging'
  },
  {
    url: '/images/gallery/gallery_tile_5.jpg',
    title: 'Fast 30-Min Doorstep Delivery Hand-Off',
    category: 'Doorstep Delivery'
  },
  {
    url: '/images/gallery/gallery_tile_6.jpg',
    title: 'Fresh Tiffin Box Dispatch Counter',
    category: 'Packaging'
  },
  {
    url: '/images/gallery/gallery_tile_7.jpg',
    title: 'CloudKitchen RS Puram Hub Storefront',
    category: 'Storefront'
  },
  {
    url: '/images/gallery/gallery_tile_8.jpg',
    title: 'Chettinad Special Curry & Rice Thali',
    category: 'Chettinad Specials'
  },
  {
    url: '/images/gallery/gallery_tile_9.jpg',
    title: 'Mobile App Live Order Tracking',
    category: 'Online Ordering'
  }
];
