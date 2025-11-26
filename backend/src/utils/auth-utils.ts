import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param plainPassword The user's password in plain text.
 * @returns A bcrypt hash of the password.
 */
export async function hashPassword(plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
}
