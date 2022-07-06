import axios from "axios";
import { Response } from "express";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

async function help(chatId: number, res: Response) {
  try {
    const resp = await axios.post(`${TELEG_API}/sendMessage`, {
      chat_id: chatId,
      text: "How to use bot:\n/listRecent - the most popular cryptocurrency list;\n/{currency_symbol} - get more info about currency;\n/addToFavourite {currency_symbol} - add currency to Favourite;\n/listFavourite - list of your favourite currencies;\n/deleteFavourite {currency_symbol} - remove currency from Favourite;",
    });
    res.status(200).send(resp.data);
  } catch (err) {
    res.send(err);
  }
}

export default help;
