const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require("cypress-browser-permissions")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on, config)

      return config
    },
    //Important to set this when use location on cypress
      "env": {
        "browserPermissions": {
          "notifications": "allow",
          "geolocation": "allow",
          "camera": "block",
          "microphone": "block",
          "images": "allow",
          "javascript": "allow",
          "popups": "ask",
          "plugins": "ask",
          "cookies": "allow"
        }
      }
  },
});
