
const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

export const isURL = (str: string) => {
  try {
    if (new URL(str)) {
      return true
    }
    return false
  } catch(e) {
    return false
  }
}

export const socialLinkPrefixes = {
  linkedin: {
    link: 'https://www.linkedin.com/in/',
    regex: /^(https?\:\/\/)?(www\.)?(linkedin\.com)?\/(in|company)\/.*/
  },
  facebook: {
    link: 'https://www.facebook.com/',
    regex: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w\-]*)?/g
  },
  instagram: {
    link: 'https://www.instagram.com/',
    regex: /^(https?\:\/\/)?(www\.)?(instagram\.com)?\/.*/
  },
  soundcloud: {
    link: 'https://www.soundcloud.com/',
    regex: /^(https?\:\/\/)?(www\.)?(soundcloud\.com)?\/.*/
  },
  twitter: {
    link: 'https://www.twitter.com/',
    regex: /^(https?\:\/\/)?(www\.)?(instagram\.com)?\/.*/
  },
  youtube: {
    link: 'https://www.youtube.com/',
    regex: /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)?\/.*/
  }
};

export const isValidUrl = (url: string) => !!regexUrl.test(url)

export function getInitials(name: string, initials: number=2) {
  const [firstName, lastName] = name.split(" ")

  if (firstName && lastName  && initials === 2) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    return firstName.charAt(0)
  }
}

export const hashNumber = (s:string)=>{
  let h = 0
  for(let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0
  }
  return (h < 0 ? h * -1 : h)
}

export function getLoadingUrl() {
  return `https://loading.io/asset/389838`
}

function stringIsNumber(value:any) {
  return isNaN(Number(value)) === false
}

export function enumToArray(enumme:any) {
  return Object.keys(enumme)
      .filter(stringIsNumber)
      .map(key => enumme[key])
}

export function zeroFill(num:number, width:number) {
  const number = num.toString()
  width -= number.length
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number
  }
  return number.toString()
}