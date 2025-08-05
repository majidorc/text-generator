# Apple App Store Publishing Guide

## 🍎 **Step-by-Step Process**

### **Step 1: Apple Developer Account**
1. Sign up at https://developer.apple.com/ ($99/year)
2. Complete enrollment process
3. Get your Team ID from Apple Developer portal

### **Step 2: App Store Connect Setup**
1. Go to https://appstoreconnect.apple.com/
2. Create a new app
3. Get your App ID (ascAppId)
4. Note your Apple ID email

### **Step 3: Update EAS Configuration**
Replace the placeholders in `eas.json`:
```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-actual-apple-id@example.com",
        "ascAppId": "your-actual-app-store-connect-app-id",
        "appleTeamId": "your-actual-apple-team-id"
      }
    }
  }
}
```

### **Step 4: Build for Production**
```bash
# Build the production version
eas build --platform ios --profile production
```

### **Step 5: Submit to App Store**
```bash
# Submit to App Store Connect
eas submit --platform ios
```

## 📱 **Alternative Methods**

### **Method A: EAS Submit (Recommended)**
- Automatic upload to App Store Connect
- Handles code signing automatically
- One command: `eas submit --platform ios`

### **Method B: Manual Upload**
1. Download `.ipa` file from EAS build
2. Use Xcode or Application Loader
3. Upload to App Store Connect manually

### **Method C: App Store Connect Web**
1. Build with EAS
2. Download `.ipa` file
3. Upload via App Store Connect web interface

## 🔧 **Required Information**

### **Apple Developer Account:**
- Apple ID email
- Team ID (found in Apple Developer portal)
- App Store Connect App ID

### **App Store Connect:**
- App name: "Thailand Tours Generator"
- Bundle ID: `com.tours.thailandgenerator`
- Category: Travel or Business
- Description and screenshots

## ⚠️ **Important Notes**

1. **Apple Developer Account Required** ($99/year)
2. **App Review Process** (1-7 days typically)
3. **App Store Guidelines** must be followed
4. **Privacy Policy** required for App Store
5. **Screenshots** needed for App Store listing

## 🚀 **Quick Start (Once you have Apple Developer Account)**

```bash
# 1. Update eas.json with your Apple credentials
# 2. Build for production
eas build --platform ios --profile production

# 3. Submit to App Store
eas submit --platform ios

# 4. Wait for Apple review (1-7 days)
```

## 📋 **App Store Requirements Checklist**

- [ ] Apple Developer Account ($99/year)
- [ ] App Store Connect app created
- [ ] App icons (1024x1024)
- [ ] Screenshots for different devices
- [ ] App description and keywords
- [ ] Privacy policy URL
- [ ] App review guidelines compliance
- [ ] TestFlight testing (optional but recommended)

## 🎯 **Estimated Timeline**

1. **Setup**: 1-2 hours
2. **Build**: 10-30 minutes
3. **Submit**: 5 minutes
4. **Apple Review**: 1-7 days
5. **App Store Live**: After approval

---

**Need help?** Check Expo's documentation: https://docs.expo.dev/submit/ios/ 