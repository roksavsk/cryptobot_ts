const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
import axios from "axios";
import User from "../models/user.model";
import findUser from "./findUser";
import { Response } from "express";

async function addFavourite(chatId: number, username: string, currency: string, res: Response) {
    const data: string[] = await findUser(username);
    const check = data.includes(currency);
    if (!check) { User.add(username, currency); };
    const postData = async () => {
        try{
            const url = `${TELEG_API}/sendMessage`;
            const resp = await axios.post(url, {
                chat_id: chatId,
                text: check ? "Currency is already in the list" : `Currency was added to favourite: ${currency}`
            });
            const data = await resp.data;
            res.status(200).send(data);
        } catch(err) {
            console.log(err);
            return res.status(500);
        }
    }
    postData();
}

export default addFavourite;