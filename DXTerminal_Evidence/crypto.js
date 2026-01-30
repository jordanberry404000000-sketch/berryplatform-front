import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.ENCRYPTION_KEY;

if (!KEY || KEY.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be exactly 32 characters long");
}

export function encrypt(text) {
  const iv = crypto.randomBytes(12); // GCM recommended IV size
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);

  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(encoded) {
  const data = Buffer.from(encoded, "base64");

  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const encrypted = data.slice(28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}
