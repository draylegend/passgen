import { bootstrapApplication } from '@angular/platform-browser';

import { serverConfig } from './server.config';
import { AppComponent } from './src/app/app.component';

export default () => bootstrapApplication(AppComponent, serverConfig);
