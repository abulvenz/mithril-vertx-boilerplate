import m from 'mithril';

class Navbar {
    view(vnode) {
        return     m("nav.nav[onclick='this.focus()'][tabindex='-1']", 
        m(".container",
          [
            m("a.pagename.current[href='index.html']", 
              "Min"
            ),
            m("a.current[href='#']", 
              "Docs"
            ),
            m("a[href='download.html']", 
              "Download"
            ),
            m("a[href='examples.html']", 
              "Examples"
            ),
            m("a[href='https://github.com/owenversteeg/min']", 
              "Github"
            )],[
            m('a.btn-c.btn.btn-sm.smooth.pull-right',{onclick:e=>vnode.attrs.logout()},'Logout')
          ]
        )
      );
    }
}

class Heading {
    view(vnode) {
      return m('h' + vnode.attrs.level,vnode.attrs,vnode.children);
    }
}

const h = (level, attrs, children) => m(Heading,children? Object.assign({level: level},attrs):{level: level}, children);

class Container {
    view(vnode) {
        return m('.container', vnode.attrs, vnode.children);
    }
}

class Button {
    view(vnode) {
        return m('a.btn.smooth',vnode.attrs,vnode.children);
    }
}

class ButtonA {
    view(vnode) {
        return m('a.btn.smooth.btn-a',vnode.attrs,vnode.children);
    }
}

class ButtonB {
    view(vnode) {
        return m('a.btn.smooth.btn-b',vnode.attrs,vnode.children);
    }
}

class ButtonC {
    view(vnode) {
        return m('a.btn.smooth.btn-c',vnode.attrs,vnode.children);
    }
}

class Example {
view (vnode) {
    return [
    m(Navbar,{logout:()=>vnode.attrs.auth.logout()}), 
    m("button.btn.btn-sm.btn-close", 
      "×"
    ), 
    m(Container,
      [
        m("div",
          [
            m(Heading,{level:1}, 
              "Basics & Browser Support"
            ),
            m("p", 
              "Min's minimalism has several advantages. Firstly, it doesn't prescribe a specific design for you. Each element has just a handful of CSS rules applied to it, and as a result overriding default styles is extremely easy. Min being only 995 bytes means that there's less of it to get in your way when you want to customize your site. Contrast this with Bootstrap, where you may have to override many different rules to get what you want. Secondly, there's less markup to type. Min requires fewer superfluous divs and classes than any other framework, allowing every part of your code to be readable and semantically correct."
            ),
            m("p",
              [
                "Because of its minimalist goal, Min core has fewer features than Bootstrap. Many of the features omitted in Min are superfluous, unsemantic, and just plain idiotic (I'm looking at you, text-left class.) However, when using the",
                m("a[href='http://owenversteeg.com/min-bootstrap-plugin']", 
                  "3.5kB Min Bootstrap plugin"
                ),
                ", Min has full feature parity with Bootstrap. If you are migrating a complex site from Bootstrap to Min, it is highly recommended that you use this plugin."
              ]
            )
          ]
        ),
        m(".buttons",
          [
            h(1,
              "Buttons"
            ),
            m("a.btn.smooth.btn-a", 
              "btn-a"
            ),
            m(ButtonB, 
              "btn-b"
            ),
            m(ButtonA, 
              "btn-c"
            ),
            m("a.smooth.btn", 
              "classless"
            ),
            m("br"),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "a class=\"btn btn-b smooth\"",
                m.trust("&gt;"),
                "btn-b",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;")
              ]
            ),
            m("br"),
            m("a.btn.smooth.btn-a.btn-sm", 
              "btn-sm btn-a"
            ),
            m("a.btn.smooth.btn-b.btn-sm", 
              "btn-sm btn-b"
            ),
            m("a.btn.smooth.btn-c.btn-sm", 
              "btn-sm btn-c"
            ),
            m("a.btn.smooth.btn-sm", 
              "btn-sm classless"
            ),
            m("br"),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "a class=\"btn btn-b btn-sm smooth\"",
                m.trust("&gt;"),
                "btn-sm",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;")
              ]
            )
          ]
        ),
        m("div",
          [
            m("h1", 
              "Forms"
            ),
            m("input.smooth[placeholder='input type=&quot;text&quot;'][type='text']"),
            m("br"),
            m("br"),
            m("textarea.smooth[placeholder='textarea'][rows='3']"),
            m("br"),
            m("br"),
            m("span.addon", 
              "$"
            ),
            m("input.smooth[placeholder='span class=&quot;addon&quot;'][type='text']"),
            m("br"),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "input type=\"text\" class=\"smooth\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "textarea rows=\"3\" class=\"smooth\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "span class=\"addon\"",
                m.trust("&gt;"),
                "$",
                m.trust("&lt;"),
                "/span",
                m.trust("&gt;"),
                m.trust("&lt;"),
                "input type=\"text\" class=\"smooth\"",
                m.trust("&gt;")
              ]
            ),
            m(".msg",
              [
                m("strong", 
                  "Be careful with addons!"
                ),
                "If you do not want a space between the addon and the input make sure that there is no space between the",
                m("code",
                  [
                    m.trust("&lt;"),
                    "/span",
                    m.trust("&gt;")
                  ]
                ),
                "and",
                m("code",
                  [
                    m.trust("&lt;"),
                    "input",
                    m.trust("&gt;")
                  ]
                ),
                "tags. Example:",
                m("pre",
                  [
                    "... ",
                    m.trust("&lt;"),
                    "/span",
                    m.trust("&gt;"),
                    " ",
                    m.trust("&lt;"),
                    "input ..."
                  ]
                ),
                m("span.addon", 
                  "$"
                ),
                m("input.smooth[type='text']"),
                m("pre",
                  [
                    "... ",
                    m.trust("&lt;"),
                    "/span",
                    m.trust("&gt;"),
                    m.trust("&lt;"),
                    "input ..."
                  ]
                ),
                m("span.addon", 
                  "$"
                ),
                m("input.smooth[type='text']")
              ]
            )
          ]
        ),
        m(".navbar",
          [
            m("h1", 
              "Navbars"
            ),
            m("nav.nav[onclick='this.focus()'][tabindex='-1']", 
              m(".container",
                [
                  m("a.pagename.current[href='#']", 
                    "Min"
                  ),
                  m("a[href='#']", 
                    "One"
                  ),
                  m("a[href='#']", 
                    "Two"
                  ),
                  m("a[href='#']", 
                    "Three"
                  ),
                  m("a[href='#']", 
                    "Four"
                  )
                ]
              )
            ),
            m("button.btn-close.btn.btn-sm", 
              "×"
            ),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "nav class=\"nav\" tabindex=\"-1\" onclick=\"this.focus()\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "div class=\"container\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "a class=\"pagename current\" href=\"#\"",
                m.trust("&gt;"),
                "Min",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "a href=\"#\"",
                m.trust("&gt;"),
                "One",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "a href=\"#\"",
                m.trust("&gt;"),
                "Two",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "a href=\"#\"",
                m.trust("&gt;"),
                "Three",
                m.trust("&lt;"),
                "/a",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "/nav",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "button class=\"btn-close btn btn-sm\"",
                m.trust("&gt;"),
                "×",
                m.trust("&lt;"),
                "/button",
                m.trust("&gt;")
              ]
            )
          ]
        ),
        m("div",
          [
            m("h1", 
              "Tables"
            ),
            m("table.table",
              [
                m("thead", 
                  m("tr",
                    [
                      m("th", 
                        "#"
                      ),
                      m("th", 
                        "Widgets Sold"
                      ),
                      m("th", 
                        "Revenue (£)"
                      ),
                      m("th", 
                        "Profit (£)"
                      )
                    ]
                  )
                ),
                m("tbody",
                  [
                    m("tr",
                      [
                        m("td", 
                          "1"
                        ),
                        m("td", 
                          "5"
                        ),
                        m("td", 
                          "10"
                        ),
                        m("td", 
                          "2"
                        )
                      ]
                    ),
                    m("tr",
                      [
                        m("td", 
                          "2"
                        ),
                        m("td", 
                          "10"
                        ),
                        m("td", 
                          "20"
                        ),
                        m("td", 
                          "4"
                        )
                      ]
                    ),
                    m("tr",
                      [
                        m("td", 
                          "3"
                        ),
                        m("td", 
                          "500"
                        ),
                        m("td", 
                          "1000"
                        ),
                        m("td", 
                          "200"
                        )
                      ]
                    )
                  ]
                )
              ]
            ),
            m("br"),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "table class=\"table\"",
                m.trust("&gt;"),
                "\
      ",
                m.trust("&lt;"),
                "thead",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "tr",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "th",
                m.trust("&gt;"),
                "#",
                m.trust("&lt;"),
                "/th",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "th",
                m.trust("&gt;"),
                "Widgets Sold",
                m.trust("&lt;"),
                "/th",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "/tr",
                m.trust("&gt;"),
                "\
      ",
                m.trust("&lt;"),
                "/thead",
                m.trust("&gt;"),
                "\
      ",
                m.trust("&lt;"),
                "tbody",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "tr",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "1",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "5",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "/tr",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "tr",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "2",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "10",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "/tr",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "tr",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "3",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
              ",
                m.trust("&lt;"),
                "td",
                m.trust("&gt;"),
                "500",
                m.trust("&lt;"),
                "/td",
                m.trust("&gt;"),
                "\
          ",
                m.trust("&lt;"),
                "/tr",
                m.trust("&gt;"),
                "\
      ",
                m.trust("&lt;"),
                "/tbody",
                m.trust("&gt;"),
                "\
  ",
                m.trust("&lt;"),
                "/table",
                m.trust("&gt;")
              ]
            )
          ]
        ),
        m(".icons",
          [
            m("h1", 
              "Icons"
            ),
            m("i.ico",
              [
                m("b", 
                  "Android Safe"
                ),
                "☎ ♂ ♀ ⓧ © § ® ⇦ ⇧ ⇨ ⇩♠ ♣ ♥ ♦ ♪ ♛ ♜ ♝ ♞ ♟☜ ☞ ♨ ♭ ♯ ￥￡ ￠❊ ฿ ๏ ※ ₧ ₨ ₪ € №"
              ]
            ),
            m("br"),
            m("br"),
            m("message.great", 
              "The \"Android Safe\" icons work everywhere, tested on hundreds of devices."
            ),
            m("br"),
            m("i.ico",
              [
                m("b", 
                  "Total Set"
                ),
                "✉ ✰ ☁ ✈ ☑ ☒ ✆ ☀ ☮ ☢ ☠ ☣ ⌂ ℗ ☺ ☻ ☼ ∡ ∿ ⊝ ⊘ ⁂ ☤ ♫ ☄ ✎ ☟ ☝ ☹ ☭ ☚ ☛ ✌ 〠 ☃ ♮ ☂ ☸ ✍ ☯ ✂ ₩ ◍ ۩"
              ]
            ),
            m("br"),
            m("br"),
            m("message.warning", 
              "Although over 75% of Android devices we tested support all \"Total Set\" icons, if a substantial portion of your users use old Android devices you should stick to the \"Android Safe\" set. (The \"Total Set\" does not include icons from the \"Android Safe\" set.)"
            ),
            m("pre",
              [
                m.trust("&lt;"),
                "i class=\"ico\"",
                m.trust("&gt;"),
                "Copy and paste icons from above here!",
                m.trust("&lt;"),
                "/i",
                m.trust("&gt;")
              ]
            ),
            m("h1", 
              "Grids"
            ),
            m(".row", 
              m(".col.dark.c12", 
                "12"
              )
            ),
            m(".row",
              [
                m(".col.dark.c11", 
                  "11"
                ),
                m(".col.light.c1", 
                  "1"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c10", 
                  "10"
                ),
                m(".col.light.c2", 
                  "2"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c9", 
                  "9"
                ),
                m(".col.light.c3", 
                  "3"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c8", 
                  "8"
                ),
                m(".col.light.c4", 
                  "4"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c7", 
                  "7"
                ),
                m(".col.light.c5", 
                  "5"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c6", 
                  "6"
                ),
                m(".col.light.c6", 
                  "6"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c5", 
                  "5"
                ),
                m(".col.light.c7", 
                  "7"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c4", 
                  "4"
                ),
                m(".col.light.c8", 
                  "8"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c3", 
                  "3"
                ),
                m(".col.light.c9", 
                  "9"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c2", 
                  "2"
                ),
                m(".col.light.c10", 
                  "10"
                )
              ]
            ),
            m(".row",
              [
                m(".col.dark.c1", 
                  "1"
                ),
                m(".col.light.c11", 
                  "11"
                )
              ]
            ),
            m(".row", 
              m(".col.light.c12", 
                "12"
              )
            ),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "div class=\"row\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "div class=\"col c12\"",
                m.trust("&gt;"),
                "12",
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "div class=\"row\"",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "div class=\"col c4\"",
                m.trust("&gt;"),
                "4",
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "div class=\"col c8\"",
                m.trust("&gt;"),
                "8",
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;"),
                m("br"),
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;")
              ]
            )
          ]
        ),
        m("h1", 
          "Headings"
        ),
        m(".headings",
          [
            m("h1.exampleh1", 
              "h1"
            ),
            m("h2", 
              "h2"
            ),
            m("h3", 
              "h3"
            ),
            m("h4", 
              "h4"
            ),
            m("h5", 
              "h5"
            ),
            m("h6", 
              "h6"
            ),
            m("br"),
            m("pre",
              [
                m.trust("&lt;"),
                "h1",
                m.trust("&gt;"),
                "Level One Heading",
                m.trust("&lt;"),
                "/h1",
                m.trust("&gt;")
              ]
            )
          ]
        ),
        m("h1", 
          "Messages"
        ),
        m(".messages",
          [
            m(".msg",
              [
                m("strong", 
                  "Watch out!"
                ),
                "You almost scrolled off the page. There are reports of sea monsters past the end of the page and we do not advise you go there."
              ]
            ),
            m("pre",
              [
                m.trust("&lt;"),
                "div class=\"msg\"",
                m.trust("&gt;"),
                "\
      ",
                m.trust("&lt;"),
                "strong",
                m.trust("&gt;"),
                "Alert headline!",
                m.trust("&lt;"),
                "/strong",
                m.trust("&gt;"),
                "\
      Message text\
  ",
                m.trust("&lt;"),
                "/div",
                m.trust("&gt;")
              ]
            )
          ]
        )
      ]
    )
  ];
}
}


export default {
    Example,
    Navbar

}
