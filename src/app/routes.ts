import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';

const routeConfig: Routes = [
    {
      path: '',
      component: Home,
      title: 'Housing Listings',
    },
    {
      path: 'details/:id',
      component: Details,
      title: 'Housing Details',
    },
  ];
  
  export default routeConfig;