# Minimal Excelleris API Authentication Issue Reproduction

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Kindly create an `.env` file in the root directory and add the following:
   ```bash
   USER_ID="as provided in the email"
   PASSWORD="as provided in the email"
   PASSPHRASE="as provided in the email"
   ```
4. Run the client:
   ```bash
   npm start
   ```

## Certificates

To use client certificates:

1. Certificate location is in `cert` directory:
   - `cert/client-cert.pem`
   - `cert/client-key.pem`
   - `cert/ca-cert.pem`

2. To test with generated certificates uncomment the certificate configuration in `src/index.js`