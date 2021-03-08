import safeObject from '../../src/functions/safe-object';

describe('safeObject()', () => {
  it('should return an object without any circular structure', () => {
    const obj1 = {
      a: 10,
      b: null as any,
    };
    const obj2 = {
      a: null as any,
      b: 20,
      c: null,
    };
    obj1.b = obj2;
    obj2.a = obj1;
    const result = safeObject({ x: obj1 });
    expect(result).toHaveProperty(['x', 'a'], 10);
    expect(result).toHaveProperty(['x', 'b', 'b'], 20);
  });
  it('should expose own/non-enumerable properties', () => {
    const error = new Error('test');
    const result = safeObject(error);
    expect(result).toHaveProperty('message', error.message);
    expect(result).toHaveProperty('stack', error.stack);
  });
});
