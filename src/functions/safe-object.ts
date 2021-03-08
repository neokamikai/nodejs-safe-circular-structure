const safeObject = (srcObject: any) => {
  const circularStructures = [];
  const objects = [srcObject];
  const objectPaths: Array<Array<string>> = [[undefined as any]];
  const recreate = (object: any) => Object
    .setPrototypeOf({ ...object }, Object.getPrototypeOf(object));
  const analyze = (analyzeObject: any, parents: Array<string>) => {
    const ownProps = Object.getOwnPropertyNames(analyzeObject);
    const output = recreate(analyzeObject);
    ownProps.forEach((key) => {
      const value = analyzeObject[key];
      const pd = { ...Object.getOwnPropertyDescriptor(analyzeObject, key) };
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        if (objects.includes(value)) {
          circularStructures.push({ path: [...parents, key], value });
          Object.defineProperty(analyzeObject, key, {
            configurable: false, enumerable: false, value,
          });
        } else {
          objects.push(value);
          objectPaths.push([...parents, key]);
          output[key] = analyze(value, [...parents, key]);
        }
      } else if (!pd.enumerable && ['string', 'number', 'boolean', 'bigint', 'symbol'].includes(typeof value)) {
        output[key] = value;
      }
    });
    return output;
  };

  return analyze(srcObject, []);
};

export default safeObject;
