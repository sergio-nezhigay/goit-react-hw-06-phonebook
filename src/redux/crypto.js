import CryptoJS from 'crypto-js';
import createTransform from 'redux-persist/es/createTransform';

const secretKey = 'my-secret-key';

export const encryptTransform = createTransform(
  inboundState => {
    const encryptedState = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      secretKey
    ).toString();
    return encryptedState;
  },
  outboundState => {
    const decryptedState = CryptoJS.AES.decrypt(
      outboundState,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedState);
  }
);
