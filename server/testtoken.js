import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// lee variables
const { GITHUB_APP_ID, GITHUB_PRIVATE_KEY_PATH } = process.env;
console.log("APP_ID en .env:", GITHUB_APP_ID);
console.log("PEM path      :", GITHUB_PRIVATE_KEY_PATH);

// lee la clave
try {
  const key = fs.readFileSync(path.resolve(GITHUB_PRIVATE_KEY_PATH), "utf8");
  console.log("✅ PEM leída OK (" + key.split("\n")[0] + " …)");
  
  // genera token
  const token = jwt.sign(
    { iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 600, iss: GITHUB_APP_ID },
    key,
    { algorithm: "RS256" }
  );
/* 
*/  console.log(token);  
  // prueba simple con GitHub
  const fetch = (await import("node-fetch")).default;
  const resp = await fetch(`https://api.github.com/app`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
  });
  console.log("GitHub responde:", resp.status, await resp.text());
} catch (err) {
  console.error("❌ Error leyendo PEM o generando token:", err.message);
}
