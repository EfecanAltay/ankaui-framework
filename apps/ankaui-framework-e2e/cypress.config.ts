import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run ankaui-framework:serve:development',
        production: 'nx run ankaui-framework:serve:production',
      },
      ciWebServerCommand: 'nx run ankaui-framework:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
