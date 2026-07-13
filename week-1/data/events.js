// Data layer for EventSphere
const events = [
  {
    id: "hackathon-2026",
    title: "National Hackathon 2026",
    category: "Technical",
    date: "2026-07-28T09:00:00",
    time: "09:00 AM - 05:00 PM (36 Hours)",
    venue: "Main Campus Auditorium & Labs",
    college: "Apex Institute of Technology",
    prizePool: "₹1,50,000",
    seatsRemaining: 12,
    totalSeats: 150,
    description: "An intensive 36-hour hackathon designed to challenge your coding, designing, and problem-solving abilities. Work in teams to build innovative solutions for real-world problems in HealthTech, EdTech, FinTech, and Smart Cities.",
    timeline: [
      { time: "09:00 AM, July 28", title: "Opening Ceremony & Theme Announcement" },
      { time: "10:30 AM, July 28", title: "Hacking Begins & Mentorship Session 1" },
      { time: "05:00 PM, July 28", title: "First Progress Check-in" },
      { time: "10:00 PM, July 28", title: "Midnight Gaming Break" },
      { time: "09:00 AM, July 29", title: "Mentorship Session 2" },
      { time: "04:00 PM, July 29", title: "Final Submission & Code Review" },
      { time: "06:00 PM, July 29", title: "Presentations & Award Ceremony" }
    ],
    rules: [
      "Teams must consist of 2 to 4 members.",
      "All code must be written during the hackathon. Pre-existing templates must be declared.",
      "Decisions of the judges will be final and binding.",
      "Participants must carry valid college ID cards.",
      "Bring your own laptops and required equipment."
    ],
    organizer: {
      name: "Apex Computer Society (ACS)",
      contact: "+91 98765 43210",
      email: "acs@apexinstitute.edu"
    },
    image: "images/events/hackathon.jpg"
  },
  {
    id: "ai-workshop",
    title: "AI & Machine Learning Workshop",
    category: "Workshop",
    date: "2026-08-05T10:00:00",
    time: "10:00 AM - 04:00 PM",
    venue: "Seminar Hall C",
    college: "Modern Engineering College",
    prizePool: "Certificates & Goodies",
    seatsRemaining: 45,
    totalSeats: 100,
    description: "Dive deep into the world of Artificial Intelligence and Machine Learning. Get hands-on experience building neural networks, training models with Python, and understanding modern generative AI concepts with industry experts.",
    timeline: [
      { time: "10:00 AM", title: "Introduction to Python for AI & Data Science" },
      { time: "11:30 AM", title: "Supervised vs Unsupervised Learning Algorithms" },
      { time: "01:00 PM", title: "Lunch Break" },
      { time: "02:00 PM", title: "Building your first Neural Network (TensorFlow/PyTorch)" },
      { time: "03:30 PM", title: "Q&A Session & Certificate Distribution" }
    ],
    rules: [
      "Prior basic programming knowledge (Python preferred) is recommended.",
      "Participants must bring laptops with Anaconda/Jupyter Notebook installed.",
      "100% attendance is mandatory to receive the workshop certificate."
    ],
    organizer: {
      name: "Department of AI/DS",
      contact: "+91 87654 32109",
      email: "aids.dept@modernengg.edu"
    },
    image: "images/events/ai-workshop.jpg"
  },
  {
    id: "cultural-fest",
    title: "Symphony - Annual Cultural Fest",
    category: "Cultural",
    date: "2026-08-15T16:00:00",
    time: "04:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    college: "St. Xavier's Science & Arts College",
    prizePool: "₹2,00,000",
    seatsRemaining: 150,
    totalSeats: 500,
    description: "Symphony is back! Witness the grandest celebration of music, dance, fashion, and theater. Join students from across the country as they compete for the prestigious Symphony Trophy.",
    timeline: [
      { time: "04:00 PM", title: "Inauguration & Classic Music Recital" },
      { time: "05:30 PM", title: "Western & Folk Dance Contests" },
      { time: "07:30 PM", title: "Panache - The Fashion Runway Event" },
      { time: "09:00 PM", title: "Celebrity DJ Night Performance" }
    ],
    rules: [
      "Registrations close on August 10th.",
      "External colleges must register through their cultural coordinator.",
      "Standard code of conduct and safety regulations apply.",
      "Ticket/Pass validation is required at the main gate."
    ],
    organizer: {
      name: "Symphony Cultural Committee",
      contact: "+91 76543 21098",
      email: "symphony@stxaviers.edu"
    },
    image: "images/events/cultural.jpg"
  },
  {
    id: "football-tournament",
    title: "Inter-College Football Tournament",
    category: "Sports",
    date: "2026-08-20T08:00:00",
    time: "08:00 AM - 06:00 PM",
    venue: "Sports Ground 1 & 2",
    college: "National Institute of Physical Education",
    prizePool: "₹75,000",
    seatsRemaining: 4,
    totalSeats: 16,
    description: "Lace up your boots! A high-intensity 9-a-side football tournament featuring the top college teams in the region. Standard FIFA rules apply with knock-out brackets leading to the grand final.",
    timeline: [
      { time: "08:00 AM", title: "Team Check-In & Fixture Draws" },
      { time: "09:00 AM", title: "Knockout Round Matches Begin" },
      { time: "01:00 PM", title: "Lunch & Strategy Rest Period" },
      { time: "02:30 PM", title: "Quarter-Finals & Semi-Finals" },
      { time: "05:00 PM", title: "Grand Final Match" },
      { time: "06:00 PM", title: "Presentation & Closing Ceremony" }
    ],
    rules: [
      "Squad size: Max 12 players (9 on-field, 3 substitutes).",
      "Matches will be 20 minutes per half.",
      "Proper sports kit including shin guards is mandatory.",
      "Strict action will be taken against unsportsmanlike behavior."
    ],
    organizer: {
      name: "NIPE Sports Council",
      contact: "+91 65432 10987",
      email: "sports@nipe.edu"
    },
    image: "images/events/football.jpg"
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch Competition",
    category: "Career",
    date: "2026-08-28T11:00:00",
    time: "11:00 AM - 03:00 PM",
    venue: "Entrepreneurship Cell Hall",
    college: "Global Business School",
    prizePool: "₹1,00,000 + Funding Options",
    seatsRemaining: 8,
    totalSeats: 30,
    description: "Do you have the next big idea? Pitch your business plan to seasoned venture capitalists, angel investors, and successful founders. Win seed grants and incubation support for your startup.",
    timeline: [
      { time: "11:00 AM", title: "Keynote Address: Scaling in the Modern Era" },
      { time: "11:30 AM", title: "Pitch Round 1: Elevator Pitches (3 mins each)" },
      { time: "01:00 PM", title: "Networking & Lunch Session" },
      { time: "02:00 PM", title: "Final Round: Deep-Dive Pitches & VC Q&A" },
      { time: "03:00 PM", title: "Winners Announcement & Feedback Ceremony" }
    ],
    rules: [
      "Startups must have at least one co-founder who is a current college student.",
      "Pitch deck must be submitted in PDF format 2 days before the event.",
      "Each team gets exactly 5 minutes to pitch followed by 3 minutes of Q&A."
    ],
    organizer: {
      name: "E-Cell GBS",
      contact: "+91 54321 09876",
      email: "ecell@gbs.edu"
    },
    image: "images/events/startup.jpg"
  },
  {
    id: "robotics-challenge",
    title: "Robotics Design Challenge",
    category: "Technical",
    date: "2026-09-02T10:00:00",
    time: "10:00 AM - 05:00 PM",
    venue: "Mechanical Workshop Lab",
    college: "Techno India Institute",
    prizePool: "₹50,000",
    seatsRemaining: 15,
    totalSeats: 40,
    description: "Test the limits of your mechanical and coding skills in the Robotics Design Challenge. Design bots that can navigate autonomous tracks, clear obstacle paths, and display complex maneuvering abilities.",
    timeline: [
      { time: "10:00 AM", title: "Robot Inspections & Dimension Checks" },
      { time: "11:00 AM", title: "Autonomous Track Round 1" },
      { time: "01:30 PM", title: "Obstacle Course Round 2" },
      { time: "03:30 PM", title: "Final Showdown (Top 5 Bots)" },
      { time: "04:30 PM", title: "Awards & Certificates" }
    ],
    rules: [
      "Bots must comply with size limits (30cm x 30cm x 30cm) and weight (Max 5kg).",
      "Power source must be on-board; no external wired power allowed.",
      "Lego kits are allowed, but custom microcontrollers (Arduino, ESP32, etc.) are highly encouraged."
    ],
    organizer: {
      name: "Robotics & Automation Club",
      contact: "+91 43210 98765",
      email: "robotics@technoindia.edu"
    },
    image: "images/events/robotics.jpg"
  },
  {
    id: "cyber-security",
    title: "Cyber Security & Capture The Flag (CTF)",
    category: "Workshop",
    date: "2026-09-10T09:00:00",
    time: "09:00 AM - 06:00 PM",
    venue: "Network Security Lab",
    college: "Pioneer Science Academy",
    prizePool: "₹40,000",
    seatsRemaining: 20,
    totalSeats: 80,
    description: "A dual event containing an expert-led session on threat hunting, ethical hacking, and penetration testing, followed by an intensive 5-hour Capture The Flag (CTF) contest covering Web Exploitation, Cryptography, and Reverse Engineering.",
    timeline: [
      { time: "09:00 AM", title: "Ethical Hacking & Network Pen-Testing Basics" },
      { time: "11:00 AM", title: "CTF Overview & Rules briefing" },
      { time: "12:00 PM", title: "CTF Arena Opens (Continuous Hacking)" },
      { time: "05:00 PM", title: "CTF Arena Closes & Write-up Verification" },
      { time: "05:30 PM", title: "De-brief & Prize Distribution" }
    ],
    rules: [
      "Individual participation or team of 2.",
      "Attacking the host server platform or other teams directly will lead to instant disqualification.",
      "Sharing flags or answers will result in team suspension."
    ],
    organizer: {
      name: "Pioneer Cybersecurity Cell",
      contact: "+91 32109 87654",
      email: "cybersec@pioneer.edu"
    },
    image: "images/events/cybersec.jpg"
  },
  {
    id: "uiux-bootcamp",
    title: "UI/UX Design Bootcamp",
    category: "Workshop",
    date: "2026-09-15T11:00:00",
    time: "11:00 AM - 05:00 PM",
    venue: "Design Lab 2",
    college: "Creative Arts Academy",
    prizePool: "Figma Pro Licenses & Goodies",
    seatsRemaining: 0,
    totalSeats: 50,
    description: "Learn to design user-centered experiences. This intensive design bootcamp covers wireframing, building cohesive design systems, modern styling principles, high-fidelity interactive prototyping, and conducting user interviews.",
    timeline: [
      { time: "11:00 AM", title: "Introduction to Design Thinking & User Journeys" },
      { time: "12:30 PM", title: "Figma Workspace Essentials & Grid Systems" },
      { time: "02:00 PM", title: "Lunch Break" },
      { time: "02:45 PM", title: "Interactive Prototyping & Micro-animations" },
      { time: "04:30 PM", title: "Portfolio Reviews & Figma Showcase" }
    ],
    rules: [
      "Must have a pre-registered Figma account.",
      "Bring headphones/earphones for design review sessions.",
      "Certificates will only be issued to participants submitting the final mini-project."
    ],
    organizer: {
      name: "CAA Design Club",
      contact: "+91 21098 76543",
      email: "design@creativearts.edu"
    },
    image: "images/events/uiux.jpg"
  },
  {
    id: "gdsc-meetup",
    title: "GDSC Annual tech Meetup",
    category: "Technical",
    date: "2026-09-22T14:00:00",
    time: "02:00 PM - 06:00 PM",
    venue: "Main Auditorium",
    college: "Trinity Engineering College",
    prizePool: "Google Swags & Cloud Credits",
    seatsRemaining: 60,
    totalSeats: 250,
    description: "Connect with developers, designers, and tech enthusiasts. The Google Developer Student Club Meetup features expert speakers discussing cloud technologies, Android development, Flutter, and open-source contributions.",
    timeline: [
      { time: "02:00 PM", title: "Opening Address: The Developer Ecosystem" },
      { time: "02:30 PM", title: "Session 1: Getting Started with Google Cloud Platform" },
      { time: "03:45 PM", title: "Session 2: Building Multiplatform Apps with Flutter" },
      { time: "05:00 PM", title: "Networking Mixer & High Tea" }
    ],
    rules: [
      "Open to all students from any discipline.",
      "Carry registration ticket (QR code) on mobile.",
      "Be on time to secure seating in the front row."
    ],
    organizer: {
      name: "GDSC Trinity",
      contact: "+91 10987 65432",
      email: "gdsc@trinity.edu"
    },
    image: "images/events/gdsc.jpg"
  },
  {
    id: "tedx-event",
    title: "TEDx College Event: Beyond Horizons",
    category: "Cultural",
    date: "2026-09-30T10:00:00",
    time: "10:00 AM - 04:30 PM",
    venue: "Convocation Hall",
    college: "Vanguard University",
    prizePool: "TEDx Attendee Kits",
    seatsRemaining: 32,
    totalSeats: 300,
    description: "In the spirit of ideas worth spreading, TEDx Vanguard University brings together multidisciplinary thinkers, change-makers, and innovators to spark deep discussion and connection. Expect inspiring stories and performances.",
    timeline: [
      { time: "10:00 AM", title: "Welcome & Speaker Session 1 (Science & Tech)" },
      { time: "11:30 AM", title: "Musical Performance Break" },
      { time: "12:00 PM", title: "Speaker Session 2 (Social Entrepreneurship)" },
      { time: "01:30 PM", title: "Lunch & Interaction Zone" },
      { time: "02:30 PM", title: "Speaker Session 3 (Design & Arts)" },
      { time: "04:00 PM", title: "Closing Remarks & Networking" }
    ],
    rules: [
      "Mobile phones must be kept on silent in the auditorium.",
      "Entry closes strictly at 09:45 AM.",
      "Recordings of speeches without permission are prohibited."
    ],
    organizer: {
      name: "TEDx Vanguard Organizing Committee",
      contact: "+91 09876 54321",
      email: "tedx@vanguard.edu"
    },
    image: "images/events/tedx.jpg"
  }
];

// Helper to make it accessible as a global variable or ES module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = events;
} else {
  window.EventSphereData = events;
}
