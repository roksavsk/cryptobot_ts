import axios from "axios";

interface coinData {
  cryptoName: string;
  averagePrice: number;
}

async function getCoins(text: string) {
  const currencies: string[] = [];
  const getRecent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/currencies/recent"
      );
      response.data.forEach((item: coinData) => {
        currencies.push(item.cryptoName);
      });
      console.log("Data is saved");
    } catch (err) {
      console.log(err);
    }
  };
  await getRecent();
  const findCoin = currencies.filter((el) => `/${el}` === text);
  return findCoin[0];
}

export default getCoins;
