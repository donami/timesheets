const isExisty = (value: any) => value !== null && value !== undefined;
const isEmpty = (value: string) => value === '';

export const validationRules = {
  matchRegexp(values: any, value: string, regexp: RegExp) {
    return !isExisty(value) || isEmpty(value) || regexp.test(value);
  },
  isEmail(values: any, value: string) {
    if (isEmpty(value)) {
      return false;
    }

    return validationRules.matchRegexp(
      values,
      value,
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    );
  },
  isRequired(values: any, value: string) {
    return !isEmpty(value);
  },
  equals(values: any, value: string, eql: any) {
    return !isExisty(value) || isEmpty(value) || value === eql;
  },
  equalsField(values: any, value: string, field: any) {
    return value === values[field];
  },
  maxLength(values: any, value: string, length: number) {
    return !isExisty(value) || value.length <= length;
  },
  minLength(values: any, value: string, length: number) {
    return !isExisty(value) || isEmpty(value) || value.length >= length;
  },
};

export const validationRuleMessages = {
  isEmail: 'Please provide a valid email address.',
  minLength: 'This value is too short.',
  equalsField: (field: string) => `This fields needs be the same as ${field}.`,
  isRequired: 'This field is required.',
};
