exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {

    const data = JSON.parse(event.body);

    const message = `
💌 Новая анкета гостя

👤 ФИО:
${data.name}

🎉 Присутствие:
${data.attendance}

🍽 Ограничения:
${data.foodLimit || "Нет"}

${data.foodText ? "✏️ " + data.foodText : ""}

🍗 Горячее:
${data.hotMeal || "-"}

🍷 Алкоголь:
${data.alcohol || "-"}

${data.alcoholText ? "🥂 " + data.alcoholText : ""}

🚕 Трансфер:
${data.transfer || "-"}
`;

    const response = await fetch(
      https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message
        })
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }

};
