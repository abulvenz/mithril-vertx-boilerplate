import m from 'mithril';
import Auth from './auth/service';
import N from './nav';
import Content from './content';

import L from './mincomponents';
import utils from './utils';
// import interact from 'interactjs';
import fn from './fn';

import m from 'mithril';

import fn from './fn';
import Editor from './editor';

let log = (...msg) => {
  console.log(...msg);
};

const mAuth = new Auth.Auth();



class Page1 {
  view(vnode) {
    return m('.container', m('h1', 'page1'))
  }
}

class Page2 {
  view(vnode) {
    return m('.container', m('h1', 'page2'))
  }
}



var links = [{
  text: 'BuildStuff',
  link: '/',
  component: {
    render: vnode => m(Page1)
  },
  brand: true
}, {
  text: 'Rendering',
  link: '/page2',
  component: {
    render: vnode => m(Page2)
  }
}, {
  text: 'Fusions',
  link: '/fusion',
  component: {
    render: vnode => m(Login)
  }
}, {
  text: 'Editor',
  link: '/editor',
  component: {
    render: vnode => m(Editor)
  }
}];

class PageHeader {
  view(vnode) {
    return m(N.Navbar, {
      logout: () => mAuth.logout()
    }, links.map(link => m(link.brand ? N.Brand : N.Link, link)))
  }
}

class PageContent {
  view(vnode) {
    return m(Router);
  }
}

class PageFooter {
  view(vnode) {
    return m('footer', 'footer');
  }
}

class Layout {
  view(vnode) {
    return [
      m(PageHeader),
      m(PageContent),
      m(PageFooter)
    ];
  }
}

class Router {
  constructor(vnode) {
    m.route.prefix('');
  }
  oncreate(vnode) {
    m.route(vnode.dom, '/', utils.toMap(links, 'link', 'component'));
  }
  view(vnode) {
    return m('');
  }
}

class Login {
  view(vnode) {
    return m('.container', m('.hero', m('h1', 'Who are you?')), m('.row', m('.col.c3',' '), m('.col.c12', [
      m('.row', m('.col.c12', m('label.label', 'Username'))),
      m('.row', m('.col.c12', m("input.smooth[autofocus=''][id='email'][name='username'][placeholder='you@example.com'][required=''][type='text']", {
        onkeyup: e => mAuth.setUsername(e.target.value),
        onchange: e => mAuth.setUsername(e.target.value)
      }))),
      m('.row', m('.col.c12', m('label.label', 'Password'))),

      m('.row', m('.col.c12', m("input.smooth[id='password'][name='password'][placeholder='Password'][required=''][type='password']", {
        onkeyup: e => mAuth.setPassword(e.target.value),
        onchange: e => mAuth.setPassword(e.target.value)
      }))),
      m('.row', m('.col.c12', m("a.btn.btn-a", {
        onclick: e => mAuth.login()
      }, [
        m("i.fa.fa-sign-in"),
        "Login"
      ])))
    ])));
  }
}

m.mount(document.body, {
  view: (vnode) => {
    return mAuth.loggedIn ? m(Layout) : m(Login);
  }
});