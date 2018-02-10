import m from 'mithril';
import fn from './fn';
import DragDrop from './dragdrop';
import utils from './utils';


const getParam = (vnode, param) => vnode.attrs[param] ? vnode.attrs[param] : param;

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
            ), m('a.btn.btn-a', {
                href: '#' + this.id
            }, 'Open modal')
        ]
    }
}


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

export default class Editor {
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