# 📱 دليل بناء تطبيق Event Hall Manager - APK

هذا الدليل سيساعدك على بناء ملف APK الخاص بتطبيق تسيير قاعة الحفلات خطوة بخطوة.

---

## ⏱️ الوقت المتوقع: 45-60 دقيقة

---

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من توفر:

✅ **Node.js 16+** - تحميل من https://nodejs.org/
✅ **npm أو yarn** - يأتي مع Node.js
✅ **Expo CLI** - سيتم تثبيته لاحقاً
✅ **حساب GitHub** - لاستنساخ المستودع
✅ **حساب Google** - لإعداد Google Cloud
✅ **Android Studio** (اختياري) - لاختبار محلي

---

## 🚀 الخطوة 1: استنساخ المستودع (5 دقائق)

### على Windows:

1. افتح **Command Prompt** أو **PowerShell**
2. اختر مجلد تريد حفظ المشروع فيه:
```bash
cd C:\Users\YourUsername\Documents
```

3. استنسخ المستودع:
```bash
git clone https://github.com/yasserdj2009-design/event-hall-manager.git
cd event-hall-manager
```

### على macOS/Linux:

```bash
cd ~/Documents
git clone https://github.com/yasserdj2009-design/event-hall-manager.git
cd event-hall-manager
```

✅ **تم: المشروع جاهز!**

---

## 📦 الخطوة 2: تثبيت المكتبات (10 دقائق)

في مجلد المشروع، قم بتثبيت جميع المكتبات:

```bash
npm install
```

أو إذا كنت تستخدم yarn:

```bash
yarn install
```

⏳ **سيأخذ هذا عدة دقائق - الرجاء الانتظار...**

✅ **تم: جميع المكتبات مثبتة!**

---

## 🔐 الخطوة 3: إعداد Google Cloud (15 دقيقة)

### الجزء أ: إنشاء مشروع Google Cloud

1. اذهب إلى https://console.cloud.google.com/
2. سجل الدخول بحسابك على جوجل
3. انقر على **"Select a project"** في الأعلى
4. اضغط على **"NEW PROJECT"**
5. أدخل اسم المشروع: `Event Hall Manager`
6. اضغط **"CREATE"** وانتظر (قد يأخذ دقيقة)

### الجزء ب: تفعيل الـ APIs

1. بحث عن **"Google Drive API"**
2. اضغط على النتيجة الأولى
3. اضغط **"ENABLE"**
4. ارجع وابحث عن **"Google+ API"**
5. اضغط **"ENABLE"**

### الجزء ج: إنشاء OAuth 2.0 Client ID

1. في الشريط الجانبي، انقر على **"Credentials"**
2. اضغط على **"+ CREATE CREDENTIALS"**
3. اختر **"OAuth 2.0 Client ID"**
4. إذا طُلب منك تكوين OAuth consent screen:
   - اختر **"External"**
   - اضغط **"CREATE"**
   - ملأ المعلومات الأساسية (الاسم مثلاً)
   - اضغط **"SAVE AND CONTINUE"**

5. في صفحة OAuth 2.0 Client ID:
   - اختر **"Android"** من القائمة المنسدلة
   - في **Package name**: أدخل `com.eventmanager.app`
   - في **SHA-1 certificate fingerprint**: 
     - افتح Command Prompt
     - أدخل:
     ```bash
     keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
     ```
     - انسخ قيمة **SHA1**

6. اضغط **"CREATE"**
7. اضغط **"DOWNLOAD"** لتحميل `google-services.json`

### الجزء د: وضع الملف في المشروع

1. انقل ملف `google-services.json` المُحمّل إلى **جذر مجلد المشروع**
2. تأكد أنه بجانب `package.json` و `app.json`

✅ **تم: Google Cloud مُعد!**

---

## ⚙️ الخطوة 4: إعداد EAS Build (5 دقائق)

### تثبيت EAS CLI:

```bash
npm install -g eas-cli
```

### تسجيل الدخول:

```bash
eas login
```

ستُطلب منك معلومات الدخول - استخدم حسابك على GitHub أو Expo.

### تكوين المشروع:

```bash
eas build:configure
```

اختر **"Android"** عندما يُطلب منك.

✅ **تم: EAS جاهز!**

---

## 🔨 الخطوة 5: بناء APK (15-30 دقيقة)

### للاختبار الأول (Preview - موصى به):

```bash
eas build --platform android --profile preview
```

### للبناء النهائي (Production):

```bash
eas build --platform android --profile production
```

⏳ **انتظر حتى ينتهي البناء - قد يأخذ 15-30 دقيقة**

ستظهر رسالة مثل:
```
✅ Build finished successfully!
📲 Download APK: https://...
```

---

## 📥 الخطوة 6: تحميل وتثبيت APK (5 دقائق)

### على جهازك الأندرويد:

1. افتح الرابط المعطى على جهازك الأندرويد
2. اضغط **"تحميل"** أو **"Download"**
3. بعد انتهاء التحميل، اضغط **"فتح"** أو **"Open"**
4. إذا ظهرت رسالة أمان:
   - اذهب إلى **الإعدادات** > **الأمان**
   - فعّل **"تثبيت التطبيقات من مصادر غير معروفة"**
   - ارجع وأكمل التثبيت

5. اضغط **"تثبيت"** أو **"Install"**
6. بعد انتهاء التثبيت، اضغط **"فتح"**

✅ **تم: التطبيق مثبت وجاهز للاستخدام!**

---

## 🐛 استكشاف الأخطاء

### مشكلة: فشل بناء APK

**الحل:**
```bash
# امسح cache
npm cache clean --force

# إعادة التثبيت
npm install

# حاول البناء مجددًا
eas build --platform android --profile preview
```

### مشكلة: لا يعمل Google Sign In

**الحل:**
- تأكد أن `google-services.json` في جذر المشروع
- تحقق من صحة Package Name و SHA-1 في Google Cloud
- أعد تثبيت التطبيق

### مشكلة: يقول "Internet connection required"

**الحل:**
- تأكد من اتصال الإنترنت
- انتظر قليلاً وحاول مرة أخرى

---

## 💡 نصائح مهمة

✨ احفظ نسخة من `google-services.json` في مكان آمن
✨ لا تشارك محتويات `google-services.json` مع أحد
✨ استخدم Profile preview للاختبار و production للإطلاق
✨ اختبر التطبيق على عدة أجهزة قبل النشر

---

## 🎉 النتيجة النهائية

بعد اتباع هذا الدليل، ستحصل على:

✅ ملف APK جاهز للتثبيت
✅ تطبيق موبايل كامل لتسيير قاعة الحفلات
✅ نسخ احتياطي على جوجل درايف
✅ إدارة الحجوزات والعملاء والفعاليات
✅ إحصائيات وتقارير فورية

---

## 📞 الدعم والمساعدة

إذا واجهت مشكلة:

1. راجع قسم \"استكشاف الأخطاء\"
2. تحقق من توثيق Expo: https://docs.expo.dev/
3. ابحث على Stack Overflow
4. افتح issue على GitHub

---

## 🎓 المراجع والروابط المهمة

- Expo Documentation: https://docs.expo.dev/
- EAS Build: https://docs.expo.dev/build/introduction/
- Google Cloud Console: https://console.cloud.google.com/
- React Native: https://reactnative.dev/
- Expo Go App: https://expo.dev/client

---

**حظاً موفقاً! 🚀**

**تم إنشاء هذا الدليل بواسطة GitHub Copilot**
**آخر تحديث: 2026-09-11**
"