 var app = new Vue({
     el: '#app',
     data: {
         startingZip: '',
         startingCity: '',
         endingZip: '',
         endingCity: ''
     },

     watch: {
         startingZip: function() {
             this.startingCity = ''
             if (this.startingZip.length === 5) {
                 this.lookupStartingZip()
             }
         },
         endingZip: function() {
             this.endingCity = ''
             if (this.endingZip.length === 5) {
                 this.lookupEndingZip()
             }
         }
     },

     methods: {
         lookupStartingZip: _.debounce(function() {
             var app = this
             app.startingCity = "Searching..."
             axios.get('http://ziptasticapi.com/' + app.startingZip)
                 .then(function(response) {
                     app.startingCity = response.data.city + ', ' + response.data.state
                 })
                 .catch(function(error) {
                     app.startingCity = 'Invalid Zipcode'
                 })
         }, 500),

         lookupEndingZip: _.debounce(function() {
             var app = this
             app.endingCity = "Searching..."
             axios.get('http://ziptasticapi.com/' + app.endingZip)
                 .then(function(response) {
                     app.endingCity = response.data.city + ', ' + response.data.state
                 })
                 .catch(function(error) {
                     app.endingCity = 'Invalid Zipcode'
                 })
        }, 500), 

         submit: function() {
         	console.log('I love Vue!')
         }
	}
 })
