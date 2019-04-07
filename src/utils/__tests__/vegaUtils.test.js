import each from 'jest-each';
import { injectPropsIntoSchema } from '../vegaUtils';

each([
  [{}, {}, {}],
  [
    {
      myKey: {
        name: 'my key',
        value: 'some value',
      },
    },
    { myKey: 'whatever', otherKey: ['myKey', { myKey: 'some' }, ['myKey']] },
    {
      'my key': 'some value',
      otherKey: [
        'my key',
        { 'my key': 'some value' },
        ['my key'],
      ],
    },
  ],
  [
    {
      myKey: {
        name: 'my key',
        value: 'some value',
      },
    },
    { myKey: 'whatever', otherKey: 'myKey' },
    { 'my key': 'some value', otherKey: 'my key' },
  ],
  [
    {
      myKey: {
        name: 'my key',
        value: 'some value',
      },
    },
    {
      myKey: 'whatever',
      otherKey: 'myKey',
      nestedKey: {
        myKey: 'whatever',
      },
    },
    { 'my key': 'some value', otherKey: 'my key', nestedKey: { 'my key': 'some value' } },
  ],
  [
    {
      myKey: {
        name: 'my key',
        value: 'some value',
      },
      myKey2: {
        name: 'key2',
        value: 'key value',
      },
    },
    {
      myKey: 'whatever',
      otherKey: 'myKey',
      nestedKey: {
        myKey: 'whatever',
        myKey2: 'val',
        myKey3: 'myKey2',
        myKey4: ['some strings', 'another string'],
      },
    },
    {
      'my key': 'some value',
      otherKey: 'my key',
      nestedKey: {
        'my key': 'some value',
        key2: 'key value',
        myKey3: 'key2',
        myKey4: ['some strings', 'another string'],
      },
    },
  ],
]).test('injectPropsIntoSchema with %o => %o', (props, schema, expected) => {
  // toEqual compares elements in objects for equality: used for Arrays and Objects
  expect(injectPropsIntoSchema(props, schema)).toEqual(expected);
});
