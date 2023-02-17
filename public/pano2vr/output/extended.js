// Slavomír MATAVA
// Generated 2020-05-31T20:22:25

// Nastavenie cesty pre API PHP
var baseApiUrl = "api/public/";
// var baseApiUrl = "http://localhost:8000/api/public/";

// jQuery Funkcie
$(document).ready(function(){
	var sendButtonId = "submit";
	var generateButtonId = "generatePDF";
	decryptQs();

	 // validácia checkboxov na Carte
	 function validateCart() {
		var invalid = 0;
		required_fields.each(function () {
			if ($(this).val() == '') {
				invalid++;
			}
		});
	
		if(invalid > 0) {
			//console.log('Nie všetky inputy sú vyplnené');  
			return false;
			
		}
		else {
			//.log('Všetky inputy sú vyplnené');  
			return true;
		}
	}

	// Vygeneruje PDF
	$("#" + generateButtonId).on('click touchstart', function(e){

		pano.setVariableValue('sendByMail', false);
		var panoSettings = getSettingsFromSkin();
		sendSettingMail(panoSettings);
		//e.preventDefault();
	});

	// Odošle mail s PDF
	$("#" + sendButtonId).on('click tap', function(e){
		e.preventDefault();	
		pano.setVariableValue('sendByMail', true);
		if( validateCart() == true) {
			var panoSettings = getSettingsFromSkin();
			sendSettingMail(panoSettings);
		}
		else {
			console.log('Košík nie je validný');
		}
	});

});

// Načíta nastavenie zo skinu
function getSettingsFromSkin() {
	var settings = {};
	var variables = {};

	// Kontrola či sa majú vložiť všetky atribúty -> všetky byty
	if ( AllowAllFlats == false ) {
		var allowedFlat = pano.getNodeUserdata(pano.getCurrentNode()).copyright;
		$.each(Flats[allowedFlat], function(key, item) {
			$.each(Flats[allowedFlat][key], function(prop, data) {
				variables[key] = Flats[allowedFlat][key].activeItem;
			});
		});
	}

	else {
		$.each(Flats, function(index, value) {
			$.each(Flats[index], function(key, item) {
				$.each(Flats[index][key], function(prop, data) {
					variables[key] = Flats[index][key].activeItem;
				});
			});
		});
	}

	// Pridanie premenných z Pano2VR
	var skinVars = skin.player.getVariableValue('all_variables');
	skinVars.split(",").forEach((variable) => {
		variables[variable] = skin.player.getVariableValue(variable);
	});

	// Pano Config
	settings['variables'] = variables;
	settings['currentNode'] = skin.player.getCurrentNode();
	settings['Fov'] = skin.player.getFov();
	settings['VFov'] = skin.player.getVFov();
	settings['HFov'] = skin.player.getHFov();
	settings['Roll'] = skin.player.getRoll();
	settings['Projection'] = skin.player.getProjection();
	settings['Pan'] = skin.player.getPan();
	settings['Tilt'] = skin.player.getTilt();

	// Other Settings
	settings['portalUrl'] = window.location.href;
	settings['os'] = skin.player.getOS();
	settings['browser'] = skin.player.getBrowser();

	return settings;
}

// Decrypt qs
function decryptQs() {
	//$('#intro > p').text('spúšťam tour');
	$('#intro > p').text('loading tour');
	var queryString = getParameterByName('qs');

	if(queryString) {
		$.ajax({
			url: baseApiUrl + 'decrypt-qs',
			method: "POST",
			data: {
				qs: queryString,
			},
			success: function(result){

				//showLoading();

				// Set Variables
				// $.each(result.variables, function(varName, varValue) {
				// 	skin.player.setVariableValue(varName,varValue);
				// 	var varChangedName = "varchanged_" + varName;
				// 	skin.player.triggerEvent(varChangedName);
				// 	$(".var-" + varName + "-" + varValue).click();
				// });

				$.each(result.variables, function(varName, varValue) {
					
					$.each(Flats, function(index, value) {
						$.each(Flats[index], function(key, item) {
							
							if (key == varName ) {
								Flats[index][key].activeItem = varValue;
								//console.log(key+' | '+varName);
							}	
						});
					});
				});

				if ( attributesAllow == true) {
					UpdateCurrentPatches();
					generateCart(Flats);	
				}
				

				// Set Active Node
				skin.player.setProjection(result.Projection);
				var panoCurrentNode = skin.player.getCurrentNode();
				if(panoCurrentNode != result.currentNode){
					skin.player.openNext("{"+result.currentNode+"}","");
				}

				// Set Camera Parameters
				skin.player.setFov(result.Fov);
				skin.player.setVFov(result.VFov);
				// skin.player.setHFov(result.HFov);
				skin.player.setRoll(result.Roll);
				skin.player.setPan(result.Pan);
				skin.player.setTilt(result.Tilt);

				//hideLoading();
			}
		});
	}
		//removeIntroAnimation();		
}

// Nastavenia zo skinu pošle ajaxom do API PHP
function sendSettingMail(panoSettings) {
	//console.log('Send Settings');
	//console.log(panoSettings);

	var formData = {};

	if(
		$('#fname').hasClass('error-input') ||
		$('#lname').hasClass('error-input') ||
		$('#email').hasClass('error-input') ||
		$('#city').hasClass('error-input')
	) 
	{
		return false;
	}

	formData['first_name'] = $('#fname').val();
	formData['last_name'] = $('#lname').val();
	formData['email'] = $('#email').val();
	formData['telephone'] = $('#tel').val();
	formData['city'] = $('#city').val();
	formData['zip'] = $('#zip').val();
	formData['state'] = $('#state').val();
	formData['subject'] = $('#subject').val();

	$.ajax({
		url: baseApiUrl + 'send-offer-by-mail',
		method: "POST",
		async:false,
		data: {
			panoSettings: panoSettings,
			formData: formData,
		},
		success: function(result){

			if(result.header == 'file') {
				var link = document.createElement('a'),
				filename = 'Offer.pdf';
				link.href = result.url;
				link.download = filename;
				link.click();
				//window.open(result.url, "_blank");
			 }	
			//console.log(result);
			
		},
		error: function() {
			alert("Something Wrong...");
		}
	});

}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}