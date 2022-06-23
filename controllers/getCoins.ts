import axios from "axios";

interface coinData {
    cryptoName: string,
    averagePrice: number,
}

async function getCoins(text: string) {
    const currencies: string[] = [];
    await axios
    .get("http://localhost:3000/api/currencies/recent")
    .then(response => {
        response.data.forEach((item: coinData) => {
            currencies.push(item.cryptoName);
        });
        console.log("Data is saved");
    })
    .catch(error => {
        console.log("error", error);
    });
    const findCoin = currencies.filter(el => `/${el}` === text);
    return findCoin[0];
}

export default getCoins;