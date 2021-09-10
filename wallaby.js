module.exports = function(wallaby) {
  return {
    files: [
      "src/**/*.ts"
    ],

    tests: [
      "tests/**/*.spec.ts"
    ],
  };
}