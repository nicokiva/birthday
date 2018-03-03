'use strict'

function service($http) {
	var self = this;

    self.countries = [];

	$http.get('https://restcountries.eu/rest/v2/all')
        .then(r => {
            self.countries = r.data.map(c => {
            	return {
            		code: c.alpha2Code,
            		name: c.name
            	};
            });
        });

}


var app = angular.module('app');
app.service('metaService', ['$http', service]);