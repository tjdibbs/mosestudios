import { encrypt } from "@lib/crypto";
import Crypto from "crypto-js";

const password = process.env.CRYPTO_PASSWORD as string;

const _algorithm = {
  name: "AES-GCM",
  iv: crypto.getRandomValues(new Uint8Array(12)),
  key: password,
};
export const _key = async () =>
  await window.crypto.subtle.generateKey(_algorithm, true, [
    "verify",
    "encrypt",
    "decrypt",
  ]);

export async function encryptData(data: string) {
  return Crypto.AES.encrypt(data, password).toString();
}

export async function decryptData(data: string) {
  return Crypto.AES.decrypt(data, password);
}
