import axios from 'axios';
import { Response } from 'express';
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

async function help(chatId: number, res: Response) {
    try {
        const resp = await axios.post(`${TELEG_API}/sendMessage`, {
            chat_id: chatId,
            text: `How to use bot:
/listRecent - the most popular cryptocurrency list;
/{currency_symbol} - get more info about currency;
/addToFavourite {currency_symbol} - add currency to Favourite;
/listFavourite - list of your favourite currencies;
/deleteFavourite {currency_symbol} - remove currency from Favourite;`,
        });
        res.status(200).send(resp.data);
    } catch (err) {
        res.send(err);
    }
}

export default help;
