const { createHmac } = require('crypto');
const base32Decode = require('base32-decode');
const { uuid } = require('uuidv4');

// https://medium.com/onfrontiers-engineering/two-factor-authentication-flow-with-node-and-react-7cbdf249f13
function generateHOTP(secret, counter) {
    const decodedSecret = base32Decode(secret, 'RFC4648');

    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
        buffer[7 - i] = counter & 0xff;
        counter = counter >> 8;
    }

    // Step 1: Generate an HMAC-SHA-1 value
    const hmac = createHmac('sha1', Buffer.from(decodedSecret));
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    // Step 2: Generate a 4-byte string (Dynamic Truncation)
    const offset = hmacResult[hmacResult.length - 1] & 0xf;
    const code =
        ((hmacResult[offset] & 0x7f) << 24) |
        ((hmacResult[offset + 1] & 0xff) << 16) |
        ((hmacResult[offset + 2] & 0xff) << 8) |
        (hmacResult[offset + 3] & 0xff);

    // Step 3: Compute an HOTP value
    return `${code % 10 ** 6}`.padStart(6, '0');
}
  
function generateTOTP(secret, window = 0) {
    const counter = Math.floor(Date.now() / 30000);
    return generateHOTP(secret, counter + window);
}
  
function verifyTOTP(token, secret, window = 2) {
    for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
        const totp = generateTOTP(secret, errorWindow);
        if (token === totp) {
            return true;
        }
    }
    return false;
}

const headers = {
    'Content-Type': 'Application/json',
    'Accept': 'Application/json'
}

exports.handler = async (event, _context) => {
    const data = JSON.parse(event.body);
    const secret = process.env.REACT_APP_TOTP_SECRET;
    if (!secret) {
        return {
            headers: headers,
            statusCode: 500,
            body: JSON.stringify({error: 'No Secret provided for TOTP Verification.'})
        }
    }
    if (verifyTOTP(data.code, secret)) {
        return {
            headers: headers,
            statusCode: 200,
            body: JSON.stringify({sessionID: uuid()})
        };
    } else {
        return {
            headers: headers,
            statusCode: 401,
            body: JSON.stringify({error: 'Can not verify the input code, try again.'})
        };
    }
}