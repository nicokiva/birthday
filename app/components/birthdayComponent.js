'use strict'

var component = {
    templateUrl: '/app/views/birthdayComponent.html',

    controller: function ($http) {
        var self = this;

        self.countries = [];

    	self.data = {
    		firstname: undefined,
    		surname: undefined,
    		country: undefined,
    		dob: undefined
    	};

    	self.lastInsertedData = {};
    	self.allInsertedData = [];


    	$http.get('https://restcountries.eu/rest/v2/all')
	        .then(r => {
	            self.countries = r.data.map(c => {
	            	return {
	            		code: c.alpha2Code,
	            		name: c.name
	            	};
	            });
	        });

    	self.add = function() {
    		var last = {};
    		angular.copy(self.data, last);

    		self.lastInsertedData = last;
    		self.allInsertedData.push(self.lastInsertedData);
    	}

    	self.showMessage = function(d) {
    		self.lastInsertedData = d;
    	}

    }
};

var app = angular.module('app', []);
app.component('birthdayComponent', component);