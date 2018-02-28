'use strict'

var component = {
    templateUrl: '/app/views/birthdayComponent.html',

    controller: function () {
        var self = this;

    	self.data = {
    		firstname: undefined,
    		surname: undefined,
    		countryId: undefined,
    		dob: undefined
    	}

    	self.add = function() {
    		console.log(self.data);
    	}
    }
};

var app = angular.module('app', []);
app.component('birthdayComponent', component);