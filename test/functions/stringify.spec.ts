import stringify from '../../src/functions/stringify';

describe('stringify()', () => {
  it('should parse objects and keep fields with value "undefined" when stripPropertiesWithUndefinedValue is false', () => {
    const input = {
      d: undefined,
    };
    const result = stringify(input, { stripPropertiesWithUndefinedValue: false });
    expect(result).toBe('{"d":undefined}');
  });
  it('should parse objects and strip fields with value "undefined" when stripPropertiesWithUndefinedValue is true', () => {
    const input = {
      d: undefined,
    };
    const result = stringify(input, { stripPropertiesWithUndefinedValue: true });
    expect(result).toBe('{}');
  });
  it('should parse objects and strip fields with value "undefined" options is undefined', () => {
    const input = {
      d: undefined,
    };
    const result = stringify(input);
    expect(result).toBe('{}');
  });
  it('should parse objects with native type values', () => {
    const input = {
      n: 1,
      s: 'string',
      b: true,
      u: null,
      bi: BigInt(1),
      sym: Symbol('test'),
    };
    const result = stringify(input);
    expect(result).toBe('{"n":1,"s":"string","b":true,"u":null,"bi":1,"sym":Symbol(test)}');
  });
  it('should parse objects with array values ', () => {
    const input = {
      array: [
        1,
        'string',
        true,
        null,
        BigInt(1),
        Symbol('test'),
      ],
    };
    const result = stringify(input);
    expect(result).toBe('{"array":[1,"string",true,null,1,Symbol(test)]}');
  });
});
