# Thailand Tours Operator & Customer Form

This project is a modern, responsive web app built with Next.js and Material-UI (MUI). It is designed for tour operators or travel agencies (like [tours.co.th](https://tours.co.th)) to quickly collect and confirm booking details in a beautiful, user-friendly way.

## Features

- **Operator Form**: Enter booking number, program, name, tour date, hotel, phone, address options, PAX (adults, children, infants), cash on tour, and national park fee. Instantly generates a confirmation message you can copy/share. Automatically copies the confirmation to your clipboard after submit. **Click the CLEAR button to instantly reset all fields, including the shared name.**
- **Customer Form**: Enter tour date, name, pick up (auto-filled from hotel in Operator Form), pickup time (from/to), and optionally FEE Adult/Child fields. Instantly preview and copy a formatted confirmation email. Toggle FEE fields by clicking "With Fee". **Click the CLEAR button to instantly reset all fields, including the shared name.**
- **Unified Header**: Easily switch between Operator Form and Customer Form using the top menu. The dark/light mode toggle is now in the header for quick access.
- **Dark/Light Mode**: Toggle between beautiful dark and light themes. All elements adapt automatically.
- **Auto-Sync Fields**: Hotel field in Operator Form always syncs to Pick Up in Customer Form (unless address option is Send Later or No Transfer).
- **Consistent UI**: All action buttons are the same size, styled for both dark and light mode, and always contained within the form box.
- **PWA (Progressive Web App) Support**: Install this app on your device for a native-like experience. Works offline and can be added to your home screen on mobile and desktop. Manifest is fully PWA Builder compliant.
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

## How to use it

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
- **Unified header navigation**: Quickly switch between Operator Form and Customer Form.
- **Dark/light mode**: Instantly toggle for the best experience in any environment.

---

**See the full changelog in [CHANGELOG.md](./CHANGELOG.md) for a detailed history of all updates and improvements.**

---

<sub>&lt;3 Tours.co.th</sub> 