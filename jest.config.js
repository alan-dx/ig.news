module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: [//arquivos que devem ser executados antes de execturar os testes
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {//configurando uma espécie de loader que ira converter os arquivos React de ts para js, um formato que jest consiga entender, usando o babel-jest
    //O jest não interpreta arquivos ts por padrão
    "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,//configurando o Coverage (ferramenta que da um feedback/relatório dos testes - yarn test --coverage
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
  ],
  coverageReporters: ["lcov", "json"] //o resultado do coverage é armazenado em uma pasta
}