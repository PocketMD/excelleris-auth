import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';
import fs from "fs";

// const clientCert = fs.readFileSync("cert/client-cert.pem");
// const clientKey = fs.readFileSync("cert/client-key.pem");
// const caCert = fs.readFileSync("cert/ca-cert.pem");

dotenv.config();

const apiEndpoint = "https://api.ontest.excelleris.com";
const userID = process.env.USER_ID;
const password = process.env.PASSWORD;
const passphrase = process.env.PASSPHRASE;

const httpsAgent = new https.Agent({
  // cert: clientCert,
  // key: clientKey,
  // ca: caCert,
  passphrase,
  rejectUnauthorized: true,
  keepAlive: true,
});

async function authenticate() {
  console.log("Authenticating...");

  try {
    const response = await axios.get(
      apiEndpoint,
      { 
        httpsAgent,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
    console.log("⚪️ Initial response received", response.data);

    const response2 = await axios.post(
      apiEndpoint,
      new URLSearchParams({
        Page: "Login",
        Mode: "Silent",
        UserID: userID,
        Password: password,
      }),
      { 
        httpsAgent,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
    console.log("🟢 Login response received");

    if (response2.data.includes("AccessGranted")) {
      console.log("Authentication successful");
      const cookies = response2.headers["set-cookie"];
      return cookies;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("❌ Error authenticating:", error.message);
    throw error;
  }
}

// Runs the authentication function
authenticate()
  .then(cookies => {
    console.log("Authentication cookies received:", cookies);
  })
  .catch(error => {
    console.error("Authentication failed:", error);
    process.exit(1);
  });
