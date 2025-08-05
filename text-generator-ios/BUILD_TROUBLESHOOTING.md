# EAS Build Troubleshooting Guide

## 🔧 **Build Failed - "exited with non-zero code: 1"**

This error usually indicates a configuration or dependency issue.

## 🚀 **Step-by-Step Fix:**

### **Step 1: Check EAS Login**
```bash
# Make sure you're logged in to Expo
eas login
```

### **Step 2: Try Development Build First**
```bash
# Development builds are more forgiving
eas build --platform ios --profile development
```

### **Step 3: If Development Works, Try Production**
```bash
# Only try production after development succeeds
eas build --platform ios --profile production
```

### **Step 4: Check Build Logs**
1. Go to https://expo.dev/
2. Find your project
3. Click on the failed build
4. Check the detailed logs for specific errors

## 🔍 **Common Issues & Solutions:**

### **Issue 1: Missing Assets**
**Solution:** Removed icon and splash references from app.json

### **Issue 2: EAS Configuration**
**Solution:** Simplified eas.json to basic configuration

### **Issue 3: Dependencies**
**Solution:** Using minimal package.json with only essential packages

### **Issue 4: Babel Configuration**
**Solution:** Updated babel.config.js with explicit plugins array

## 📱 **Alternative Approaches:**

### **Option A: Use Expo's Web Interface**
1. Go to https://expo.dev/
2. Create new project
3. Import from GitHub: `majidorc/text-generator`
4. Select `text-generator-ios` folder
5. Build via web interface

### **Option B: Try Different EAS Commands**
```bash
# Initialize EAS properly
eas build:configure

# Try with explicit platform
eas build --platform ios --clear-cache

# Try with different profile
eas build --platform ios --profile preview
```

### **Option C: Check Project Structure**
```bash
# Make sure you're in the right directory
cd text-generator-ios

# Check if all files exist
ls -la

# Verify package.json
cat package.json
```

## 🔄 **If Still Failing:**

### **Step 1: Check Specific Error**
- Look at the build logs for the exact error message
- Common errors: missing dependencies, syntax errors, configuration issues

### **Step 2: Try Minimal Test**
- The current App.js is minimal
- If this fails, the issue is with project setup, not code

### **Step 3: Verify EAS Project**
- Make sure project ID is correct: `84b62730-f0e5-4b9f-a9cd-f810835903ed`
- Check if project exists in Expo dashboard

## 📋 **Current Setup:**

✅ **Simplified Configuration:**
- Minimal app.json (no assets)
- Basic eas.json
- Simple App.js
- Essential dependencies only

✅ **Files Ready:**
- App.js - Basic "Hello World"
- package.json - Minimal dependencies
- babel.config.js - Basic configuration
- metro.config.js - Metro setup
- .expo/settings.json - Expo settings

## 🆘 **Next Steps:**

1. **Try development build first**
2. **Check build logs for specific errors**
3. **Try Expo web interface if command line fails**
4. **Contact Expo support if still failing**

---

**Current Status:** Minimal configuration ready for testing 