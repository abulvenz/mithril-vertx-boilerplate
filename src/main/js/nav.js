import m from 'mithril';

const compose = (...funcs) =>
  arg => funcs.reduceRight(
    (composed, func) => func(composed), arg);


class Navbar {
  view(vnode) {
    return [m("nav.nav[onclick='this.focus()'][tabindex='-1']",
      m(".container", [
        vnode.children
      ], [
        vnode.attrs.logout ? m('a.btn-c.btn.btn-sm.smooth', {
          onclick: e => vnode.attrs.logout()
        }, 'Logout') : null
      ])
    ), m("button.btn.btn-sm.btn-close", "×")];
  }
}

class Link {
  view(vnode) {
   // console.log('link:', vnode.attrs.link, 'route:', m.route.get())
    return m('a' + (m.route.get() === vnode.attrs.link ? '.current' : ''), {
        href: vnode.attrs.link,
        oncreate: m.route.link,
        onupdate: m.route.link
      },
      vnode.attrs.text);
  }
}

class Brand {
  view(vnode) {
    return m('a.pagename.current', {
        href: vnode.attrs.link,
        oncreate: m.route.link
      },
      vnode.attrs.text);
  }
}

export default {
  Navbar,
  Link,
  Brand
}
