'use strict'

function service() {
	var self = this;

    self.padZeros = function(d) {
        if (parseInt(d) >= 10) {
            return d;
        }

        return '0' + String(d);
    }

    self.calculateAge = function(d) {
        var ageDifMs = Date.now() - new Date(d).getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

}


var app = angular.module('app');
app.service('helperService', ['$http', service]);


String.prototype.in = function(l) {
    return l.indexOf(this) > -1;
}