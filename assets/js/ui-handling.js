/**
 * @author Jerry
 */
$(document).ready(function(){
	var $panelHeading = $('.panel-heading'),
		$isJointEnabled = $('#isJointEnabled'),
		$jointLength = $('#jointLength');
	
	$panelHeading.click(function() {
		$(this).next().toggle();
	}); 
	
	$panelHeading.prop('title', 'Kliknij aby schować/pokazać');
	
	$isJointEnabled.change(function(){
		var isChecked = $(this).is(':checked');
		
		$jointLength.prop('disabled', !isChecked);
	});

});
