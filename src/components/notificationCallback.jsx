// clevertapUtils.js

export const notificationCallback = function (response) {
    if (response.fromCleverTap) {
      // User interacted with the CleverTap push notification
      if (response.isPositiveAction) {
        // User clicked 'Sign me up!' button
        console.log('User clicked Sign me up!');
      } else {
        // User clicked 'No thanks' button or closed the notification
        console.log('User clicked No thanks or closed the notification.');
      }
    }
  };
  