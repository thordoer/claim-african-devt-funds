export async function sendToTelegram2(message) {
  const token = import.meta.env.VITE_TG_BOT_TOKEN2;
  const chatId = import.meta.env.VITE_TG_CHAT_ID2;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}
