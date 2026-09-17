import { test } from "@playwright/test";
import mysql, { Connection } from "mysql2/promise";

test("connect playwright with db", async () => {
  //   type obj = { host: string; port: number; User: string; Password: string };
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "InaiImai@15",
    database: "august",
  });

  const [rows] = await connection.execute(
    "select * from employees order by salary desc limit 1  offset 1",
  );
  console.log(rows);
  await connection.end();
});
