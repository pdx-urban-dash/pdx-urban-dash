import each from 'jest-each';
import { defaultColors, getDefaultColor } from '../vizUtils';


each([
  [0, defaultColors[0]],
  [-1, defaultColors[3]],
  [11, defaultColors[3]],
  [98, defaultColors[2]],
]).test('getDefaultColor with idx: %d', (idx, expected) => {
  expect(getDefaultColor(idx)).toBe(expected);
});
