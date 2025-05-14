import { nanoid } from "nanoid";

export function GenerateCode(length: number) {
  return nanoid(length);
}
