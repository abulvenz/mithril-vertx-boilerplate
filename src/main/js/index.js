import m from 'mithril';
import Auth from './auth/service';
import N from './nav';
import Content from './content';

import L from './mincomponents';
import utils from './utils';
// import interact from 'interactjs';
import fn from './fn';

import DragDrop from './dragdrop';


import m from 'mithril';

import fn from './fn';

let log = (...msg) => {
  console.log(...msg);
};

const mAuth = new Auth.Auth();

import Chart from 'chart.js';


console.log('Chart', Chart)

class ChartNode {
  oncreate(vnode) {
    var myChart = new Chart(vnode.dom.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  view(vnode) {
    return m('canvas', {
      width: 500,
      height: 400
    });
  }
}

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

const getParam = (vnode, param) => vnode.attrs[param] ? vnode.attrs[param] : param;

const components = fn.flatten([{
  name: 'container',
  view: (vnode) => m('.container', m(SlotList))
}, {
  name: 'div',
  view: (vnode) => m('', m(SlotList))
}, {
  name: 'row',
  view: (vnode) => m('.row', m(SlotList))
}, fn.interval(1, 12).map(colWidth => {
  return {
    name: 'c' + colWidth,
    view: (vnode) => m('.col.c' + colWidth, m(Slot)),
  }
}), ['a', 'b', 'c'].map(c => {
  return {
    name: 'button ' + c,
    view: (vnode) => m('a.btn.btn-sm.btn-' + c, 'click'),
  }
}), {
  name: 'row4-8',
  view: (vnode) => m('.row', m('.col.c4', m(Slot)), m('.col.c8', m(Slot))),
}, {
  name: 'row6-6',
  view: (vnode) => m('.row', m('.col.c6', m(Slot)), m('.col.c6', m(Slot))),
}, {
  name: 'input',
  view: vnode => [
    m("span.addon",
      "$"
    ),
    m("input.smooth[type='text']")
  ]
}, {
  name: 'h1',
  parameters: () => [{
    name: 'text'
  }],
  view: vnode => m('h1', getParam(vnode, 'text'))
}, {
  name: 'alert',
  view: (vnode) => m('.msg', 'click'),
}, {
  name: 'chart',
  view: (vnode) => m(ChartNode),
}]);

const byName = (arr, name) => {
  return utils.first(arr.filter(c => c.name === name));
}

let exampleComponent = () => {
  return {
    name: 'heading',
    properties: [{
      name: 'text'
    }],
    render: {
      view: vnode => m('h1', 'rendered'),
    },
    edit: {
      view: vnode => m('input', {
        placeHolder: 'enter $text'
      })
    },
    design: {
      view: vnode => m('h1', '$text')
    }
  }
};

class TemplateLeaf {
  constructor({
    children = [],
    parent = null,
    properties = [],
    component = {
      name: 'template',
      design: vnode => m(SlotList),
      view: vnode => m('', 'rendered'),
      edit: vnode => m('', 'fill in your text here')
    }
  }) {
    this.children = children;
    this.parent = parent;
    this.properties = properties;
    this.component = component;
    this.traverse(node =>
      node.children.forEach(child => child.parent = node));
  }
  listProperties() {
    return this.properties;
  }
  mapChildren(fn) {
    return this.children.map(fn);
  }
  filterChildren(fn) {
    return this.children.filter(fn);
  }
  traverse(fn) {
    fn(this)
    this.children.forEach(child => child.traverse(fn));
  }
}

let templateRoot = new TemplateLeaf({
  children: [new TemplateLeaf({
    component: byName(components, 'h1')
  })]
});

templateRoot.traverse(r => {
  delete r.parent;
});

console.log(JSON.stringify(templateRoot))

class Draggable {
  view(vnode) {
    return m('.drag-drop.draggable',
      DragDrop.drag(vnode.attrs.component.name),
      vnode.attrs.component.name)
  }
}

class Dropzone {
  concreate(vnode) {
    this.comp = null;
  }
  view(vnode) {
    return this.comp ? m(this.comp) : m('.dropzone', DragDrop.drop({
      dropped: cname => this.comp = byName(components, cname)
    }), '+');
  }
}

class Slot {
  constructor(vnode) {
    this.comp = null;
  }
  view(vnode) {
    return this.comp ? m(this.comp) : m('.dropzone', DragDrop.drop({
      dropped: cname => this.comp = byName(components, cname)
    }), '+');
  }
}

class SlotList {
  constructor(vnode) {
    this.comp = [];
  }
  view(vnode) {
    return [this.comp.length > 0 ? m('div.dropzone',
        DragDrop.drop({
          dropped: cname => this.comp.unshift(byName(components, cname))
        }), '<') : null,
      this.comp.map(c => m(c, {
        component: c
      }, c.name)),
      m('div.dropzone', DragDrop.drop({
        dropped: cname => this.comp.push(byName(components, cname))
      }), '>')
    ];
  }
}

class Editor {
  constructor(vnode) {
    this.rcomponents = [];
  }
  view(vnode) {
    return m('.container',
      m('.row',
        m('.col.c3.dark', 'Library', m('hr'),
          components.map(component => m(Draggable, {
            component: component
          }, component.name))),
        m('.col.c9.light', 'DesignZones', m('hr'),
          m(Dropzone, {}),
          // m(SlotList,   {
          //   append: c => rcomponents.push(c),
          //   prepend: c => rcomponents.unshift(c)
          // }, this.rcomponents.map(rc => m(rc))),
          //   m(Slot,   {})
        )
      ))
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
    return m('.container', m('.hero', m('h1', 'Who are you?')), m('.row', m('.col.c3'), m('.col.c6', [
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