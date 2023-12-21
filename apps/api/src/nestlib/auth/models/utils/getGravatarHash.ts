import { createHash } from 'node:crypto';

export function getGravatarHash(email) {
  return createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}
