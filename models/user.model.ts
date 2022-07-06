import sql from "./db";

class User {
  constructor(public username: string, public cryptoCurrency: string) {}

  static create = (username: string) => {
    sql.query(
      `CREATE TABLE IF NOT EXISTS ${username} (id INT AUTO_INCREMENT PRIMARY KEY, cryptoCurrency VARCHAR(50), UNIQUE (cryptoCurrency)) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log("Created user");
      }
    );
  };

  static add = (username: string, currency: string) => {
    sql.query(
      `INSERT INTO ${username} (cryptoCurrency) VALUES ('${currency}')`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log("Add currency: ", { username: currency });
      }
    );
  };

  static remove = (username: string, currency: string) => {
    sql.query(
      `DELETE FROM ${username} WHERE cryptoCurrency = '${currency}'`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log("Remove currency: ", { username: currency });
      }
    );
  };
}

export default User;
