# 🔔 Backend Notification Guide - Fix Duplicate Notifications

## **Problem: Duplicate Notifications**
You're getting duplicate notifications because both foreground and background handlers are being triggered for the same message.

## **Solution: Proper Message Structure**

### **Option 1: Use Notification Payload (Recommended)**

For messages that should show notifications in both foreground and background:

```java
Message message = Message.builder()
    .setToken(token)
    .setNotification(
        Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build()
    )
    .setAndroidConfig(
        AndroidConfig.builder()
            .setPriority(AndroidConfig.Priority.HIGH)
            .setNotification(
                AndroidNotification.builder()
                    .setSound("noti")
                    .setTitle(title)
                    .setBody(body)
                    .setIcon("qv_blue")
                    .setChannelId("custom-sound")
                    .build()
            )
            .build()
    )
    .setApnsConfig(
        ApnsConfig.builder()
            .setAps(Aps.builder().setContentAvailable(true).build())
            .putHeader("apns-priority", "10")
            .putHeader("apns-push-type", "alert")
            .putHeader("apns-topic", "in.quickverse.quickverseapp")
            .build()
    )
    .putData("customBody", customBody)
    .build();
```

**Result:** 
- ✅ System handles background notifications automatically
- ✅ Foreground handler only processes when app is open
- ✅ No duplicates

### **Option 2: Data-Only Messages**

For messages that need custom handling:

```java
Message message = Message.builder()
    .setToken(token)
    .putData("title", title)
    .putData("body", body)
    .putData("customBody", customBody)
    .putData("type", "order_update")
    .putData("orderId", "12345")
    .setAndroidConfig(
        AndroidConfig.builder()
            .setPriority(AndroidConfig.Priority.HIGH)
            .build()
    )
    .setApnsConfig(
        ApnsConfig.builder()
            .setAps(Aps.builder().setContentAvailable(true).build())
            .putHeader("apns-priority", "10")
            .putHeader("apns-push-type", "background")
            .putHeader("apns-topic", "in.quickverse.quickverseapp")
            .build()
    )
    .build();
```

**Result:**
- ✅ Background handler processes data-only messages
- ✅ Foreground handler ignores data-only messages
- ✅ No duplicates

## **Message Types & When to Use Each**

### **1. Notification Payload (Option 1)**
**Use for:**
- Order updates
- Promotional messages
- General announcements
- Any message that should show a notification

**Structure:**
```json
{
  "notification": {
    "title": "Order Confirmed",
    "body": "Your order #12345 has been confirmed"
  },
  "data": {
    "orderId": "12345",
    "type": "order_update"
  }
}
```

### **2. Data-Only Messages (Option 2)**
**Use for:**
- Silent updates
- Data synchronization
- Background processing
- Messages that need custom handling

**Structure:**
```json
{
  "data": {
    "title": "Order Confirmed",
    "body": "Your order #12345 has been confirmed",
    "orderId": "12345",
    "type": "order_update"
  }
}
```

## **Current App Behavior**

### **Foreground Handler**
- ✅ Processes messages with `notification` payload
- ✅ Shows notifications when app is open
- ✅ Ignores data-only messages

### **Background Handler**
- ✅ Processes data-only messages
- ✅ Shows notifications for data-only messages
- ✅ Ignores messages with `notification` payload

## **Testing**

### **Test Case 1: Notification Payload**
```java
// This should show notification in both foreground and background
Message message = Message.builder()
    .setToken(token)
    .setNotification(Notification.builder().setTitle("Test").setBody("Test message").build())
    .putData("test", "true")
    .build();
```

### **Test Case 2: Data-Only Message**
```java
// This should only show notification in background
Message message = Message.builder()
    .setToken(token)
    .putData("title", "Test")
    .putData("body", "Test message")
    .putData("test", "true")
    .build();
```

## **Recommended Implementation**

**For your current backend message:**
```java
Message message = Message.builder()
    .setToken(token)
    .setNotification(
        Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build()
    )
    .setAndroidConfig(
        AndroidConfig.builder()
            .setPriority(AndroidConfig.Priority.HIGH)
            .setNotification(
                AndroidNotification.builder()
                    .setSound("noti")
                    .setTitle(title)
                    .setBody(body)
                    .setIcon("qv_blue")
                    .setChannelId("custom-sound")
                    .build()
            )
            .build()
    )
    .setApnsConfig(
        ApnsConfig.builder()
            .setAps(Aps.builder().setContentAvailable(true).build())
            .putHeader("apns-priority", "10")
            .putHeader("apns-push-type", "alert")
            .putHeader("apns-topic", "in.quickverse.quickverseapp")
            .build()
    )
    .putData("customBody", customBody)
    .build();
```

**This will:**
- ✅ Show notifications in both foreground and background
- ✅ Use system notification handling for background
- ✅ Use custom Notifee handling for foreground
- ✅ No duplicate notifications
- ✅ Proper sound and styling

## **Key Points**

1. **Notification Payload**: System handles background, app handles foreground
2. **Data-Only**: App handles both background and foreground
3. **No Mixing**: Don't send both notification payload and data-only content
4. **Testing**: Test both scenarios to ensure no duplicates

## **Debugging**

If you still see duplicates, check:
1. Message structure in Firebase Console
2. App logs for "Already handling notification" messages
3. Ensure only one handler processes each message type 