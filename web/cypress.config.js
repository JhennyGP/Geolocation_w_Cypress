const { defineConfig } = require("cypress");
const { configurePlugin } = require ("cypress-mongodb");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    env: {
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@clusterhope.7csxy4y.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=ClusterHope',
        database: 'HopeDB'
      }
    }
  },
});
