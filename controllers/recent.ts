import axios from 'axios';
import { Response } from 'express';
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

let recentData: [];
interface CoinData {
    cryptoName: string;
    averagePrice: number;
}

async function recent(chatId: number, res: Response) {
    try {
        const response = await axios.get(
            'http://localhost:3000/api/currencies/recent',
        );
        recentData = response.data.reverse();
        console.log('Data is saved');
    } catch (err) {
        console.log(err);
    }
    let recentList = '';
    recentData.forEach((elem: CoinData) => {
        recentList += `\n/${elem.cryptoName} $${elem.averagePrice}`;
    });
    try {
        const resp = await axios.post(`${TELEG_API}/sendMessage`, {
            chat_id: chatId,
            text: `Here is the list of the most popular currency: ${recentList}`,
        });
        res.status(200).send(resp.data);
    } catch (err) {
        res.send(err);
    }
}

export default recent;
