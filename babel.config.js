const {
  compilerOptions: {baseUrl, paths: pathLists},
} = require('./tsconfig.json');

const aliasesImports = Object.entries(pathLists).reduce(
  (ret, [pathKey, paths]) => {
    const regexEndStar = new RegExp(/\/\*$/);
    const regexFirstDot = new RegExp(/^\./);
    const key = pathKey.replace(regexEndStar, '');
    ret[key] = paths.map(value => {
      const path = value.replace(regexEndStar, '').replace(regexFirstDot, '');
      return `${baseUrl}${path}`;
    });
    return ret;
  },
  {},
);

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [baseUrl],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: aliasesImports,
      },
    ],
    'nativewind/babel',
  ],
};
