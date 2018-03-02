'use strict'

var app = angular.module('app', ['pascalprecht.translate', 'ngRoute', 'ui.router']);


app.config([
	'$translateProvider',
	'$routeProvider',
	function ($translateProvider, $routeProvider, $stateProvider) {
		console.log($stateProvider);
		$translateProvider.translations('en', {
			'FIRSTNAME': 'Name',
			'SURNAME': 'Surname',
			'COUNTRY': 'Country',
			'BIRTHDAY': 'Birthday',

			'SAVE': 'SAVE'
		});

		$translateProvider.translations('es', {
			'FIRSTNAME': 'Nombre'
		});

		$translateProvider.preferredLanguage('en');



		$routeProvider.when('/', {

		})

	}	
]);


