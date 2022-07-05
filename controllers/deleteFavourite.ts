import axios from "axios";
import { Response } from "express";
import User from "../models/user.model";
import findUser from "./findUser";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

async function deleteFavourite(chatId: number, username: string, currency: string, res: Response) {
    const data: string[] = await findUser(username);
    const check = data.includes(currency);
    if (check) { User.remove(username, currency); };
    const postData = async () => {
        try{
            const resp = await axios.post(`${TELEG_API}/sendMessage`, {
                chat_id: chatId,
                text: check ? `Currency was removed from favourite: ${currency}` : "Currency is not in the list" 
            });
            res.status(200).send(resp.data);
        } catch(err) {
            console.log(err);
            return res.status(500);
        }
    }
    postData();
}

export default deleteFavourite;