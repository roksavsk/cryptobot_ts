import axios from "axios";
import findUser from "./findUser";
import { Response } from "express";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

let price: coinData[];
interface coinData {
    averagePrice: number,
}

async function coininfo(chatId: number, username: string, sentMessage: string, res: Response) {
    const getPrice = async () => {
        try{
            const resp = await axios.get(`http://localhost:3000/api/currencies${sentMessage}`);
            price = await resp.data;
            price.reverse();
        } catch(err) {
            console.log(err);
        }
    }
    await getPrice();
    const check: string[] = await findUser(username);
    console.log(check);
    let msg: string;
    if (price.length >= 288) { 
        msg =`History of the average price of currency ${sentMessage}:
30 min - $${price[5].averagePrice}
1 hour - $${price[11].averagePrice}
3 hours - $${price[35].averagePrice}
6 hours - $${price[71].averagePrice}
12 hours - $${price[143].averagePrice}
24 hours - $${price[288].averagePrice}`;
    } else if (price.length >= 71) { msg = `History of the average price of currency ${sentMessage}:
30 min - $${price[5].averagePrice}
1 hour - $${price[11].averagePrice}
3 hours - $${price[35].averagePrice}
6 hours - $${price[71].averagePrice}`;
    } else { msg = `History of the average price of currency ${sentMessage}:
5 min - $${price[0].averagePrice}`;}

    const postData = async () => {
        try{
            const url = `${TELEG_API}/sendMessage`;
            const resp = await axios.post(url, {
                chat_id: chatId,
                text: msg,
                reply_markup: {
                    inline_keyboard: [[{
                        text: check.includes(sentMessage.slice(1)) ? "Remove from favourite" : "Add to favourite",
                        callback_data: `${sentMessage.slice(1)}`,
                    }]]
                }
            });
            const data = await resp.data;
            res.status(200).send(data);
        } catch(err) {
            console.log(err);
            res.send(err);
        }
    }
    postData();
}

export default coininfo;