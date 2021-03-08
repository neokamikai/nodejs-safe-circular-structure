import safeObject from './safe-object';

interface Options {
  stripPropertiesWithUndefinedValue?: boolean
}
const stringify = (value: any, options: Options = {}) => {
  const { stripPropertiesWithUndefinedValue = true } = { ...options };
  if (value === null) return 'null';
  if (typeof value === 'undefined') return 'undefined';
  if (['string', 'number', 'boolean'].includes(typeof value)) return JSON.stringify(value);
  if (typeof value === 'symbol') return value.toString();
  if (typeof value === 'object') {
    let output = '';
    if (Array.isArray(value)) {
      output = '[';
      output += value.map((item) => stringify(item)).join(',');
      output += ']';
      return output;
    }
    const parsedObject = safeObject(value);
    output = '{';
    output += Object.keys(parsedObject)
      .reduce((accumulatedKeys, key) => {
        const outputKeys = [...accumulatedKeys];
        const fieldValue = value[key];
        if (fieldValue === undefined && stripPropertiesWithUndefinedValue) {
          return outputKeys;
        }
        outputKeys.push([JSON.stringify(key), stringify(parsedObject[key])].join(':'));
        return outputKeys;
      }, [] as Array<string>).join(',');
    output += '}';
    return output;
  }
  return value;
};

export default stringify;
