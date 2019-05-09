import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
 
    if (finalStatus !== 'granted') {
       return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    alert(token);
    //return true;
  
    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        token: {
            value: token,
        },
        user: {
            username: 'Brent',
        },
        }),
    });
}