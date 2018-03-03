'use strict'

var app = angular.module('app', ['pascalprecht.translate', 'ngRoute']);



app.config([
	'$translateProvider',
	'$routeProvider',
	($translateProvider, $routeProvider) => {
		$translateProvider.translations('en', {
			'FIRSTNAME': 'Name',
			'SURNAME': 'Surname',
			'COUNTRY': 'Country',
			'BIRTHDAY': 'Birthday',

			'SAVE': 'SAVE',

			'TO_VIEW_REVISITED': 'To view stored profiles please use url pattern /:lang/revisited?authKey=1234',
			'SUCCESS_MESSAGE': 'Hello {{firstname}} {{surname}} from {{countryname}}. On {{day}} of {{month}} you will have {{age}} years old.',
		});

		$translateProvider.translations('es', {
			'FIRSTNAME': 'Nombre',
			'SURNAME': 'Apellido',
			'COUNTRY': 'País',
			'BIRTHDAY': 'Fecha de nacimiento',

			'SAVE': 'GUARDAR',

			'TO_VIEW_REVISITED': 'Para visualizar los perfiles almacenados utilice el patrón /:lang/revisited?authKey=1234',

			'SUCCESS_MESSAGE': 'Hola {{firstname}} {{surname}} de {{countryname}}. El día {{day}} de {{month}} tendrás {{age}} años.'
		});

		$translateProvider.translations('pr', {
			'FIRSTNAME': 'Nome',
			'SURNAME': 'Sobrenome',
			'COUNTRY': 'País',
			'BIRTHDAY': 'Aniversário',

			'SAVE': 'SALVE',

			'TO_VIEW_REVISITED': 'Para visualizar os perfis armazenados, use o padrão /:lang/revisited?authKey=1234',

			'SUCCESS_MESSAGE': 'Olá {{firstname}} {{surname}} de {{countryname}}. O dia {{day}} de {{month}} terá {{age}} anos.'
		});

		$translateProvider.preferredLanguage('en');

		$routeProvider
			.when('/', {
				redirectTo: '/en'
			})
			.when('/:lang/:revisited?', {
				templateUrl: 'client/app/views/birthday.html'
			});

	}
]);

app.run(['$rootScope', '$translate', ($rootScope, $translate) => {
	$rootScope.$on('$routeChangeSuccess', (_, toState) => {
		var l = toState.pathParams.lang;

		$translate.use(l);
	})
}]);
