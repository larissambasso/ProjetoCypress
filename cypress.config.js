const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter:'cypress-multi-reporters',
  reporterOptions:{
    reporterEnabled:'cypress-mochawesome-reporter,mocha-junit-reporter',
    mochaJunitReporterReporterOptions:{
      mochaFile:'cypress/reports/junit/results.xml'
    },
    cypressMochaweosomeReporterReporterOptions:{
      charts:true,
      reportPageTitle:'Relatorio de Web',
      embeddedScreenshots:true,
      inlineAssets:true,
      saveAllAttempts:false
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    baseUrl:'https://front.serverest.dev'
  },
});
