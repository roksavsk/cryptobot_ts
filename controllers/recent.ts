import axios from "axios";
import { Response } from "express";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

let recentData: [];
interface coinData {
    cryptoName: string,
    averagePrice: number,
}

async function recent(chatId: number, res: Response) {    
    await axios.get("http://localhost:3000/api/currencies/recent").then((response) => {
        recentData = response.data.reverse(); 
    }).catch((error) => {
        console.log(error);
    });
    let recentList = "";
    recentData.forEach((elem: coinData) => {
        recentList += `\n/${elem.cryptoName} $${elem.averagePrice}`;
    });
    axios.post(`${TELEG_API}/sendMessage`,
        {
            chat_id: chatId,
            text: `Here is the list of the most popular currency: ${recentList}`
        })
        .then((response) => res.status(200).send(response)).catch((error) => res.send(error));
}

export default recent;