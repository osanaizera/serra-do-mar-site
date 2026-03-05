import crypto from "crypto";

export function verifySdcmsSignature(opts: {
  secret: string;
  signatureHex: string;
  timestamp: string;
  body: string;
}): boolean {
  const { secret, signatureHex, timestamp, body } = opts;
  if (!secret || !signatureHex || !timestamp) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHex, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}
