import { Route } from '@angular/router';

export const homeFeatureRoute: Route = {
  loadComponent: () => import('./home-feature.component'),
  path: '',
};
