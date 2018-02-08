import m from 'mithril';

import Chart from 'chart.js';


console.log('Chart',Chart)

class ChartNode {
    oncreate(vnode){
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
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
    view (vnode) {
        return m('canvas',{width:500,height:400});
    }
}

export default class {
  view(vnode) {
    return m(".content-wrapper",
      m(".container-fluid", [
        m("ol.breadcrumb", [
          m("li.breadcrumb-item",
            m("a[href='#']",
              "Dashboard"
            )
          ),
          m("li.breadcrumb-item.active",
            "My Dashboard"
          )
        ]),
        m(".row", [
          m(".col-xl-3.col-sm-6.mb-3",
            m(".card.text-white.bg-primary.o-hidden.h-100", [
              m(".card-body", [
                m(".card-body-icon",
                  m("i.fa.fa-fw.fa-comments")
                ),
                m(".mr-5",
                  "26 New Messages!"
                )
              ]),
              m("a.card-footer.text-white.clearfix.small.z-1[href='#']", [
                m("span.float-left",
                  "View Details"
                ),
                m("span.float-right",
                  m("i.fa.fa-angle-right")
                )
              ])
            ])
          ),
          m(".col-xl-3.col-sm-6.mb-3",
            m(".card.text-white.bg-warning.o-hidden.h-100", [
              m(".card-body", [
                m(".card-body-icon",
                  m("i.fa.fa-fw.fa-list")
                ),
                m(".mr-5",
                  "11 New Tasks!"
                )
              ]),
              m("a.card-footer.text-white.clearfix.small.z-1[href='#']", [
                m("span.float-left",
                  "View Details"
                ),
                m("span.float-right",
                  m("i.fa.fa-angle-right")
                )
              ])
            ])
          ),
          m(".col-xl-3.col-sm-6.mb-3",
            m(".card.text-white.bg-success.o-hidden.h-100", [
              m(".card-body", [
                m(".card-body-icon",
                  m("i.fa.fa-fw.fa-shopping-cart")
                ),
                m(".mr-5",
                  "123 New Orders!"
                )
              ]),
              m("a.card-footer.text-white.clearfix.small.z-1[href='#']", [
                m("span.float-left",
                  "View Details"
                ),
                m("span.float-right",
                  m("i.fa.fa-angle-right")
                )
              ])
            ])
          ),
          m(".col-xl-3.col-sm-6.mb-3",
            m(".card.text-white.bg-danger.o-hidden.h-100", [
              m(".card-body", [
                m(".card-body-icon",
                  m("i.fa.fa-fw.fa-support")
                ),
                m(".mr-5",
                  "13 New Tickets!"
                )
              ]),
              m("a.card-footer.text-white.clearfix.small.z-1[href='#']", [
                m("span.float-left",
                  "View Details"
                ),
                m("span.float-right",
                  m("i.fa.fa-angle-right")
                )
              ])
            ])
          )
        ]),
        m(".card.mb-3", [
          m(".card-header", [
            m("i.fa.fa-area-chart"),
            "Area Chart Example"
          ]),
          m(".card-body",
            m(ChartNode)
       //     m("canvas[height='30'][id='myAreaChart'][width='100%']")
          ),
          m(".card-footer.small.text-muted",
            "Updated yesterday at 11:59 PM"
          )
        ]),
        m(".row", [
          m(".col-lg-8", [
            m(".card.mb-3", [
              m(".card-header", [
                m("i.fa.fa-bar-chart"),
                "Bar Chart Example"
              ]),
              m(".card-body",
                m(".row", [
                  m(".col-sm-8.my-auto",
                    m("canvas[height='50'][id='myBarChart'][width='100']")
                  ),
                  m(".col-sm-4.text-center.my-auto", [
                    m(".h4.mb-0.text-primary",
                      "$34,693"
                    ),
                    m(".small.text-muted",
                      "YTD Revenue"
                    ),
                    m("hr"),
                    m(".h4.mb-0.text-warning",
                      "$18,474"
                    ),
                    m(".small.text-muted",
                      "YTD Expenses"
                    ),
                    m("hr"),
                    m(".h4.mb-0.text-success",
                      "$16,219"
                    ),
                    m(".small.text-muted",
                      "YTD Margin"
                    )
                  ])
                ])
              ),
              m(".card-footer.small.text-muted",
                "Updated yesterday at 11:59 PM"
              )
            ]),
            m(".mb-0.mt-4", [
              m("i.fa.fa-newspaper-o"),
              "News Feed"
            ]),
            m("hr.mt-2"),
            m(".card-columns", [
              m(".card.mb-3", [
                m("a[href='#']",
                  m("img.card-img-top.img-fluid.w-100[alt=''][src='https://unsplash.it/700/450?image=610']")
                ),
                m(".card-body", [
                  m("h6.card-title.mb-1",
                    m("a[href='#']",
                      "David Miller"
                    )
                  ),
                  m("p.card-text.small", [
                    "These waves are looking pretty good today!",
                    m("a[href='#']",
                      "#surfsup"
                    )
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.py-2.small", [
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-thumbs-up"),
                    "Like"
                  ]),
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-comment"),
                    "Comment"
                  ]),
                  m("a.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-share"),
                    "Share"
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.small.bg-faded",
                  m(".media", [
                    m("img.d-flex.mr-3[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("h6.mt-0.mb-1",
                        m("a[href='#']",
                          "John Smith"
                        )
                      ),
                      "Very nice! I wish I was there! That looks amazing!",
                      m("ul.list-inline.mb-0", [
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Like"
                          )
                        ),
                        m("li.list-inline-item",
                          "·"
                        ),
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Reply"
                          )
                        )
                      ]),
                      m(".media.mt-3", [
                        m("a.d-flex.pr-3[href='#']",
                          m("img[alt=''][src='http://placehold.it/45x45']")
                        ),
                        m(".media-body", [
                          m("h6.mt-0.mb-1",
                            m("a[href='#']",
                              "David Miller"
                            )
                          ),
                          "Next time for sure!",
                          m("ul.list-inline.mb-0", [
                            m("li.list-inline-item",
                              m("a[href='#']",
                                "Like"
                              )
                            ),
                            m("li.list-inline-item",
                              "·"
                            ),
                            m("li.list-inline-item",
                              m("a[href='#']",
                                "Reply"
                              )
                            )
                          ])
                        ])
                      ])
                    ])
                  ])
                ),
                m(".card-footer.small.text-muted",
                  "Posted 32 mins ago"
                )
              ]),
              m(".card.mb-3", [
                m("a[href='#']",
                  m("img.card-img-top.img-fluid.w-100[alt=''][src='https://unsplash.it/700/450?image=180']")
                ),
                m(".card-body", [
                  m("h6.card-title.mb-1",
                    m("a[href='#']",
                      "John Smith"
                    )
                  ),
                  m("p.card-text.small", [
                    "Another day at the office...",
                    m("a[href='#']",
                      "#workinghardorhardlyworking"
                    )
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.py-2.small", [
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-thumbs-up"),
                    "Like"
                  ]),
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-comment"),
                    "Comment"
                  ]),
                  m("a.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-share"),
                    "Share"
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.small.bg-faded",
                  m(".media", [
                    m("img.d-flex.mr-3[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("h6.mt-0.mb-1",
                        m("a[href='#']",
                          "Jessy Lucas"
                        )
                      ),
                      "Where did you get that camera?! I want one!",
                      m("ul.list-inline.mb-0", [
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Like"
                          )
                        ),
                        m("li.list-inline-item",
                          "·"
                        ),
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Reply"
                          )
                        )
                      ])
                    ])
                  ])
                ),
                m(".card-footer.small.text-muted",
                  "Posted 46 mins ago"
                )
              ]),
              m(".card.mb-3", [
                m("a[href='#']",
                  m("img.card-img-top.img-fluid.w-100[alt=''][src='https://unsplash.it/700/450?image=281']")
                ),
                m(".card-body", [
                  m("h6.card-title.mb-1",
                    m("a[href='#']",
                      "Jeffery Wellings"
                    )
                  ),
                  m("p.card-text.small", [
                    "Nice shot from the skate park!",
                    m("a[href='#']",
                      "#kickflip"
                    ),
                    m("a[href='#']",
                      "#holdmybeer"
                    ),
                    m("a[href='#']",
                      "#igotthis"
                    )
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.py-2.small", [
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-thumbs-up"),
                    "Like"
                  ]),
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-comment"),
                    "Comment"
                  ]),
                  m("a.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-share"),
                    "Share"
                  ])
                ]),
                m(".card-footer.small.text-muted",
                  "Posted 1 hr ago"
                )
              ]),
              m(".card.mb-3", [
                m("a[href='#']",
                  m("img.card-img-top.img-fluid.w-100[alt=''][src='https://unsplash.it/700/450?image=185']")
                ),
                m(".card-body", [
                  m("h6.card-title.mb-1",
                    m("a[href='#']",
                      "David Miller"
                    )
                  ),
                  m("p.card-text.small", [
                    "It's hot, and I might be lost...",
                    m("a[href='#']",
                      "#desert"
                    ),
                    m("a[href='#']",
                      "#water"
                    ),
                    m("a[href='#']",
                      "#anyonehavesomewater"
                    ),
                    m("a[href='#']",
                      "#noreally"
                    ),
                    m("a[href='#']",
                      "#thirsty"
                    ),
                    m("a[href='#']",
                      "#dehydration"
                    )
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.py-2.small", [
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-thumbs-up"),
                    "Like"
                  ]),
                  m("a.mr-3.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-comment"),
                    "Comment"
                  ]),
                  m("a.d-inline-block[href='#']", [
                    m("i.fa.fa-fw.fa-share"),
                    "Share"
                  ])
                ]),
                m("hr.my-0"),
                m(".card-body.small.bg-faded",
                  m(".media", [
                    m("img.d-flex.mr-3[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("h6.mt-0.mb-1",
                        m("a[href='#']",
                          "John Smith"
                        )
                      ),
                      "The oasis is a mile that way, or is that just a mirage?",
                      m("ul.list-inline.mb-0", [
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Like"
                          )
                        ),
                        m("li.list-inline-item",
                          "·"
                        ),
                        m("li.list-inline-item",
                          m("a[href='#']",
                            "Reply"
                          )
                        )
                      ]),
                      m(".media.mt-3", [
                        m("a.d-flex.pr-3[href='#']",
                          m("img[alt=''][src='http://placehold.it/45x45']")
                        ),
                        m(".media-body", [
                          m("h6.mt-0.mb-1",
                            m("a[href='#']",
                              "David Miller"
                            )
                          ),
                          m("img.img-fluid.w-100.mb-1[alt=''][src='https://unsplash.it/700/450?image=789']"),
                          "I'm saved, I found a cactus. How do I open this thing?",
                          m("ul.list-inline.mb-0", [
                            m("li.list-inline-item",
                              m("a[href='#']",
                                "Like"
                              )
                            ),
                            m("li.list-inline-item",
                              "·"
                            ),
                            m("li.list-inline-item",
                              m("a[href='#']",
                                "Reply"
                              )
                            )
                          ])
                        ])
                      ])
                    ])
                  ])
                ),
                m(".card-footer.small.text-muted",
                  "Posted yesterday"
                )
              ])
            ])
          ]),
          m(".col-lg-4", [
            m(".card.mb-3", [
              m(".card-header", [
                m("i.fa.fa-pie-chart"),
                "Pie Chart Example"
              ]),
              m(".card-body",
                m("canvas[height='100'][id='myPieChart'][width='100%']")
              ),
              m(".card-footer.small.text-muted",
                "Updated yesterday at 11:59 PM"
              )
            ]),
            m(".card.mb-3", [
              m(".card-header", [
                m("i.fa.fa-bell-o"),
                "Feed Example"
              ]),
              m(".list-group.list-group-flush.small", [
                m("a.list-group-item.list-group-item-action[href='#']",
                  m(".media", [
                    m("img.d-flex.mr-3.rounded-circle[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("strong",
                        "David Miller"
                      ),
                      "posted a new article to",
                      m("strong",
                        "David Miller Website"
                      ),
                      ".",
                      m(".text-muted.smaller",
                        "Today at 5:43 PM - 5m ago"
                      )
                    ])
                  ])
                ),
                m("a.list-group-item.list-group-item-action[href='#']",
                  m(".media", [
                    m("img.d-flex.mr-3.rounded-circle[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("strong",
                        "Samantha King"
                      ),
                      "sent you a new message!",
                      m(".text-muted.smaller",
                        "Today at 4:37 PM - 1hr ago"
                      )
                    ])
                  ])
                ),
                m("a.list-group-item.list-group-item-action[href='#']",
                  m(".media", [
                    m("img.d-flex.mr-3.rounded-circle[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("strong",
                        "Jeffery Wellings"
                      ),
                      "added a new photo to the album",
                      m("strong",
                        "Beach"
                      ),
                      ".",
                      m(".text-muted.smaller",
                        "Today at 4:31 PM - 1hr ago"
                      )
                    ])
                  ])
                ),
                m("a.list-group-item.list-group-item-action[href='#']",
                  m(".media", [
                    m("img.d-flex.mr-3.rounded-circle[alt=''][src='http://placehold.it/45x45']"),
                    m(".media-body", [
                      m("i.fa.fa-code-fork"),
                      m("strong",
                        "Monica Dennis"
                      ),
                      "forked the",
                      m("strong",
                        "startbootstrap-sb-admin"
                      ),
                      "repository on",
                      m("strong",
                        "GitHub"
                      ),
                      ".",
                      m(".text-muted.smaller",
                        "Today at 3:54 PM - 2hrs ago"
                      )
                    ])
                  ])
                ),
                m("a.list-group-item.list-group-item-action[href='#']",
                  "View all activity..."
                )
              ]),
              m(".card-footer.small.text-muted",
                "Updated yesterday at 11:59 PM"
              )
            ])
          ])
        ]),
        m(".card.mb-3", [
          m(".card-header", [
            m("i.fa.fa-table"),
            "Data Table Example"
          ]),
          m(".card-body",
            m(".table-responsive",
              m("table.table.table-bordered[cellspacing='0'][id='dataTable'][width='100%']", [
                m("thead",
                  m("tr", [
                    m("th",
                      "Name"
                    ),
                    m("th",
                      "Position"
                    ),
                    m("th",
                      "Office"
                    ),
                    m("th",
                      "Age"
                    ),
                    m("th",
                      "Start date"
                    ),
                    m("th",
                      "Salary"
                    )
                  ])
                ),
                m("tfoot",
                  m("tr", [
                    m("th",
                      "Name"
                    ),
                    m("th",
                      "Position"
                    ),
                    m("th",
                      "Office"
                    ),
                    m("th",
                      "Age"
                    ),
                    m("th",
                      "Start date"
                    ),
                    m("th",
                      "Salary"
                    )
                  ])
                ),
                m("tbody", [
                  m("tr", [
                    m("td",
                      "Tiger Nixon"
                    ),
                    m("td",
                      "System Architect"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "61"
                    ),
                    m("td",
                      "2011/04/25"
                    ),
                    m("td",
                      "$320,800"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Garrett Winters"
                    ),
                    m("td",
                      "Accountant"
                    ),
                    m("td",
                      "Tokyo"
                    ),
                    m("td",
                      "63"
                    ),
                    m("td",
                      "2011/07/25"
                    ),
                    m("td",
                      "$170,750"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Ashton Cox"
                    ),
                    m("td",
                      "Junior Technical Author"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "66"
                    ),
                    m("td",
                      "2009/01/12"
                    ),
                    m("td",
                      "$86,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Cedric Kelly"
                    ),
                    m("td",
                      "Senior Javascript Developer"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "22"
                    ),
                    m("td",
                      "2012/03/29"
                    ),
                    m("td",
                      "$433,060"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Airi Satou"
                    ),
                    m("td",
                      "Accountant"
                    ),
                    m("td",
                      "Tokyo"
                    ),
                    m("td",
                      "33"
                    ),
                    m("td",
                      "2008/11/28"
                    ),
                    m("td",
                      "$162,700"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Brielle Williamson"
                    ),
                    m("td",
                      "Integration Specialist"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "61"
                    ),
                    m("td",
                      "2012/12/02"
                    ),
                    m("td",
                      "$372,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Herrod Chandler"
                    ),
                    m("td",
                      "Sales Assistant"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "59"
                    ),
                    m("td",
                      "2012/08/06"
                    ),
                    m("td",
                      "$137,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Rhona Davidson"
                    ),
                    m("td",
                      "Integration Specialist"
                    ),
                    m("td",
                      "Tokyo"
                    ),
                    m("td",
                      "55"
                    ),
                    m("td",
                      "2010/10/14"
                    ),
                    m("td",
                      "$327,900"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Colleen Hurst"
                    ),
                    m("td",
                      "Javascript Developer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "39"
                    ),
                    m("td",
                      "2009/09/15"
                    ),
                    m("td",
                      "$205,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Sonya Frost"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "23"
                    ),
                    m("td",
                      "2008/12/13"
                    ),
                    m("td",
                      "$103,600"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jena Gaines"
                    ),
                    m("td",
                      "Office Manager"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "30"
                    ),
                    m("td",
                      "2008/12/19"
                    ),
                    m("td",
                      "$90,560"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Quinn Flynn"
                    ),
                    m("td",
                      "Support Lead"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "22"
                    ),
                    m("td",
                      "2013/03/03"
                    ),
                    m("td",
                      "$342,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Charde Marshall"
                    ),
                    m("td",
                      "Regional Director"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "36"
                    ),
                    m("td",
                      "2008/10/16"
                    ),
                    m("td",
                      "$470,600"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Haley Kennedy"
                    ),
                    m("td",
                      "Senior Marketing Designer"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "43"
                    ),
                    m("td",
                      "2012/12/18"
                    ),
                    m("td",
                      "$313,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Tatyana Fitzpatrick"
                    ),
                    m("td",
                      "Regional Director"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "19"
                    ),
                    m("td",
                      "2010/03/17"
                    ),
                    m("td",
                      "$385,750"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Michael Silva"
                    ),
                    m("td",
                      "Marketing Designer"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "66"
                    ),
                    m("td",
                      "2012/11/27"
                    ),
                    m("td",
                      "$198,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Paul Byrd"
                    ),
                    m("td",
                      "Chief Financial Officer (CFO)"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "64"
                    ),
                    m("td",
                      "2010/06/09"
                    ),
                    m("td",
                      "$725,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Gloria Little"
                    ),
                    m("td",
                      "Systems Administrator"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "59"
                    ),
                    m("td",
                      "2009/04/10"
                    ),
                    m("td",
                      "$237,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Bradley Greer"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "41"
                    ),
                    m("td",
                      "2012/10/13"
                    ),
                    m("td",
                      "$132,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Dai Rios"
                    ),
                    m("td",
                      "Personnel Lead"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "35"
                    ),
                    m("td",
                      "2012/09/26"
                    ),
                    m("td",
                      "$217,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jenette Caldwell"
                    ),
                    m("td",
                      "Development Lead"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "30"
                    ),
                    m("td",
                      "2011/09/03"
                    ),
                    m("td",
                      "$345,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Yuri Berry"
                    ),
                    m("td",
                      "Chief Marketing Officer (CMO)"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "40"
                    ),
                    m("td",
                      "2009/06/25"
                    ),
                    m("td",
                      "$675,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Caesar Vance"
                    ),
                    m("td",
                      "Pre-Sales Support"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "21"
                    ),
                    m("td",
                      "2011/12/12"
                    ),
                    m("td",
                      "$106,450"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Doris Wilder"
                    ),
                    m("td",
                      "Sales Assistant"
                    ),
                    m("td",
                      "Sidney"
                    ),
                    m("td",
                      "23"
                    ),
                    m("td",
                      "2010/09/20"
                    ),
                    m("td",
                      "$85,600"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Angelica Ramos"
                    ),
                    m("td",
                      "Chief Executive Officer (CEO)"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "47"
                    ),
                    m("td",
                      "2009/10/09"
                    ),
                    m("td",
                      "$1,200,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Gavin Joyce"
                    ),
                    m("td",
                      "Developer"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "42"
                    ),
                    m("td",
                      "2010/12/22"
                    ),
                    m("td",
                      "$92,575"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jennifer Chang"
                    ),
                    m("td",
                      "Regional Director"
                    ),
                    m("td",
                      "Singapore"
                    ),
                    m("td",
                      "28"
                    ),
                    m("td",
                      "2010/11/14"
                    ),
                    m("td",
                      "$357,650"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Brenden Wagner"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "28"
                    ),
                    m("td",
                      "2011/06/07"
                    ),
                    m("td",
                      "$206,850"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Fiona Green"
                    ),
                    m("td",
                      "Chief Operating Officer (COO)"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "48"
                    ),
                    m("td",
                      "2010/03/11"
                    ),
                    m("td",
                      "$850,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Shou Itou"
                    ),
                    m("td",
                      "Regional Marketing"
                    ),
                    m("td",
                      "Tokyo"
                    ),
                    m("td",
                      "20"
                    ),
                    m("td",
                      "2011/08/14"
                    ),
                    m("td",
                      "$163,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Michelle House"
                    ),
                    m("td",
                      "Integration Specialist"
                    ),
                    m("td",
                      "Sidney"
                    ),
                    m("td",
                      "37"
                    ),
                    m("td",
                      "2011/06/02"
                    ),
                    m("td",
                      "$95,400"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Suki Burks"
                    ),
                    m("td",
                      "Developer"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "53"
                    ),
                    m("td",
                      "2009/10/22"
                    ),
                    m("td",
                      "$114,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Prescott Bartlett"
                    ),
                    m("td",
                      "Technical Author"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "27"
                    ),
                    m("td",
                      "2011/05/07"
                    ),
                    m("td",
                      "$145,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Gavin Cortez"
                    ),
                    m("td",
                      "Team Leader"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "22"
                    ),
                    m("td",
                      "2008/10/26"
                    ),
                    m("td",
                      "$235,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Martena Mccray"
                    ),
                    m("td",
                      "Post-Sales support"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "46"
                    ),
                    m("td",
                      "2011/03/09"
                    ),
                    m("td",
                      "$324,050"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Unity Butler"
                    ),
                    m("td",
                      "Marketing Designer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "47"
                    ),
                    m("td",
                      "2009/12/09"
                    ),
                    m("td",
                      "$85,675"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Howard Hatfield"
                    ),
                    m("td",
                      "Office Manager"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "51"
                    ),
                    m("td",
                      "2008/12/16"
                    ),
                    m("td",
                      "$164,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Hope Fuentes"
                    ),
                    m("td",
                      "Secretary"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "41"
                    ),
                    m("td",
                      "2010/02/12"
                    ),
                    m("td",
                      "$109,850"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Vivian Harrell"
                    ),
                    m("td",
                      "Financial Controller"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "62"
                    ),
                    m("td",
                      "2009/02/14"
                    ),
                    m("td",
                      "$452,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Timothy Mooney"
                    ),
                    m("td",
                      "Office Manager"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "37"
                    ),
                    m("td",
                      "2008/12/11"
                    ),
                    m("td",
                      "$136,200"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jackson Bradshaw"
                    ),
                    m("td",
                      "Director"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "65"
                    ),
                    m("td",
                      "2008/09/26"
                    ),
                    m("td",
                      "$645,750"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Olivia Liang"
                    ),
                    m("td",
                      "Support Engineer"
                    ),
                    m("td",
                      "Singapore"
                    ),
                    m("td",
                      "64"
                    ),
                    m("td",
                      "2011/02/03"
                    ),
                    m("td",
                      "$234,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Bruno Nash"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "38"
                    ),
                    m("td",
                      "2011/05/03"
                    ),
                    m("td",
                      "$163,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Sakura Yamamoto"
                    ),
                    m("td",
                      "Support Engineer"
                    ),
                    m("td",
                      "Tokyo"
                    ),
                    m("td",
                      "37"
                    ),
                    m("td",
                      "2009/08/19"
                    ),
                    m("td",
                      "$139,575"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Thor Walton"
                    ),
                    m("td",
                      "Developer"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "61"
                    ),
                    m("td",
                      "2013/08/11"
                    ),
                    m("td",
                      "$98,540"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Finn Camacho"
                    ),
                    m("td",
                      "Support Engineer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "47"
                    ),
                    m("td",
                      "2009/07/07"
                    ),
                    m("td",
                      "$87,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Serge Baldwin"
                    ),
                    m("td",
                      "Data Coordinator"
                    ),
                    m("td",
                      "Singapore"
                    ),
                    m("td",
                      "64"
                    ),
                    m("td",
                      "2012/04/09"
                    ),
                    m("td",
                      "$138,575"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Zenaida Frank"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "63"
                    ),
                    m("td",
                      "2010/01/04"
                    ),
                    m("td",
                      "$125,250"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Zorita Serrano"
                    ),
                    m("td",
                      "Software Engineer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "56"
                    ),
                    m("td",
                      "2012/06/01"
                    ),
                    m("td",
                      "$115,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jennifer Acosta"
                    ),
                    m("td",
                      "Junior Javascript Developer"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "43"
                    ),
                    m("td",
                      "2013/02/01"
                    ),
                    m("td",
                      "$75,650"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Cara Stevens"
                    ),
                    m("td",
                      "Sales Assistant"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "46"
                    ),
                    m("td",
                      "2011/12/06"
                    ),
                    m("td",
                      "$145,600"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Hermione Butler"
                    ),
                    m("td",
                      "Regional Director"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "47"
                    ),
                    m("td",
                      "2011/03/21"
                    ),
                    m("td",
                      "$356,250"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Lael Greer"
                    ),
                    m("td",
                      "Systems Administrator"
                    ),
                    m("td",
                      "London"
                    ),
                    m("td",
                      "21"
                    ),
                    m("td",
                      "2009/02/27"
                    ),
                    m("td",
                      "$103,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Jonas Alexander"
                    ),
                    m("td",
                      "Developer"
                    ),
                    m("td",
                      "San Francisco"
                    ),
                    m("td",
                      "30"
                    ),
                    m("td",
                      "2010/07/14"
                    ),
                    m("td",
                      "$86,500"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Shad Decker"
                    ),
                    m("td",
                      "Regional Director"
                    ),
                    m("td",
                      "Edinburgh"
                    ),
                    m("td",
                      "51"
                    ),
                    m("td",
                      "2008/11/13"
                    ),
                    m("td",
                      "$183,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Michael Bruce"
                    ),
                    m("td",
                      "Javascript Developer"
                    ),
                    m("td",
                      "Singapore"
                    ),
                    m("td",
                      "29"
                    ),
                    m("td",
                      "2011/06/27"
                    ),
                    m("td",
                      "$183,000"
                    )
                  ]),
                  m("tr", [
                    m("td",
                      "Donna Snider"
                    ),
                    m("td",
                      "Customer Support"
                    ),
                    m("td",
                      "New York"
                    ),
                    m("td",
                      "27"
                    ),
                    m("td",
                      "2011/01/25"
                    ),
                    m("td",
                      "$112,000"
                    )
                  ])
                ])
              ])
            )
          ),
          m(".card-footer.small.text-muted",
            "Updated yesterday at 11:59 PM"
          )
        ])
      ])
    );
  }
}
