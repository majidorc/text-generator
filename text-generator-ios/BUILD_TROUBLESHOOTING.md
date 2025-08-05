# EAS Build Troubleshooting Guide

## 🔧 **Build Failed - Common Solutions**

### **Issue: "exited with non-zero code: 1"**

This usually means there's a configuration or dependency issue.

## 🚀 **Quick Fix Steps:**

### **Step 1: Try the Simplified Version**
I've created a simplified `App.js` and `package.json` for testing.

### **Step 2: Check EAS Configuration**
```bash
# Make sure you're logged in
eas login

# Check your project configuration
eas build:configure
```

### **Step 3: Try Different Build Profile**
```bash
# Try development build first
eas build --platform ios --profile development

# If that works, try production
eas build --platform ios --profile production
```

### **Step 4: Check Build Logs**
- Go to https://expo.dev/
- Find your project
- Check the build logs for specific errors

## 🔍 **Common Issues & Solutions:**

### **Issue 1: Missing Dependencies**
**Solution:** The simplified `package.json` should fix this.

### **Issue 2: Navigation Setup**
**Solution:** Simplified `App.js` removes navigation complexity.

### **Issue 3: Metro Configuration**
**Solution:** Added `metro.config.js` file.

### **Issue 4: Babel Configuration**
**Solution:** Added `babel-preset-expo` to devDependencies.

## 📱 **Test Build Commands:**

```bash
# 1. Test with simplified version
eas build --platform ios --profile development

# 2. If successful, try production
eas build --platform ios --profile production

# 3. If still failing, check logs
# Go to https://expo.dev/ and check build logs
```

## 🔄 **If Simplified Version Works:**

Once the simplified version builds successfully, we can gradually add back:
1. Navigation components
2. React Native Paper
3. Commission Calculator
4. Other features

## 📋 **Next Steps:**

1. **Try the simplified build** (current setup)
2. **Check build logs** for specific errors
3. **Gradually add features** back once basic build works
4. **Test on device** with Expo Go app

## 🆘 **Still Having Issues?**

1. **Check Expo documentation**: https://docs.expo.dev/build/setup/
2. **Join Expo Discord**: https://discord.gg/expo
3. **Check build logs** for specific error messages

---

**Current Status:** Simplified version ready for testing 