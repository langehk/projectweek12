      // Installs globals onto window:
      // * Buffer
      // * require (monkey-patches if already defined)
      // * process
      // You can pass in an arbitrary object if you do not wish to pollute
      // the global namespace.
      BrowserFS.install(window);
      // Configures BrowserFS to use the LocalStorage file system.
      BrowserFS.configure({
        fs: "LocalStorage"
      }, function(e) {
        if (e) {
          // An error happened!
          throw e;
        }
        // Otherwise, BrowserFS is ready-to-use!
      });