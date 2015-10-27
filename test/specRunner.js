/**
 * @author Jerry
 */
requirejs.config({
	baseUrl: "../app/",
	paths: {
		"app": "app",
		"calc": "calc",
		"data-collector": "data-collector",
		"data-validator": "data-validator",
		"data-collection": "data-collection",
		"joint-algorithm": "joint-algorithm",
		"no-joint-algorithm": "no-joint-algorithm",
		"jasmine": ['../test/lib/jasmine-2.3.4/jasmine'],
		"jasmine-html": ['../test/lib/jasmine-2.3.4/jasmine-html'],
		"jasmine-boot": ['../test/lib/jasmine-2.3.4/boot'],
		"validatorSpec": "../test/spec/ValidatorSpec",
		"dataCollectionSpec": "../test/spec/DataCollectionSpec",
		"algorithmSpec": "../test/spec/AlgorithmSpec"
	},
	shim : {
		'jasmine-html': {
			deps: ['jasmine']
		},
		'jasmine-boot': {
			deps: ['jasmine', 'jasmine-html']
		}
	}
});

require(['jasmine-boot'], function(){
	require(
		['validatorSpec', 'dataCollectionSpec', 'algorithmSpec'], function(){
		window.onload(); //bez tego nic się nie dzieje
	});
});
