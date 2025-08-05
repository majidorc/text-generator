# Thailand Tours Generator - iOS App

This is the iOS version of your Thailand Tours Generator app, built with Expo and React Native.

## Features

- **Operator Form**: Create booking confirmations for tour operators
- **Customer Form**: Generate customer confirmation emails with transfer options
- **Commission Calculator**: Calculate retail prices with preset commission rates (22%, 30%, 32%)

## Setup Instructions

### Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - This will also install npm

2. **Install EAS CLI**
   ```bash
   npm install --global eas-cli
   ```

3. **Install Expo Go app** on your iPhone
   - Download from App Store: "Expo Go"

### Running the App

1. **Install dependencies**
   ```bash
   cd text-generator-ios
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on iOS**
   - Scan the QR code with your iPhone camera
   - Or press 'i' in the terminal to open iOS simulator

### Building for App Store with EAS

1. **Login to Expo**
   ```bash
   eas login
   ```

2. **Initialize EAS** (already configured with project ID: 84b62730-f0e5-4b9f-a9cd-f810835903ed)
   ```bash
   eas init --id 84b62730-f0e5-4b9f-a9cd-f810835903ed
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

4. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

## App Structure

- `App.js` - Main app with navigation
- `components/CommissionCalculator.js` - Commission calculator screen (fully functional)
- `components/OperatorForm.js` - Operator form screen (placeholder)
- `components/CustomerForm.js` - Customer form screen (placeholder)
- `eas.json` - EAS build configuration
- `app.json` - Expo app configuration with EAS project ID

## Current Status

✅ **Completed:**
- Project structure with EAS configuration
- Commission Calculator (fully functional)
- Bottom tab navigation
- Material Design components

🔄 **In Progress:**
- Converting OperatorForm and CustomerForm from web to React Native

## Next Steps

1. Convert the remaining components (OperatorForm, CustomerForm)
2. Add proper icons and splash screen
3. Test on real iOS device
4. Build and submit to App Store using EAS

## Development Notes

- Uses React Native Paper for Material Design components
- Bottom tab navigation for easy switching between forms
- Dark/light mode support
- Responsive design for iPhone and iPad
- EAS project ID: 84b62730-f0e5-4b9f-a9cd-f810835903ed

---

Built with ❤️ using [@cursor](https://github.com/getcursor/cursor) AI assistant 