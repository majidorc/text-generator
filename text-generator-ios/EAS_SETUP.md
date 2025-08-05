# EAS Setup Guide

## Fix for "Failed to read '/eas.json'" Error

### Step 1: Install Node.js and EAS CLI
```bash
# Download Node.js from https://nodejs.org/
# Then install EAS CLI
npm install --global eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```

### Step 3: Initialize EAS (This will fix the eas.json issue)
```bash
eas build:configure
```

### Step 4: Build the iOS App
```bash
eas build --platform ios
```

## Alternative: Use Expo's Web Interface

1. Go to https://expo.dev/
2. Sign in with your Expo account
3. Click "New Project"
4. Import from GitHub: `majidorc/text-generator`
5. Select the `text-generator-ios` folder
6. Build for iOS

## Current Status

✅ **Ready Files:**
- `App.js` - Main app with navigation
- `CommissionCalculator.js` - Fully functional calculator
- `eas.json` - Basic EAS configuration
- `app.json` - Expo configuration with project ID

🔄 **Next Steps:**
1. Run `eas build:configure` to fix the configuration
2. Build the iOS app
3. Test on device

## Project ID
Your EAS project ID: `84b62730-f0e5-4b9f-a9cd-f810835903ed` 