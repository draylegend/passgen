import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import { appConfig } from './src/app/app.config';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()],
});
