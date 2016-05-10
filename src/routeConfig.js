import App from './App';
import Tag from './components/Tag';
import Listen from './components/Listen';
import Home from './components/Home';
import DeezerChannel from './components/DeezerChannel';

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
    },
    '/channel.html': {
      name: 'channel',
      component: DeezerChannel
    }
  });
}

