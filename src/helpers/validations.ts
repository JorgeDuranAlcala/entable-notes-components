import strings from '../i18n/strings'
export type ONE_OF_INPUTS = 'EMAIL' | 'PASSWORD' | 'NAME' | 'PHONENUMBER' | 'USERNAME' | 'MONEY';
export type INPUT_VALIDATION = {
  label: string;
  isSecure?: boolean;
  required?: string;
  autoCapitalize?: string;
  length?: {
    range: string;
    message: string;
  };
  format?: {
    message: string;
    regex: any;
    mask?: string;
    formatText?: Function;
  };
  keyboardType?: string;
};
const formatPhoneNumber = (text: string) => text.replace(/[^0-9]/g, '');

const formatUsername = (text: string) => text.replace(/@/g, '');
const formatMoney = (text: string) => text.replace(/[£$,]/g, '');

const Validations = {
  NAME: {
    label: strings.NAME_PLACEHOLDER,
    required: strings.NAME_REQUIRED,
    autoCapitalize: 'words',
    length: {
      range: '3 30',
      message: strings.NAME_LENGTH_ERROR
    }
  },
  EMAIL: {
    label: strings.EMAIL_PLACEHOLDER,
    required: strings.EMAIL_REQUIRED,
    autoCapitalize: 'none',
    format: {
      message: strings.EMAIL_FORMAT_ERROR,
      //      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    keyboardType: 'email-address'
  },
  PHONENUMBER: {
    label: strings.PHONENUMBER,
    autoCapitalize: 'none',
    format: {
      message: strings.PHONENUMBER_FORMAT_ERROR,
      regex: /^[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/,
      mask: '1(999)999-9999',
      formatText: formatPhoneNumber
    },
    keyboardType: 'phone-pad'
  },
  PASSWORD: {
    isSecure: true,
    label: 'Password',
    length: {
      range: '6 12',
      message: strings.PASSWORD_LENGTH_ERROR
    },
    required: 'Password is required'
  },
  USERNAME: {
    label: 'Username',
    autoCapitalize: 'none',
    required: 'Username is required',
    length: {
      range: '4 20',
      message: strings.USERNAME_LENGTH_ERROR
    },
    format: {
      message: strings.USERNAME_FORMAT_ERROR,
      regex: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
      mask: '@**************************',
      formatText: formatUsername
    }
  },
  MONEY: {
    label: 'Amount $',
    keyboardType: 'numeric-pad',
    autoCapitalize: 'none',
    required: 'Amount is required',
    length: {
      range: '1 20',
      message: 'Amount should be 1-20 characters'
    },
    format: {
      message: 'Amount field is invalid',
      regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
      mask: '^[0-9]{1,6}(\\,\\d{1,2})?$',
      formatText: formatMoney
    }
  }
};
const getInputError = (name: ONE_OF_INPUTS, value: any) => {
  const validation: INPUT_VALIDATION = Validations[name];
  const { required, length, format } = validation;
  if (!value) {
    return required;
  }
  if (length) {
    const range = length.range.split(' ');
    if ((range[0] && value.length < range[0]) || (range[1] && value.length > range[1])) {
      return length.message;
    }
  }
  if (format) {
    const re = new RegExp(format.regex);
    if (!re.test(String(value).toLowerCase())) {
      return format.message;
    }
  }
  return null;
};

export { getInputError, Validations };
