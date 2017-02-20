import moment from 'moment';
import Vue from 'vue';
import Axios from 'axios';

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(rightNow);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});

var loginForm = new Vue({
  el: '#loginForm',
  data: {
    username: '',
    password: '',
    token: '',
    status: '',
    user_id: ''
  },
  methods: {
    loginUser: function (event) {
      var self = this;
      this.status = "Authenticating user..."
      event.preventDefault();
      Axios.post('/auth', {
        username: this.username,
        password: this.password
      })
      .then(function(res) {
        self.token = res.data.body.token;
        self.userId = res.data.body.user_id;
        setTimeout(function() {
          self.status = "Welcome back, " + self.userId;
        }, 1500);
      })
      .catch(function(err) {
        self.status = "Something went wrong...";
        console.log(err);
      });
    }
  }
})