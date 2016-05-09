import App from './App';
import Tag from './components/Tag';
import Listen from './components/Listen';
import Home from './components/Home';

export function configRouter (router) {
  router.map({
    '/': {
      name: 'app',
      component: App,
      subRoutes: {
        '/': {
          name: 'home',
          component: Home
        },
        '/tag': {
          name: 'tag',
          component: Tag
        },
        '/listen': {
          name: 'listen',
          component: Listen
        }
      }
    }
  });
}

