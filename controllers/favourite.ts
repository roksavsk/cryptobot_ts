import axios from "axios";
import findUser from "./findUser";
import { Response } from "express";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

let recent: [];
interface coinData {
    cryptoName: string,
    averagePrice: number,
}

async function favourite(chatId: number, username: string, res: Response) {
    const data: string[] = await findUser(username);
    const getRecent = async () => {
        try{
            const resp = await axios.get("http://localhost:3000/api/currencies/recent");
            recent = resp.data.reverse();
        } catch(err) {
            console.log(err);
        }
    }
    await getRecent();
    let favouriteList = "";
    recent.forEach( (elem: coinData) => {
        if (data.includes(elem.cryptoName)){
            favouriteList += `\n/${elem.cryptoName} $${elem.averagePrice}`;
    }
    });
    const postData = async () => {
        try{
            const resp = await axios.post(`${TELEG_API}/sendMessage`, {
                chat_id: chatId,
                text: favouriteList.length ? `Here is the list of your favourite currency: ${favouriteList}` : "You have no favourite currency yet add some from the recent list"
            });
            res.status(200).send(resp.data);
        } catch(err) {
            res.send(err);
        }
    }
    postData();
}

export default favourite;