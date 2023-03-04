import { 
  hasAtLeastOneLowerCase, hasAtLeastOneNumber,
  hasAtLeastOneSpecialCharacter,
  hasAtLeastOneUpperCase, isEmailValid,
  maxLengthValidation, minLengthValidation
} from "./validationTypes";

type DataTypes = 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'integer'
type ValidationTypes = 'email' | 'password'

export type Validation<T> = {
  [key in keyof T]: {
    name: string
    required?: boolean
    type: DataTypes
    validations?: ValidationTypes[]
    min?: number
    max?: number
    enum?: string[]
  }
};

type Errors = {
  [key:string]: string[]
}

export type Validator = <T>(data: T, keys: Validation<T>) => Errors | undefined

export default <T>(data: T, keys: Validation<T>): Errors | undefined => {
  const errors: Errors = {};

  Object.keys(keys).forEach((key) => {
    const _data = data[key as keyof T];
    errors[key] = []
    const { name, validations, type, required, min, max } = keys[key as keyof T];

    //Check if data exists
    if (_data) {
      //Validate data type
      switch (type) {
        case 'string':
          if (typeof _data !== 'string') {
            errors[key].push(`${name} is not a valid string`);
          }
          break;
        case 'number':
          if (isNaN(Number(_data))) {
            errors[key].push(`${name} is not a valid number`);
          }
          break;
        case 'boolean':
          if (typeof _data !== 'boolean') {
            errors[key].push(`${name} is not a valid boolean`);
          }
          break;
        case 'date':
          if (isNaN(Date.parse(String(_data)))) {
            errors[key].push(`${name} is not a valid date`);
          }
          break
        case 'enum':
          if (!keys[key as keyof T].enum?.includes(String(_data))) {
            errors[key].push(`${name} is not a valid`);
          }
          break
        case 'integer':
          if (isNaN(Number(_data)) || !Number.isInteger(Number(_data))) {
            errors[key].push(`${name} is not a valid integer`);
          }
          break;
      }

      //Validate min data length
      if (min) {
        if (typeof _data === 'string' && !minLengthValidation(String(_data), min)) {
          errors[key].push(`${name} must be at least ${min} characters long`);
        }
        if (typeof _data === 'number' && _data < min) {
          errors[key].push(`${name} must be at least ${min}`);
        }
      }

      //Validate max data length
      if (max) {
        if (typeof _data === 'string' && !maxLengthValidation(String(_data), max)) {
          errors[key].push(`${name} must be at most ${max} characters long`);
        }
        if (typeof _data === 'number' && _data > max) {
          errors[key].push(`${name} must be at most ${max}`);
        }
      }

      //Validate data by predefined validations
      validations?.forEach((validation) => {
        switch (validation) {
          case 'email':
            if (!isEmailValid(String(_data))) {
              errors[key].push(`${name} is not a valid email`);
            }
            break;
          case 'password':
            if (!hasAtLeastOneLowerCase(String(_data))) {
              errors[key].push(`${name} must contain at least one lower case character`);
            }
            if (!hasAtLeastOneUpperCase(String(_data))) {
              errors[key].push(`${name} must contain at least one upper case character`);
            }
            if (!hasAtLeastOneNumber(String(_data))) {
              errors[key].push(`${name} must contain at least one number`);
            }
            if (!hasAtLeastOneSpecialCharacter(String(_data))) {
              errors[key].push(`${name} must contain at least one special character`);
            }
        }
      })
    } else if (required) {
      errors[key].push(`${name} is required`);
    }
  })

  if (Object.keys(errors).some((key) => errors[key].length > 0)) {
    return Object.keys(errors).reduce((acc, key) => {
      if (errors[key].length > 0) {
        acc[key] = errors[key]
      }
      return acc
    }, {} as Errors)
  }
  return undefined
}