// Curated movie details, posters, showtimes, snacks, and cities

export const POPULAR_CITIES = [
  { id: 'mumbai', name: 'Mumbai', icon: '🏙️' },
  { id: 'delhi', name: 'Delhi-NCR', icon: '🏛️' },
  { id: 'bengaluru', name: 'Bengaluru', icon: '💻' },
  { id: 'hyderabad', name: 'Hyderabad', icon: '🏰' },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: '🪁' },
  { id: 'pune', name: 'Pune', icon: '🌿' },
  { id: 'chennai', name: 'Chennai', icon: '🌊' },
  { id: 'kolkata', name: 'Kolkata', icon: '🚊' },
  { id: 'jaipur', name: 'Jaipur', icon: '👑' },
  { id: 'chandigarh', name: 'Chandigarh', icon: '🌹' }
];

export const HERO_BANNERS = [
  {
    id: 101,
    title: 'Cosmic Horizon: Explore the Beyond',
    subtitle: 'Now in IMAX 3D & 4DX with Immersive Dolby Atmos',
    genre: 'Sci-Fi / Space Epic',
    rating: 9.6,
    badge: 'Trending #1',
    releaseDate: 'In Theatres Today',
    image: '/banners/banner1.jpg',
    targetMovieId: 2
  },
  {
    id: 102,
    title: 'Mythica: Rise of the Tempest',
    subtitle: 'The darkness falls. A hero rises. Experience the spectacle!',
    genre: 'Action / Fantasy / Mythological',
    rating: 9.3,
    badge: 'Advance Booking Open',
    releaseDate: 'In Cinemas This Friday',
    image: '/banners/banner2.jpg',
    targetMovieId: 4
  }
];

export const INITIAL_MOVIES_METADATA = {
  1: {
    id: 1,
    movie: "Avengers: Endgame",
    theatre: "PVR ICON: Phoenix Palladium, Lower Parel",
    show_time: "07:30 PM",
    price: 320,
    language: "English",
    format: "IMAX 3D",
    genre: "Action/Sci-Fi",
    rating: 9.4,
    votes: "410.2K",
    city: "Mumbai",
    badge: "Filling Fast",
    duration: "3h 02m",
    certificate: "UA 16+",
    releaseDate: "26 Apr, 2019",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    synopsis: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    cast: [
      { name: "Robert Downey Jr.", role: "Tony Stark / Iron Man", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Chris Evans", role: "Steve Rogers / Captain America", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { name: "Scarlett Johansson", role: "Natasha Romanoff", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Chris Hemsworth", role: "Thor", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "PVR ICON: Phoenix Palladium, Lower Parel",
        location: "462, Senapati Bapat Marg, Lower Parel, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage", "Dolby Atmos", "Recliner"],
        shows: [
          { time: "10:30 AM", format: "IMAX 3D", price: 280, status: "available" },
          { time: "02:15 PM", format: "3D", price: 300, status: "filling" },
          { time: "07:30 PM", format: "IMAX 3D", price: 350, status: "filling" },
          { time: "10:45 PM", format: "2D", price: 250, status: "available" }
        ]
      },
      {
        name: "INOX: Megaplex, Inorbit Mall, Malad",
        location: "Link Road, Malad West, Mumbai",
        amenities: ["M-Ticket", "F&B Delivery", "Laser IMAX"],
        shows: [
          { time: "01:00 PM", format: "IMAX 3D", price: 320, status: "available" },
          { time: "05:45 PM", format: "IMAX 3D", price: 360, status: "almost_full" },
          { time: "09:15 PM", format: "3D", price: 310, status: "available" }
        ]
      }
    ]
  },
  2: {
    id: 2,
    movie: "Interstellar",
    theatre: "INOX: Megaplex, Inorbit Mall, Malad",
    show_time: "08:00 PM",
    price: 350,
    language: "English",
    format: "IMAX 2D",
    genre: "Sci-Fi/Adventure",
    rating: 9.6,
    votes: "320.5K",
    city: "Mumbai",
    badge: "Special Screening",
    duration: "2h 49m",
    certificate: "UA 13+",
    releaseDate: "07 Nov, 2014",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1400&q=80",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans through a mysterious wormhole near Saturn.",
    cast: [
      { name: "Matthew McConaughey", role: "Joseph Cooper", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
      { name: "Anne Hathaway", role: "Dr. Amelia Brand", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
      { name: "Jessica Chastain", role: "Murphy Cooper", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
      { name: "Michael Caine", role: "Professor John Brand", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "INOX: Megaplex, Inorbit Mall, Malad",
        location: "Link Road, Malad West, Mumbai",
        amenities: ["M-Ticket", "Gourmet F&B", "70mm IMAX Laser"],
        shows: [
          { time: "11:00 AM", format: "IMAX 2D", price: 300, status: "available" },
          { time: "03:30 PM", format: "IMAX 2D", price: 340, status: "filling" },
          { time: "08:00 PM", format: "IMAX 2D", price: 350, status: "almost_full" },
          { time: "11:30 PM", format: "2D", price: 260, status: "available" }
        ]
      },
      {
        name: "Cinepolis: Nexus Seawoods, Navi Mumbai",
        location: "Seawoods Station Complex, Sector 40, Navi Mumbai",
        amenities: ["M-Ticket", "VIP Lounge", "Dolby Atmos"],
        shows: [
          { time: "02:00 PM", format: "2D", price: 240, status: "available" },
          { time: "06:30 PM", format: "2D", price: 290, status: "filling" },
          { time: "09:45 PM", format: "2D", price: 290, status: "available" }
        ]
      }
    ]
  },
  3: {
    id: 3,
    movie: "Dune: Part Two",
    theatre: "Cinepolis: Viviana Mall, Thane",
    show_time: "06:15 PM",
    price: 280,
    language: "English",
    format: "4DX 3D",
    genre: "Sci-Fi/Action",
    rating: 9.2,
    votes: "189.4K",
    city: "Mumbai",
    badge: "Critically Acclaimed",
    duration: "2h 46m",
    certificate: "UA 16+",
    releaseDate: "01 Mar, 2024",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
      { name: "Zendaya", role: "Chani", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
      { name: "Rebecca Ferguson", role: "Lady Jessica", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "Cinepolis: Viviana Mall, Thane",
        location: "Eastern Express Highway, Thane West",
        amenities: ["M-Ticket", "4DX Motion Chairs", "RealD 3D"],
        shows: [
          { time: "01:30 PM", format: "4DX 3D", price: 380, status: "available" },
          { time: "06:15 PM", format: "4DX 3D", price: 420, status: "filling" },
          { time: "09:30 PM", format: "3D", price: 290, status: "available" }
        ]
      }
    ]
  },
  4: {
    id: 4,
    movie: "Kalki 2898 AD",
    theatre: "PVR: ECX, Chanakyapuri",
    show_time: "09:00 PM",
    price: 300,
    language: "Hindi",
    format: "3D",
    genre: "Action/Mythology",
    rating: 8.9,
    votes: "512.1K",
    city: "Delhi-NCR",
    badge: "Blockbuster Hit",
    duration: "3h 01m",
    certificate: "UA 16+",
    releaseDate: "27 Jun, 2024",
    poster: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=80",
    synopsis: "Set in a post-apocalyptic world in the year 2898 AD, the film follows a chosen few on a dangerous quest to protect Kalki, the tenth and final avatar of the Hindu god Vishnu, against tyrannical dictator Supreme Yaskin.",
    cast: [
      { name: "Prabhas", role: "Bhairava", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
      { name: "Amitabh Bachchan", role: "Ashwatthama", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
      { name: "Deepika Padukone", role: "SUM-80", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Kamal Haasan", role: "Supreme Yaskin", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "PVR: ECX, Chanakyapuri",
        location: "Chanakyapuri, New Delhi",
        amenities: ["M-Ticket", "Dolby Atmos", "Luxury Recliner"],
        shows: [
          { time: "11:15 AM", format: "3D", price: 270, status: "available" },
          { time: "03:45 PM", format: "3D", price: 310, status: "filling" },
          { time: "09:00 PM", format: "3D", price: 340, status: "almost_full" }
        ]
      }
    ]
  },
  5: {
    id: 5,
    movie: "Stree 2: Sarkate Ka Aatank",
    theatre: "Miraj Cinemas: Shalimar",
    show_time: "04:45 PM",
    price: 220,
    language: "Hindi",
    format: "2D",
    genre: "Comedy/Horror",
    rating: 8.8,
    votes: "380.0K",
    city: "Delhi-NCR",
    badge: "Superhit",
    duration: "2h 27m",
    certificate: "UA 16+",
    releaseDate: "15 Aug, 2024",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80",
    synopsis: "The town of Chanderi is being haunted once again, this time by a headless entity named Sarkata who abducts modern, independent women. Vicky, Bittu, Jana, and Rudra must team up with Stree to defeat the evil demon.",
    cast: [
      { name: "Shraddha Kapoor", role: "She", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Rajkummar Rao", role: "Vicky", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { name: "Pankaj Tripathi", role: "Rudra Bhaiya", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "Miraj Cinemas: Shalimar",
        location: "Shalimar Bagh, New Delhi",
        amenities: ["M-Ticket", "Snack Bar", "Digital 7.1"],
        shows: [
          { time: "12:30 PM", format: "2D", price: 200, status: "available" },
          { time: "04:45 PM", format: "2D", price: 240, status: "almost_full" },
          { time: "08:15 PM", format: "2D", price: 260, status: "filling" }
        ]
      }
    ]
  },
  6: {
    id: 6,
    movie: "Spider-Man: Beyond the Spider-Verse",
    theatre: "PVR: Forum Mall, Koramangala",
    show_time: "07:15 PM",
    price: 290,
    language: "English",
    format: "4DX",
    genre: "Animation/Action",
    rating: 9.5,
    votes: "194.8K",
    city: "Bengaluru",
    badge: "Most Anticipated",
    duration: "2h 20m",
    certificate: "U",
    releaseDate: "Upcoming 2025",
    poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=700&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    synopsis: "Miles Morales embarks on his next multidimensional odyssey to save every universe from collapse, reuniting with Gwen Stacy and traversing uncharted dimensions.",
    cast: [
      { name: "Shameik Moore", role: "Miles Morales", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Hailee Steinfeld", role: "Gwen Stacy", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
      { name: "Oscar Isaac", role: "Miguel O'Hara", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: [
      {
        name: "PVR: Forum Mall, Koramangala",
        location: "Hosur Road, Koramangala, Bengaluru",
        amenities: ["M-Ticket", "IMAX Laser", "Food Court"],
        shows: [
          { time: "01:15 PM", format: "4DX", price: 340, status: "available" },
          { time: "07:15 PM", format: "4DX", price: 380, status: "available" },
          { time: "10:30 PM", format: "3D", price: 280, status: "filling" }
        ]
      }
    ]
  }
};

export const SNACKS_MENU = [
  {
    id: 'fnb-1',
    name: 'Caramel & Cheese Popcorn Tub',
    description: 'Freshly popped jumbo dual delight (180g) with savory melted cheddar and rich caramel.',
    price: 280,
    category: 'Popcorn',
    veg: true,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fnb-2',
    name: 'Classic Salted Butter Popcorn (Large)',
    description: 'Golden, crispy, hot theatre butter popcorn in an eco-friendly XL tub.',
    price: 230,
    category: 'Popcorn',
    veg: true,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fnb-3',
    name: 'Mexican Cheesy Nachos with Salsa',
    description: 'Warm crispy corn tortilla nachos served with warm jalapeno cheese dip and fresh salsa.',
    price: 210,
    category: 'Nachos',
    veg: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fnb-4',
    name: 'Chilled Pepsi / Coke Combo Duo',
    description: 'Two ice-cold fountain cups (600ml each) with signature effervescence.',
    price: 180,
    category: 'Beverages',
    veg: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fnb-5',
    name: 'Gourmet Crispy Paneer Burger',
    description: 'Toasted brioche bun with crispy spiced paneer patty, chipotle sauce & fresh lettuce.',
    price: 260,
    category: 'Snacks',
    veg: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80'
  }
];

export const PROMO_COUPONS = {
  BMSFIRST: { code: 'BMSFIRST', discount: 75, minOrder: 300, desc: 'Flat ₹75 off on your first movie ticket' },
  BLOCKBUSTER50: { code: 'BLOCKBUSTER50', discount: 50, minOrder: 250, desc: '₹50 instant discount for blockbusters' },
  POPCORNLOVE: { code: 'POPCORNLOVE', discount: 100, minOrder: 500, desc: '₹100 off on Ticket + Snacks combo' }
};
