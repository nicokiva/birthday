'use strict'

var component = {
    templateUrl: '/app/views/birthdayComponent.html',

    controller: function ($http, $routeParams) {
        var self = this;
        var months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var today = new Date();

        self.countries = [];

        self.day = today.getDate();
        self.month = months[today.getMonth()];

        self.lastInsertedData = {};
        self.allInsertedData = [];

        self.errors = {};


    	$http.get('https://restcountries.eu/rest/v2/all')
	        .then(r => {
	            self.countries = r.data.map(c => {
	            	return {
	            		code: c.alpha2Code,
	            		name: c.name
	            	};
	            });
	        });
/* internal functions */
        function calculateAge(d) {
            debugger;
            var ageDifMs = Date.now() - new Date(d).getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        function padZeros(d) {
            if (parseInt(d) >= 10) {
                return d;
            }

            return '0' + String(d);
        }

        function isValid() {
            var v = true;
            self.errors = {};

            if (!self.data.firstname || !self.data.firstname.length) {
                v = false;

                self.errors.firstname = 'Invalid First Name';
            }

            if (!self.data.surname || !self.data.surname.length) {
                v = false;

                self.errors.surname = 'Invalid Surname';
            }

            if (!self.data.country) {
                v = false;

                self.errors.country = 'Invalid Country';
            }

            if (!self.data.dob || self.data.dob > today) {
                v = false;

                self.errors.dob = 'Invalid DOB';
            }

            return v;
        }

        function loadInitial() {
            self.data = getDefaultData();

            var users = localStorage.getItem('users');
            if (!users) {
                return;
            }

            self.allInsertedData = JSON.parse(users);
        }

        function saveToStorage(d) {
            localStorage.setItem('users', JSON.stringify(d));
        }

        function getDefaultData() {
            return {
                firstname: undefined,
                surname: undefined,
                country: undefined,
                dob: undefined,
                age: undefined
            };
        }
/* internal functions */
        loadInitial();

    	self.add = function() {
            if (!isValid()) {
                return;
            }

    		var last = {};

    		if (self.data && self.data.dob) {
                self.data.age = calculateAge(self.data.dob);

				self.data.dob = padZeros(self.data.dob.getMonth() + 1) + '/' + padZeros(self.data.dob.getDate()) + '/' + self.data.dob.getFullYear();
    		}

    		angular.copy(self.data, last);

    		self.lastInsertedData = last;
    		self.allInsertedData.push(self.lastInsertedData);


    		self.data = getDefaultData();
            saveToStorage(self.allInsertedData);
    	}

    	self.showMessage = function(d) {
    		self.lastInsertedData = d;
    	}

    }
};

var app = angular.module('app');
app.component('birthdayComponent', component);