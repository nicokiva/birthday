'use strict'

var component = {
    templateUrl: '/app/views/birthdayComponent.html',

    controller: function ($http) {
        var self = this;

        self.countries = [];

    	function getDefaultData() {
    		return {
	    		firstname: undefined,
	    		surname: undefined,
	    		country: undefined,
	    		dob: undefined
	    	};
    	}

    	self.data = getDefaultData();

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

    		if (self.data && self.data.dob) {
				self.data.dob = padZeros(self.data.dob.getMonth() + 1) + '/' + padZeros(self.data.dob.getDate()) + '/' + self.data.dob.getFullYear();
    		}

    		angular.copy(self.data, last);

    		self.lastInsertedData = last;
    		self.allInsertedData.push(self.lastInsertedData);


    		self.data = getDefaultData();
    	}

    	self.showMessage = function(d) {
    		self.lastInsertedData = d;
    	}

    	function padZeros(d) {
    		if (parseInt(d) >= 10) {
    			return d;
    		}

    		return '0' + String(d);
    	}

    }
};

var app = angular.module('app', []);
app.component('birthdayComponent', component);