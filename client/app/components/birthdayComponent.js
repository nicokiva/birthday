'use strict'

var component = {
    templateUrl: '/app/views/birthdayComponent.html',

    controller: function ($http, $route, metaService, helperService, $routeParams, $location) {
        var self = this;

        self.availableLang = $routeParams.lang.in(['es', 'en', 'pr']);

        var authKey;
        if ($routeParams.revisited === 'revisited') {
            authKey = $routeParams.authKey;
        }

        var months = { 
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'],
            pr: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        };
        var today = new Date();

        self.meta = metaService;

        self.day = today.getDate();
        self.month = months[$routeParams.lang][today.getMonth()];

        self.lastInsertedData = {};
        self.allInsertedData = [];

        self.errors = {};


    	
/* internal functions */
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

            if (authKey === '1234') {
                var users = localStorage.getItem('users');
                if (!users) {
                    return;
                }

                self.allInsertedData = JSON.parse(users);
            }
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
                self.data.age = helperService.calculateAge(self.data.dob);

				self.data.dob = helperService.padZeros(self.data.dob.getMonth() + 1) + '/' + helperService.padZeros(self.data.dob.getDate()) + '/' + self.data.dob.getFullYear();
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