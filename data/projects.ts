import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    slug: 'run-delivery',
    title: 'Run Delivery',
    tagline: 'Dispatch, track, and pay for deliveries — without the WhatsApp spreadsheet.',
    tag: 'B2B logistics',
    company: 'Run Delivery',
    period: 'Aug 2026',
    current: true,
    status: 'In production',
    role: ['Frontend Development', 'Backend Development'],
    summary:
      'The merchant dashboard and business API on Run Delivery’s NestJS platform — quoting, wallet checkout, admin rider assignment, live GPS tracking, and HMAC-signed webhooks so a store’s checkout and the rider’s trip stay on the same dispatch.',
    description:
      'I build the business product end to end: the Next.js dashboard at business.rundeliverys.com, and the NestJS business-app that quotes a trip, debits a wallet in a Mongo transaction, hands the order to ops for assignment, and fans status out over Socket.IO, FCM, and signed webhooks.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Redux Toolkit',
      'NestJS',
      'MongoDB',
      'Redis',
      'BullMQ',
      'Socket.IO',
      'Paystack',
      'Google Maps API',
      'Firebase Cloud Messaging',
    ],
    links: [
      { label: 'business.rundeliverys.com', href: 'https://business.rundeliverys.com' },
      { label: 'rundeliverys.com', href: 'https://rundeliverys.com/' },
      { label: 'API docs', href: 'https://run-deliverys.mintlify.site' },
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Run Delivery already ran consumer and rider apps on a NestJS monorepo — JWT auth, Socket.IO tracking, Paystack wallets. Businesses were still booking over calls, WhatsApp, and spreadsheets: no shared quote, no bulk drop-off, no hook back into their own checkout.',
          'The product had to sit on the same dispatch as riders and customers. A dashboard staff can live in all day, and a public API so a store can create, rate, track, and cancel shipments without opening the UI. Ops still assigns the rider; the merchant should never need to.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The dashboard is the merchant surface: email OTP login, KYC, screen-level access for invited staff, Google Maps pin or typed address, a live quote, single orders or Excel bulk upload, Paystack wallet funding, history with PDF receipts and a map, carbon insights by delivery mode, and a developers area for API keys (`run_live_` / `run_test_`) and webhooks (`whsec_`, rotate keeps the previous key for 24 hours).',
          'The business-app is a sibling in the NestJS monorepo. JWT or scoped API keys (`orders:read` / `orders:write`). Quotes use Haversine km + base fare + weight. Place-order re-quotes every row, then writes dispatches and the wallet debit in one Mongo transaction. The same dispatch document the rider app advances is what the dashboard tracks.',
        ],
      },
      {
        heading: 'Routing and assignment',
        paragraphs: [
          'A business order is born PENDING and flagged `is_business_trip`. Unlike consumer express/sameday, it does not auto-broadcast to the rider pool. Ops searches eligible riders inside a radius (5–200 km, default 70), filtered by delivery mode, online status, stale GPS, and concurrency caps. Distance is Haversine from pickup to last known location, nearest first.',
          'Assign is atomic: the trip moves to ASSIGNED and the rider is reserved. The rider confirms → ACCEPTED, then a strict machine through pickup OTP to delivered. GPS can step that path when the rider’s ping is near pickup or drop-off. Cancel from the dashboard is allowed only through START_TRIP, and refunds the wallet.',
        ],
      },
      {
        heading: 'Tracking and webhooks',
        paragraphs: [
          'Every status change hits three fans: Socket.IO on `/dispatches`, FCM to the business dashboard, and a webhook if the merchant subscribed. The dashboard timeline is BOOKED → assigned → accepted → pickup → in transit → delivered, with a map and a shareable tracking id.',
          'Webhooks are a delivery pipeline, not a fire-and-forget POST. Status maps to `shipment.created` / `assigned` / `accepted` / `picked_up` / `in_transit` / `out_for_delivery` / `delivered` / `cancelled`, plus `shipment.status_changed`. Payload is a versioned envelope (`api_version: 2026-08-01`), signed HMAC-SHA256. BullMQ workers claim deliveries with retries and backoff; 4xx is dead-lettered, 5xx/429 retried. An outbox sweeper re-queues jobs lost between Mongo and Redis. The dashboard lists attempts and can retry failed or dead-lettered deliveries.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'A quote, a wallet debit, and a rider’s trip have to agree. Place-order fails closed on insufficient balance before anything is written; the debit and the dispatches commit together. The public API is the same booking path as the UI — a key never sees another merchant’s book. Owners see every screen; invited users only see the pages they were given.',
          'Assignment and routing are two products on one document: ops needs a wide, mode-aware search; the rider app needs a tight pool and a status machine that cannot skip OTP pickup. Webhooks have to survive a crash between “status saved” and “HTTP 200 from the merchant,” which is why the outbox, HMAC replay window, and secret overlap exist.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at business.rundeliverys.com, with public API docs for third-party checkout. Local Nigeria deliveries, wallet, assignment, live tracking, and webhooks are in daily use alongside the rider and consumer apps. Interstate and international lanes are stubbed in the UI.',
        ],
      },
    ],
  },
  {
    slug: 'babs-auto-logistics',
    title: 'BABS Auto Logistics',
    tagline: 'Source and ship vehicles worldwide, without the email chain.',
    tag: 'Lead-generation site',
    company: 'BABS Auto Logistics',
    period: 'Jun 2026',
    status: 'In production',
    role: ['Frontend Development'],
    summary:
      'The marketing site and quote flow for BABS Auto Logistics — vehicle sourcing, inspections, export paperwork, and global shipping for buyers and dealers across Africa, the Middle East, and Europe.',
    description:
      'I built babsautologistics.com: a public site that explains the full chain, and a quote form that turns a sourcing or shipping enquiry into a brief the operations team can act on.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Hook Form',
      'Yup',
      'TanStack Query',
    ],
    links: [{ label: 'babsautologistics.com', href: 'https://babsautologistics.com/' }],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'BABS sources and ships vehicles from the USA, UK, Germany, Japan and 15+ markets into West Africa, the Middle East, and beyond. The business was already trusted on the ground — WhatsApp, phone, repeat dealers — but had no site that could explain the full chain or capture a qualified enquiry after hours.',
          'The site had to do two jobs at once: look like a company that moves cars across borders, and give a buyer a short path from “I need a Camry in Lagos” to a brief the team can quote.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The public site is what people land on — hero and vehicle types, services (sourcing, RoRo and container freight, export docs, inland haulage, 50-point inspections, spare parts), a gallery of real deliveries, testimonials, FAQs, and a WhatsApp widget. Under that sits the quote page: a free enquiry for sourcing, export, shipping, or inspections, with a 4-hour response promise.',
          'Built in Next.js and TypeScript, with Tailwind CSS for the UI, React Hook Form and Yup for validation, and Framer Motion for motion.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'One form cannot serve six logistics products. A sourcing brief wants make, budget, and destination; a RoRo booking wants origin port, destination, and whether the car runs. The quote flow had to feel like one product while the questions changed underneath — without dumping a wall of unused fields on someone who only needs an inspection.',
          'The marketing pages had to carry weight (real deliveries, real quotes) without slowing the path to “Request a Quote.” Those are two different surfaces sharing one brand.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at babsautologistics.com as the public front door for quotes, WhatsApp, and inbound enquiries.',
        ],
      },
    ],
  },
  {
    slug: 'trovo',
    title: 'Trovo',
    tagline: 'Buy data, airtime, and bills in seconds — on the web, WhatsApp, or Telegram.',
    tag: 'VTU platform',
    company: 'Trovo',
    period: 'May 2026',
    current: true,
    status: 'In production',
    role: ['Full Stack Development'],
    summary:
      'The Nigerian VTU product behind trovo.ng — cheapest-route data, airtime, electricity, cable, and exam pins from one wallet, plus WhatsApp and Telegram bots that run the same purchase flow in chat.',
    description:
      'I built Trovo end to end: the customer site and wallet dashboard, the Laravel API that funds, routes, and refunds orders, and the WhatsApp and Telegram bots so people can buy without leaving the chat they already live in.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Laravel',
      'TanStack Query',
      'Monnify',
      'WhatsApp Cloud API',
      'Telegram Bot API',
    ],
    links: [
      { label: 'trovo.ng', href: 'https://trovo.ng/' },
      { label: 'WhatsApp bot', href: 'https://wa.me/2349124904305?text=%2Fstart' },
      { label: 'Telegram', href: 'https://t.me/TrovoNGBot?start=welcome' },
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Most Nigerians still buy data and pay bills through a patchwork of websites, USSD, and agent shops — and they overpay. Trovo had to be the cheaper, faster path: MTN, Glo, Airtel, and 9mobile data and airtime, DSTV / GOtv / Startimes, electricity tokens, and exam pins, from one wallet.',
          'A lot of that audience never opens a browser. The product also had to work where they already are — WhatsApp and Telegram — with the same prices, wallet, and receipts as the website.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The web app is the full surface: a marketing site that sells cheapest-route VTU, then a dashboard for wallet, airtime, data, electricity, cable, exam pins, betting, recharge cards, referrals, schedules, and receipts. Next.js and TypeScript on the front; Laravel behind it. The wallet funds by dedicated bank transfer or card via Monnify, and a live price table plus smart routing keep the catalog cheaper than the usual VTU sites.',
          'The bots are not a FAQ layer. WhatsApp (Trovo Assistant on 09124904305) and Telegram share the same purchase pipeline as the site — pick a network or bill, confirm, debit the wallet, deliver, send a receipt. The chat greets the same account as the dashboard, so the two products stay one wallet.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'A naira can only move once. Wallet credits from bank transfers, VTU debit, provider routing, and auto-refund on failed delivery all have to agree — including when two people buy at once, or when one fulfilment route is down and another is cheaper.',
          'Chat is a worse checkout than a website: session state, button lists, and a short menu instead of a form. The bot had to feel short; the dashboard had to stay detailed. Same wallet, two very different products.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at trovo.ng and in daily use. Customers buy from the site, the WhatsApp bot, or @TrovoNGBot on Telegram, with the same wallet and catalog behind all three.',
        ],
      },
    ],
  },
  {
    slug: 'bl-practice-hub',
    title: 'BL Practice Hub',
    tagline: 'Legal work that starts online, not in a waiting room.',
    tag: 'Digital law firm',
    company: 'BL Practice Hub',
    period: 'Dec 2025',
    status: 'In production',
    role: ['Frontend Development'],
    summary:
      'The public site for a Nigerian digital law firm — practice areas, contact, and Notariza, a document notarization flow for individuals, SMEs, and government clients.',
    description:
      'I built BL Practice Hub’s website: the firm’s public presence, the contact form that reaches the lawyers, and Notariza — the digital notarization product people open when they need a document done.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'HeroUI',
      'React Hook Form',
      'Yup',
      'Framer Motion',
    ],
    links: [{ label: 'blpracticehub.com', href: 'https://blpracticehub.com/' }],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'BL Practice Hub is a Lagos- and Abuja-based digital law firm in transaction law and government relations. Their clients — MDAs, SMEs, investors, and individuals — still expected legal work to start with a phone call or a walk-in. The firm needed a site that could sell the practice and actually take work: explain the services, collect a real enquiry, and get a notarization request to a licensed practitioner.',
          'The website had to carry both jobs: a calm, credible firm site, and a short product path for documents that people need done this week.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The marketing site is the front door — hero and practice areas, services for transactions, compliance, real estate, government relations, and tax, plus team and contact. Under that sits Notariza: document services (affidavits, powers of attorney, certifications, CAC filings), a Get Started intake with identity details (NIN, date of birth, purpose), and a handoff to the lawyers. Contact form submissions go out from the site.',
          'Built in Next.js and TypeScript, with Tailwind and HeroUI for the UI, React Hook Form and Yup for validation, and Framer Motion for motion.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'A law firm site has to feel like a chambers; a notarization product has to feel like software. Same brand, two different jobs. The intake collects sensitive identity data — NIN, date of birth, purpose — so the form has to be complete enough for a practitioner and short enough that people finish it.',
          'Corporate clients and someone who just needs an affidavit share one site; the tone and the path had to work for both.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at blpracticehub.com. Notariza is the product people open for notarization, certification, and regulatory documents.',
        ],
      },
    ],
  },
  {
    slug: 'klone-customer',
    title: 'Klone Customer',
    tagline: 'Find a nearby professional, book a slot, walk in with a ticket.',
    tag: 'Customer mobile app',
    mediaFit: 'contain',
    company: 'Klone',
    period: 'Oct 2025',
    current: true,
    status: 'In production',
    role: ['Mobile Development'],
    summary:
      'The iOS and Android customer app for Klone — discovery, booking, payments, and tickets for salons, spas, and other lifestyle services in Lagos.',
    description:
      'I build and maintain Klone’s customer mobile app: browse without an account, book a professional in a few screens, pay in-app, and show up with a QR ticket.',
    stack: [
      'React Native',
      'TypeScript',
      'NativeWind',
      'TanStack Query',
      'Zustand',
      'React Navigation',
      'Paystack',
      'Google Maps API',
      'OneSignal',
    ],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/ng/app/klone-for-customer/id6755367040' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.klone_customer' },
      { label: 'useklone.com', href: 'https://www.useklone.com/' },
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Klone is a Lagos booking marketplace for personal-service businesses — hairdressers, barbers, spas — still taking appointments over calls and WhatsApp. Customers needed a phone-native path: find someone nearby, pick a service and a professional, pay, and walk in with a ticket. The web product already covered that flow in a browser; this app had to feel like the thing you actually keep on your home screen.',
          'Browse had to work before sign-in. Account, bookings, and checkout could wait until the customer was ready to commit.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'Home and Explore are location-aware: GPS first, with a pin search when that is off, so listings, distance, and prices match where the customer actually is. Category search, rating and price filters, provider pages with availability and reviews, then a short book — service, professional, date, checkout. Favourites and a referral code sit on the home screen.',
          'Checkout is two steps: order summary (fees, duration, professional), then payment. In Nigeria that is full payment or a 20% reservation deposit; UK customers can pay by bank transfer. Google and Apple sign-in sit next to email when the guest path hits a wall. Built in React Native and TypeScript, with NativeWind, TanStack Query, Zustand for the in-progress booking, and React Navigation for the stack and tabs.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'The guest path had to stay open without leaking booked state. Home, categories, and provider pages are public; Bookings, Profile, and checkout ask for an account, then return the customer to the screen they were on — including mid-book.',
          'Availability, payment, and the ticket have to agree. A slot is held, payment confirms it, and the QR the customer holds has to match what the merchant scans. Location is never a single source: GPS, a search pin, and “use current location” all feed the same market context, or the catalogue fails silently.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live on the App Store and Google Play alongside useklone.com, in daily use as the customer half of the same booking system.',
        ],
      },
    ],
  },
  {
    slug: 'run-web',
    title: 'RUN',
    tagline: 'Last-mile delivery for Africa.',
    tag: 'Logistics website',
    company: 'RUN',
    period: 'Oct 2025',
    status: 'In production',
    role: ['Frontend Development'],
    summary:
      'The public website for RUN — last-mile delivery across Lagos, Nigeria, and internationally, with pages for businesses, riders, wallet, and green logistics.',
    description:
      'I built the marketing site on rundeliverys.com: the homepage that introduces RUN, and the pages for businesses, Run Champions, wallet, green logistics, and contact sales.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    links: [{ label: 'rundeliverys.com', href: 'https://rundeliverys.com/' }],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'RUN is a last-mile logistics company in Lagos — local city delivery, nationwide across Nigeria, and international shipping. Businesses needed a site that explained the product, pointed them to the app and the business dashboard, and gave riders a place to join as Run Champions.',
          'The website had to cover that path: a homepage that sells last-mile delivery, dedicated pages for each solution, and a contact-sales form for companies that want to talk.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The site is what people open first — a homepage with vision, mission, and solutions (local, interstate, international, green logistics, Run AI, Run Wallet), a business page covering order management, API, bulk upload, and route optimization, a Run Champion page for riders, a wallet page, and contact sales.',
          'Built in Next.js and TypeScript, with Tailwind CSS for the UI.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at rundeliverys.com, with the RUN app on Google Play and the App Store, and offices in Lagos and Kigali.',
        ],
      },
    ],
  },
  {
    slug: 'buddie-x',
    title: 'Buddie-X',
    tagline: 'Find the right mentor for your next big move.',
    tag: 'Mentorship marketplace',
    company: 'Buddie-X',
    period: 'Mar 2025',
    current: true,
    status: 'In production',
    role: ['Full Stack Development'],
    summary:
      'The mentorship marketplace behind Buddie-X — goal-based discovery, 1:1 booking, sessions, community, and wallets for mentors and mentees worldwide.',
    description:
      'I built Buddie-X end to end: the marketplace on buddie-x.com, the mentor and mentee dashboards that run bookings and wallets, and the Laravel API that keeps sessions, payments, and community in sync.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'TanStack Query',
      'Redux Toolkit',
      'Laravel',
      'Stripe',
      'Firebase',
      'Pusher',
    ],
    links: [{ label: 'buddie-x.com', href: 'https://www.buddie-x.com/' }],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Buddie-X is a two-sided marketplace for 1:1 mentorship — career, technology, business, and personal growth. People making a next move were stuck between generic courses and whoever they already knew. Mentors had expertise but no clean way to show up, take bookings, and get paid.',
          'The product had to carry both sides of that flow: a short mentee path from a goal to a confirmed session, and a working layer mentors could run themselves. Community questions sit next to booking, so you can ask before you pay.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The public app is what people actually open — a homepage that sells the product, a three-step matcher, category search, marketplace cards with ratings, next availability, and starting price, filtered Pro and full catalogs, profile pages with time blocks, and per-session checkout. Mentors and mentees each get a dashboard for bookings, messages, sessions, and wallets. Community Q&A, mentorship circles, and the blog ship alongside the catalog.',
          'The frontend is React and TypeScript on Vite, with Tailwind and HeroUI for the UI, TanStack Query and Redux for server and session state, Firebase for push notifications, and Pusher for live chat. The API is Laravel. Stripe handles payments and refunds; Zoom is the 1:1 session itself.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'Mentors sit in different time zones from the people booking them, so next availability on a card has to match the slot the mentor actually holds. A paid session, a cancel inside the 24-hour refund window, and a mentor withdrawal all have to land on the same ledger.',
          'The mentee path has to stay short — share a goal, get matched, book. The mentor dashboard has to stay detailed enough for people who live in it: offerings, availability, messages, reviews, wallet. Those are two products sharing one booking system.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at buddie-x.com and in daily use, with mentee and mentor dashboards, community, and the blog shipping alongside the marketplace as more mentors come onto the platform.',
        ],
      },
    ],
  },
  {
    slug: 'klone',
    title: 'Klone',
    tagline: 'Book trusted lifestyle professionals.',
    tag: 'Booking platform',
    company: 'Klone',
    period: 'Nov 2024',
    current: true,
    status: 'In production',
    role: ['Frontend Development'],
    summary:
      'The web app behind Klone — discovery, reservations, tickets, and maps for salons, spas, and other lifestyle services in Lagos.',
    description:
      'I build and maintain Klone’s web app on useklone.com: search and listings, provider pages, checkout, booking tickets, maps, and the homepage that introduces the product.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'NextAuth',
      'TanStack Query',
      'Google Maps API',
      'Google Calendar API',
    ],
    links: [{ label: 'useklone.com', href: 'https://www.useklone.com/' }],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Klone is a Lagos booking marketplace for personal-service businesses — hairdressers, barbers, spas. People needed a web app where they could find a nearby provider, pick a service and a professional, and walk in with a ticket.',
          'The frontend had to cover that path end to end: a homepage that sells the product, search and listings, provider pages, checkout, and the screens a business owner uses to manage bookings.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'The web app is what people open — category search, listing cards with distance and price, provider pages, checkout with VAT and promo codes, booking tickets with a QR code, and Google Maps directions. I also built the marketing homepage, including the carousel and slides that introduce the product.',
          'Built in Next.js and TypeScript, with NextAuth for Google sign-in, TanStack Query for server state, and the Google Maps API for location and directions.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'Off-the-shelf date pickers never quite fit the booking UI, so I built a custom one rather than bending a library around the design.',
          'Nearby search depended on the browser’s location API. It worked on Windows, then broke when I switched to a MacBook — so I had to rethink how we get a user’s location, with IP geolocation as a fallback when the device API fails.',
          'The homepage carousel was another stubborn piece: slides that feel like part of the product, with the right timing, motion, and layout across breakpoints, instead of a generic slideshow.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live at useklone.com and in daily use, with the customer and merchant mobile apps shipping alongside it as restaurants and car rentals come onto the platform.',
        ],
      },
    ],
  },
]
