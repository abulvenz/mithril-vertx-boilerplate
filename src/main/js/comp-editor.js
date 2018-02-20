import fn from './fn';
import m from 'mithril';


class ModalContent {
    view(vnode) {
        return [vnode.attrs.header ? m('.light-modal-header', vnode.attrs.header) : null,
            m(".light-modal-body", vnode.children),
            vnode.attrs.footer ? m('.light-modal-footer', vnode.attrs.header) : null
        ];
    }
}

class Modal {
    oncreate(vnode) {
        this.id = vnode.attrs.id || Math.random() * 65535;
    }
    view(vnode) {
        return [
            m(".light-modal[aria-hidden='false'][aria-labelledby='light-modal-label'][id='" + this.id + "'][role='dialog']",
                m(".light-modal-content.animated.zoomInUp", [
                    m("a.light-modal-close-icon[aria-label='close'][href='#']",
                        m.trust("&times;")
                    ),
                    vnode.children
                ])
            ), m('a.btn.btn-a.btn-xs', {
                href: '#' + this.id
            }, '+')
        ]
    }
}


const components = fn.flatten([{
    name: 'container',
    design:{  view: (vnode) => m('.container', m(SlotList))},
    edit:{  view: (vnode) => m('.container', m(SlotList))},
    view:{  view: (vnode) => m('.container', m(SlotList))}
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
    name: 'img',
    view: vnode => m('img', {
        width: '100%',
        src: 'http://via.placeholder.com/350x150'
    })
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
}, {
    name: 'modal',
    view: vnode => m(Modal, m(ModalContent, {
        header: m('h1', 'text')
    }, m(byName(components, 'img'))))
}]);


let layoutList = () => {
    
    let components = [];
    
    let addNewElement = () => {
        
    }
    
    return {
        view: vnode => {
            return m(Modal,{onclick:e => addNewElement()}, '+')
        }
    }
};



export default class ComponentEditor {
        view (vnode) {
            return m('.container', m(layoutList));
        }
}