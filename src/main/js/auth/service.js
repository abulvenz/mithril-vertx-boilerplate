
import m from 'mithril';


class Auth {
    constructor() {
   this. username= "";
   this.password = "";
   this.loggedIn = false;
   m.request({
	method: 'GET',
	    url:'/api/loggedin',
	    withCredentials:true
	    }).then(data=> {
            console.log('data',data)
		    this.loggedIn= data.loggedIn;		 
		    console.log('Auth loggedIn: ' + this.loggedIn);
		});

    }
    setUsername(value) {
        this.username = value
    }
    setPassword(value) {
        this.password = value
    }
    login() {
        console.log('Logging in')
        m.request({
		method: 'POST',
		url: "/api/login",
		data: {username: this.username, password: this.password}
	    }).then((data)=> {
		    console.log(this);
            this.loggedIn = true;
            m.redraw();
		 //   m.route.set("/list");
		});
    }
    logout(){
        m.request({
            method: 'POST',
            url: "/api/logout"
            }).then((data)=> {
                this.loggedIn = false;
                console.log(this)
                m.redraw();
          //      m.route.set("/list");
            });
    }
};

export default {
    Auth
}