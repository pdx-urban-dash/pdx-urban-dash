const injectPropsIntoArray = (props, arr) => {
  const newArr = [];
  arr.forEach((elem) => {
    if (typeof elem !== 'object') {
      if (props[elem]) newArr.push(props[elem].name);
      else newArr.push(elem);
    } else if (Array.isArray(elem)) {
      newArr.push(injectPropsIntoArray(props, elem));
    } else {
      // eslint-disable-next-line no-use-before-define
      newArr.push(injectPropsIntoSchema(props, elem));
    }
  });
  return newArr;
};

// eslint-disable-next-line import/prefer-default-export
export const injectPropsIntoSchema = (props, schema) => {
  const mObj = JSON.parse(JSON.stringify(schema));
  Object.keys(schema).forEach((key) => {
    if (props[key]) {
      delete mObj[key];
      mObj[props[key].name] = props[key].value;
    } else if (props[schema[key]]) {
      mObj[key] = props[schema[key]].name;
    } else if (Array.isArray(schema[key])) {
      mObj[key] = injectPropsIntoArray(props, schema[key]);
    }
    if (mObj[key] && typeof schema[key] === 'object') {
      mObj[key] = injectPropsIntoSchema(props, schema[key]);
    }
  });
  return mObj;
};
