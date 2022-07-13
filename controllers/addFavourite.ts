const TOKEN = process.env.BOT_TOKEN;
const TELEG_API = `https://api.telegram.org/bot${TOKEN}`;
import axios from 'axios';
import { Response } from 'express';

import User from '../models/user.model';

import findUser from './findUser';
import getCoins from './getCoins';

async function addFavourite(
    chatId: number,
    username: string,
    currency: string,
    res: Response,
) {
    const coinCheck = await getCoins(currency);
    if (coinCheck) {
        const data: string[] = await findUser(username);
        const check = data.includes(currency);
        if (!check) {
            User.add(username, currency);
        }
        const postData = async () => {
            try {
                const url = `${TELEG_API}/sendMessage`;
                const resp = await axios.post(url, {
                    chat_id: chatId,
                    text: check
                        ? 'Currency is already in the list'
                        : `Currency was added to favourite: ${currency}`,
                });
                res.status(200).send(resp.data);
            } catch (err) {
                console.log(err);
                return res.status(500);
            }
        };
        postData();
    } else {
        try {
            const resp = await axios.post(`${TELEG_API}/sendMessage`, {
                chat_id: chatId,
                text: 'Wrong currency, check the list of the latest available currencies.',
            });
            res.status(200).send(resp.data);
        } catch (err) {
            res.send(err);
        }
    }
}

export default addFavourite;
