import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(process.env.SECRET_KEY!, "hex");

export function Encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);

  return {
    content: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    key: secretKey.toString("hex"),
  };
}
