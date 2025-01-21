const checkUrlRegExp: RegExp =
  /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const checkHttpUrlRegExp: RegExp =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const checkIsUrlValid = (url: string): boolean => {
  const decodedUrl: string = url.split('?')[0];

  return decodedUrl.includes('http') || decodedUrl.includes('https')
    ? checkHttpUrlRegExp.test(decodedUrl)
    : checkUrlRegExp.test(decodedUrl);
};

export { checkHttpUrlRegExp, checkIsUrlValid, checkUrlRegExp };
