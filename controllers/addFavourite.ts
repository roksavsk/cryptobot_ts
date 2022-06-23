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
    axios.post(`${TELEG_API}/sendMessage`,
    {
        chat_id: chatId,
        text: check ? "Currency is already in the list" : `Currency was added to favourite: ${currency}`
    })
    .then((response) => res.status(200).send(response.data)).catch((error) => {
        console.log(error);
        return res.status(500);
    });
}

export default addFavourite;