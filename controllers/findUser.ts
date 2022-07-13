import sql from '../models/db';

interface CoinData {
    cryptoCurrency: string;
}

function findUser(user: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT cryptoCurrency FROM ${user}`, (err, result: []) => {
            if (err) {
                console.log('error: ', err);
                reject(err);
            }
            if (result.length) {
                const data: string[] = [];
                result.forEach((element: CoinData) => {
                    data.push(element.cryptoCurrency);
                });
                console.log(data);
                resolve(data);
            } else if (!result.length) {
                console.log('No currency');
                resolve([]);
            }
        });
    });
}

export default findUser;
