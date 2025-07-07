import { useNotification, NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from './Hooks/useNotification';

/**
 * Example of how to use the notification system in a component
 */
export const useNotificationExample = () => {
  const {
    isInitialized,
    hasPermission,
    fcmToken,
    displayNotification,
    displayCustomNotification,
  } = useNotification();

  /**
   * Example: Display a simple notification
   */
  const showSimpleNotification = async () => {
    try {
      await displayNotification({
        title: 'Order Update',
        body: 'Your order #12345 has been confirmed!',
        data: {
          orderId: '12345',
          type: NOTIFICATION_TYPES.ORDER_UPDATE,
        },
        channelId: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  /**
   * Example: Display a custom notification with sound
   */
  const showCustomNotification = async () => {
    try {
      await displayCustomNotification({
        title: 'Special Offer!',
        body: 'Get 20% off on your next order',
        data: {
          promoCode: 'SAVE20',
          type: NOTIFICATION_TYPES.PROMO,
        },
        channelId: NOTIFICATION_CHANNELS.CUSTOM_SOUND,
        sound: 'noti',
        icon: 'qv_blue',
        color: '#FF6B6B',
        bigText: 'Limited time offer! Use code SAVE20 to get 20% off on your next order. Hurry up, this offer expires soon!',
      });
    } catch (error) {
      console.error('Error showing custom notification:', error);
    }
  };

  /**
   * Example: Display a notification with custom data
   */
  const showOrderNotification = async (orderId: string, status: string) => {
    try {
      await displayNotification({
        title: `Order ${status}`,
        body: `Your order #${orderId} has been ${status.toLowerCase()}`,
        data: {
          orderId,
          status,
          type: NOTIFICATION_TYPES.ORDER_UPDATE,
          timestamp: new Date().toISOString(),
        },
        channelId: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
      });
    } catch (error) {
      console.error('Error showing order notification:', error);
    }
  };

  return {
    isInitialized,
    hasPermission,
    fcmToken,
    showSimpleNotification,
    showCustomNotification,
    showOrderNotification,
  };
};

/**
 * Example usage in a component:
 * 
 * ```tsx
 * import React from 'react';
 * import { View, Button } from 'react-native';
 * import { useNotificationExample } from '../utils/notificationExample';
 * 
 * const NotificationDemo = () => {
 *   const {
 *     isInitialized,
 *     hasPermission,
 *     showSimpleNotification,
 *     showCustomNotification,
 *     showOrderNotification,
 *   } = useNotificationExample();
 * 
 *   return (
 *     <View>
 *       <Button
 *         title="Show Simple Notification"
 *         onPress={showSimpleNotification}
 *         disabled={!isInitialized || !hasPermission}
 *       />
 *       <Button
 *         title="Show Custom Notification"
 *         onPress={showCustomNotification}
 *         disabled={!isInitialized || !hasPermission}
 *       />
 *       <Button
 *         title="Show Order Notification"
 *         onPress={() => showOrderNotification('12345', 'Confirmed')}
 *         disabled={!isInitialized || !hasPermission}
 *       />
 *     </View>
 *   );
 * };
 * ```
 */ 