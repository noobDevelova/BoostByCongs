export const sendPushNotifications = async (token, { title, body }) => {
  try {
    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
};
