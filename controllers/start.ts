import axios from "axios";
import User from "../models/user.model";
import { Response } from "express";
const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;

async function start(username: string, chatId: number, res: Response) {
    User.create(username);
    try{
        const resp = await axios.post(`${TELEG_API}/sendMessage`, {
            chat_id: chatId,
            text: "Welcome to Cryptocurrency commutator! Press /help for more instructions."
        });
        res.status(200).send(resp.data);
    } catch(err) {
        res.send(err);
    }
}

export default start;