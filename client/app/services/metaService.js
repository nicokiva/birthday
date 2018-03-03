'use strict'

function service($http, $q) {
    var self = this;
    
    self.getCountries = function() {
        var deferred = $q.defer();

    	$http.get('https://restcountries.eu/rest/v2/all')
            .then(r => {
                deferred.resolve(
                    r.data.map(c => {
                        return {
                            code: c.alpha2Code,
                            name: c.name
                        }
                    })
                );
            });

        return deferred.promise;
    }
}


var app = angular.module('app');
app.service('metaService', ['$http', '$q', service]);