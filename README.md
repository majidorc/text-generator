# Operator Form & Customer Page (Next.js + MUI)

This project is a modern, responsive web app built with Next.js and Material-UI (MUI). It is designed for tour operators or travel agencies (like [tours.co.th](https://tours.co.th)) to quickly collect and confirm booking details in a beautiful, user-friendly way.

**Live Demo:** [text.tours.co.th](https://text.tours.co.th)

## What is this?

- **Operator Form**: A web form for entering booking details: booking number, program, name, tour date, hotel, phone, address options, PAX (adults, children, infants), cash on tour, and national park fee. Instantly generates a confirmation message you can copy/share. Automatically copies the confirmation to your clipboard after submit.
- **Customer Page**: A dedicated form for customer booking confirmation. Enter tour date, name, pick up, pickup time (from/to), and optionally FEE Adult/Child fields. Instantly preview and copy a formatted confirmation email. Toggle FEE fields by clicking "With Fee". Designed for quick, accurate customer communication.
- **Persistent Side Menu**: Easily navigate between Operator Form and Customer pages using the always-visible (desktop) or toggleable (mobile) side menu.
- **PWA (Progressive Web App) Support**: Install this app on your device for a native-like experience. Works offline and can be added to your home screen on mobile and desktop.
- Fully responsive and easy to use on any device.
- Built and iterated **super fast and easily with the help of this AI assistant ([\@cursor](https://github.com/getcursor/cursor))**

## PWA Features

- **Installable**: Click the install prompt in your browser (or "Add to Home Screen" on mobile) to install the app like a native app.
- **Offline support**: The app works offline after the first load, thanks to service worker caching.
- **Home screen icon**: Custom icon and splash screen for a professional look.
- **Fast loading**: Instant startup from your device, even without a network connection.

## PWA Install Prompt Troubleshooting

If you do not see the install prompt:
- Make sure you are visiting the site over HTTPS (the live link above is correct).
- Use a supported browser (Chrome, Edge, Safari on iOS, etc.).
- You must visit the site at least once and interact with it.
- The prompt will not show if the app is already installed, or if you dismissed it recently.
- On desktop, look for a small install icon in the address bar. On mobile, use the browser menu and select "Add to Home Screen."
- The app must not be in incognito/private mode or inside an iframe.

**Custom Install Button:**
If you want a visible install button in the app, you can add a custom install button that appears when the browser allows. Just ask in an issue or request it through this application I use!

## How to use it (It's super easy!)

1. **Clone the repo:**
   ```sh
   git clone https://github.com/majidorc/text-generator.git
   cd text-generator
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run locally:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
4. **Deploy to Vercel:**
   - Push your code to GitHub (if not already).
   - Go to [vercel.com](https://vercel.com), import your repo, and deploy. That's it!

## Why is it so easy?

- **No backend needed**: All logic is in the frontend.
- **Modern stack**: Next.js + MUI = fast, beautiful, and production-ready.
- **PWA out of the box**: Install and use offline on any device.
- **AI-powered development**: All features, tweaks, and fixes were made in seconds with the help of this AI assistant ([\@cursor](https://github.com/getcursor/cursor)).
- **Copy-paste ready**: You can adapt this for any operator, agency, or booking workflow.
- **Side menu navigation**: Quickly switch between Operator Form and Customer pages.

---

**Enjoy your new operator & customer form app! If you want to add more features or change the style, just ask me (through this application I use) and it's done!**

---

<sub>&lt;3 Tours.co.th</sub> 