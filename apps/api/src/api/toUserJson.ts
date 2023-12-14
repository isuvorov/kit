import { getGravatarHash } from './getGravatarHash';

export function getUserAvatar(user) {
  const avatar = user?.info?.avatar;
  if (avatar) return avatar;
  if (user.email) {
    const transparentPixel = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png';
    const hash = getGravatarHash(user.email);
    const s = 200;
    const d = encodeURIComponent(transparentPixel);
    return `https://gravatar.com/avatar/${hash}?s=${s}&d=${d}`;
  }
  return null;
}

export function toUserJson(user) {
  const _id = user._id.toString();
  const name = [user.info?.firstName, user.info?.lastName].filter(Boolean).join(' ');
  return {
    _id,
    ...user.toJSON(),
    name,
    avatar: getUserAvatar(user),
  };
}
