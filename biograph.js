var chart;
google.charts.setOnLoadCallback(refreshData); 

Array.prototype.max = function(  ){
	return Math.max.apply( Math, this );
};

// Function to get the Minimam value in Array
Array.prototype.min = function(  ){
	return Math.min.apply( Math, this );
};

Array.max = function( array ){
	return Math.max.apply( Math, array );
};

// Function to get the Minimam value in Array
Array.min = function( array ){
	return Math.min.apply( Math, array );
};
	

Array.prototype.contains = function(v) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] === v) return true;
	}
	return false;
};

Array.prototype.unique = function() {
	var arr = [];
	for(var i = 0; i < this.length; i++) {
		if(!arr.contains(this[i])) {
			arr.push(this[i]);
		}
	}
	return arr; 
}
    
	 
selected_min_crosslinking_cl_duration 		= 0;
selected_max_crosslinking_cl_duration		= 0;
selected_min_crosslinking_cl_intensity      = 0;
selected_max_crosslinking_cl_intensity      = 0;
selected_min_elasticity                     = 0;
selected_max_elasticity                     = 0;

var values_updated = true;

			/*			
			handleShape: "dot",
			radius: 130,
			width: 25,
			sliderType: "range",
			value: "1,50000",
			beforeCreate: "traceEvent",
			create: "traceEvent",
			start: "traceEvent",
			stop: "traceEvent",
			change: "traceEvent",
			drag: "traceEvent"
			*/

	$(document).ready(function(){	

			
			var theTextContentOfMyFile = ""
				$.getJSON('/coding_challenge_dataset.json', function(data) {
				
					theTextContentOfMyFile = data;
					
					var jsonData = $.parseJSON(JSON.stringify(theTextContentOfMyFile));
					all									  = [];
					serial				                  = [];
					email				                  = [];
					livePercent			                  = [];
					elasticity			                  = [];
					deadPercent			                  = [];
					files_input			                  = [];
					files_output		                  = [];
					pressure_extruder1	                  = [];
					pressure_extruder2	                  = [];
					crosslinking_cl_enabled		          = [];
					crosslinking_cl_duration	          = [];
					crosslinking_cl_intensity	          = [];
					resolution_layerNum			          = [];
					resolution_layerHeight		          = [];
					wellplate	                          = [];
					
					
					max_serial				            = 0;
					max_email				            = 0;
					max_livePercent			            = 0;
					max_elasticity			            = 0;
					max_deadPercent			            = 0;
					max_files_input			            = 0;
					max_files_output		            = 0;
					max_pressure_extruder1	            = 0;
					max_pressure_extruder2	            = 0;
					max_crosslinking_cl_enabled		    = 0;
					max_crosslinking_cl_duration	    = 0;
					max_crosslinking_cl_intensity	    = 0;
					max_resolution_layerNum			    = 0;
					max_resolution_layerHeight		    = 0;
					max_wellplate				        = 0;

					min_serial				            = 0;
					min_email				            = 0;
					min_livePercent			            = 0;
					min_elasticity			            = 0;
					min_deadPercent			            = 0;
					min_files_input			            = 0;
					min_files_output		            = 0;
					min_pressure_extruder1	            = 0;
					min_pressure_extruder2	            = 0;
					min_crosslinking_cl_enabled		    = 0;
					min_crosslinking_cl_duration	    = 0;
					min_crosslinking_cl_intensity	    = 0;
					min_resolution_layerNum			    = 0;
					min_resolution_layerHeight		    = 0;
					min_wellplate				        = 0;

					for (var i = 0 ; i <=jsonData.length-1; i++){
						all[i] = {
							serial : jsonData[i]['user_info']['serial'],
							email : jsonData[i]['user_info']['email'],
							livePercent : jsonData[i]['print_data']['livePercent'],
							elasticity : jsonData[i]['print_data']['elasticity'],
							deadPercent : jsonData[i]['print_data']['deadPercent'],
							files_input : jsonData[i]['print_info']['files']['input'],
							files_output : jsonData[i]['print_info']['files']['output'],
							pressure_extruder1 : jsonData[i]['print_info']['pressure']['extruder1'],
							pressure_extruder2 : jsonData[i]['print_info']['pressure']['extruder2'],
							crosslinking_cl_enabled : jsonData[i]['print_info']['crosslinking']['cl_enabled'],
							crosslinking_cl_duration : jsonData[i]['print_info']['crosslinking']['cl_duration'],
							crosslinking_cl_intensity : jsonData[i]['print_info']['crosslinking']['cl_intensity'],
							resolution_layerNum : jsonData[i]['print_info']['resolution']['layerNum'],
							resolution_layerHeight : jsonData[i]['print_info']['resolution']['layerHeight'],
							wellplate : jsonData[i]['print_info']['wellplate']
						};
								
						serial[i]=						jsonData[i]['user_info']['serial'];
						email[i]=					    jsonData[i]['user_info']['email'];
						livePercent[i]=				    jsonData[i]['print_data']['livePercent'];
						elasticity[i]=				    jsonData[i]['print_data']['elasticity'];
						deadPercent[i]=				    jsonData[i]['print_data']['deadPercent'];
						files_input[i]=				    jsonData[i]['print_info']['files']['input'];
						files_output[i]=			    jsonData[i]['print_info']['files']['output'];
						pressure_extruder1[i]=		    jsonData[i]['print_info']['pressure']['extruder1'];
						pressure_extruder2[i]=		    jsonData[i]['print_info']['pressure']['extruder2'];
						crosslinking_cl_enabled[i]=     jsonData[i]['print_info']['crosslinking']['cl_enabled'];
						crosslinking_cl_duration[i]=    jsonData[i]['print_info']['crosslinking']['cl_duration'];
						crosslinking_cl_intensity[i]=   jsonData[i]['print_info']['crosslinking']['cl_intensity'];
						resolution_layerNum[i]=  		jsonData[i]['print_info']['resolution']['layerNum'];
						resolution_layerHeight[i]=  	jsonData[i]['print_info']['resolution']['layerHeight'];
						wellplate[i]=  					jsonData[i]['print_info']['wellplate'];
					}
					
					filtered = all;
					
					var numbers = ['All'];
					numbers = numbers.concat(email.unique());
					var option = '';
					for (var i=0;i<numbers.length;i++){
					   option += '<option value="'+ numbers[i] + '">' + numbers[i] + '</option>';
					}
					$('#users').append(option);
					
					max_livePercent			            = Array.max(livePercent);
					max_elasticity			            = Array.max(elasticity);
					max_deadPercent			            = Array.max(deadPercent);
					max_pressure_extruder1	            = Array.max(pressure_extruder1);
					max_pressure_extruder2	            = Array.max(pressure_extruder2);
					max_crosslinking_cl_duration	    = Array.max(crosslinking_cl_duration);
					max_crosslinking_cl_intensity	    = Array.max(crosslinking_cl_intensity);
					max_resolution_layerNum			    = Array.max(resolution_layerNum);
					max_resolution_layerHeight		    = Array.max(resolution_layerHeight);
					max_wellplate				        = Array.max(wellplate);
				
					min_livePercent			            = Array.min(livePercent);
					min_elasticity			            = Array.min(elasticity);
					min_deadPercent			            = Array.min(deadPercent);
					min_pressure_extruder1	            = Array.min(pressure_extruder1);
					min_pressure_extruder2	            = Array.min(pressure_extruder2);
					min_crosslinking_cl_duration	    = Array.min(crosslinking_cl_duration);
					min_crosslinking_cl_intensity	    = Array.min(crosslinking_cl_intensity);
					min_resolution_layerNum			    = Array.min(resolution_layerNum);
					min_resolution_layerHeight		    = Array.min(resolution_layerHeight);
					min_wellplate				        = Array.min(wellplate);
					
					
					selected_min_crosslinking_cl_duration 		= min_crosslinking_cl_duration;
					selected_max_crosslinking_cl_duration		= max_crosslinking_cl_duration;
					selected_min_crosslinking_cl_intensity      = min_crosslinking_cl_intensity;
					selected_max_crosslinking_cl_intensity      = max_crosslinking_cl_intensity;
					selected_min_elasticity                     = min_elasticity;
					selected_max_elasticity                     = max_elasticity;
					
					var radiusG = ($('#controllerDiv').width()-10)/2;
					$("#slider_crosslinking_cl_duration").roundSlider({
							sliderType: "range",
							radius: radiusG,
							value: min_crosslinking_cl_duration+","+max_crosslinking_cl_duration,
							handleSize: "+16",
							max: max_crosslinking_cl_duration,
							min: min_crosslinking_cl_duration,
							width: 17,
							mouseScrollAction: true,
							handleShape: "dot",
							change: function (args) {
								var v = args.value.split(',');
								selected_min_crosslinking_cl_duration = parseInt(v[0]);
								selected_max_crosslinking_cl_duration = parseInt(v[1]);
								values_updated = true;
							}
					});
					$("#slider_crosslinking_cl_intensity").roundSlider({
						sliderType: "range",
						radius: radiusG,
						value: min_crosslinking_cl_intensity+","+max_crosslinking_cl_intensity,
						handleSize: "+16",
						max: max_crosslinking_cl_intensity,
						min: min_crosslinking_cl_intensity,
						width: 17,
						mouseScrollAction: true,
						handleShape: "dot",
						change: function (args) {
							var v = args.value.split(',');
							selected_min_crosslinking_cl_intensity = parseInt(v[0]);
							selected_max_crosslinking_cl_intensity = parseInt(v[1]);
							values_updated = true;
						}
					});
					$("#slider_elasticity").roundSlider({
						sliderType: "range",
						radius: radiusG,
						value: (parseInt(min_elasticity)+1)+","+(parseInt(max_elasticity)),
						handleSize: "+16",
						max: (parseInt(max_elasticity)),
						min: min_elasticity,
						step: "1",
						width: 17,
						mouseScrollAction: true,
						handleShape: "dot",
						change: function (args) {
							var v = args.value.split(',');
							selected_min_elasticity = parseInt(v[0]);
							selected_max_elasticity = parseInt(v[1]);
							values_updated = true;
						}
					});	
					
					$('#users').on('change',function(){
						console.log('changed');
						values_updated = true;
					});
					//crosslinking_cl_duration
					//crosslinking_cl_intensity
					//elasticity
					var divStatusWidth = ($('#divStatus').width()-10)-50;
					$("#sparkline_crosslinking_cl_duration").sparkline(crosslinking_cl_duration, {
						type: 'line',
						width: divStatusWidth,
						height: 50,
						drawNormalOnTop: false});
					$("#sparkline_crosslinking_cl_intensity").sparkline(crosslinking_cl_intensity, {
						type: 'line',
						width: divStatusWidth,
						height: 50,
						drawNormalOnTop: false});
					$("#sparkline_crosslinking_cl_elasticity").sparkline(elasticity, {
						type: 'line',
						width: divStatusWidth,
						height: 50,
						drawNormalOnTop: false});	
						
					
						setInterval(refreshData, 1000/10);
				});		
						
				
});




var refreshData = function(){  
	
	if(values_updated){
		
		console.log("Hello");	
		values_updated = false;
		if(typeof(all)=="undefined") return;
		$('#divProgressBar').show();
		console.log($('#users').val());
		if($('#users').val() == 'All'){
				console.log('in if');
				filtered = jsonsql.query("select * from all where (crosslinking_cl_duration >= "+selected_min_crosslinking_cl_duration +" && crosslinking_cl_duration <= "+selected_max_crosslinking_cl_duration +" && crosslinking_cl_intensity >="+selected_min_crosslinking_cl_intensity+" && crosslinking_cl_intensity <= "+selected_max_crosslinking_cl_intensity+" && elasticity >= "+selected_min_elasticity+" && elasticity <= "+selected_max_elasticity+")",all);
		}
		else{
			console.log('else');
			filtered = jsonsql.query("select * from all where (crosslinking_cl_duration >= "+selected_min_crosslinking_cl_duration +" && crosslinking_cl_duration <= "+selected_max_crosslinking_cl_duration +" && crosslinking_cl_intensity >="+selected_min_crosslinking_cl_intensity+" && crosslinking_cl_intensity <= "+selected_max_crosslinking_cl_intensity+" && elasticity >= "+selected_min_elasticity+" && elasticity <= "+selected_max_elasticity+" && email == \""+$('#users').val()+"\")",all);
		}
			
		
		
		if (filtered.length==0) {
			alert('There is no data for give query!');
			$('#divProgressBar').hide();
			return;
		}
		
		$('#spanResulsFound').text(filtered.length);
		
		var a =[['X', 'Y', {'type': 'string', 'role': 'style'}, {'type':'string', 'role':'tooltip', 'p': {'html': true}}]];
		filtered.forEach(function(item,idx){
			var size = 20*item['resolution_layerHeight'];
			var shape = '';
			// var color = numberToColorHsl(item['wellplate']/100,0,1);
			var color = numberToColorHsl(item['resolution_layerHeight'],0,1);
			a.push([item['livePercent'], item['deadPercent'], 'point { size: 3; fill-color: '+color+'; }',
			'<table class=\"table table-striped table-condensed table-bordered\"'+
			'<tr><td><strong>Live Percent: </strong></td><td>'+item['livePercent']+'</td></tr>'+
			'<tr><td><strong>Dead Percent: </strong></td><td>'+item['deadPercent']+'</td></tr>'+
			'<tr><td><strong>Elasticity: </strong></td><td>'+item['email']+'</td></tr>'+
			'<tr><td><strong>Email: </strong></td><td>'+item['']+'</td></tr>'+
			'<tr><td><strong>Serial: </strong></td><td>'+item['serial']+'</td></tr>'+
			'<tr><td><strong>Pressure Extruder 1: </strong></td><td>'+item['pressure_extruder1']+'</td></tr>'+
			'<tr><td><strong>Pressure Extruder 2: </strong></td><td>'+item['pressure_extruder2']+'</td></tr>'+
			'<tr><td><strong>Cross Linking Enabled: </strong></td><td>'+item['crosslinking_cl_enabled']+'</td></tr>'+
			'<tr><td><strong>Cross Linking Duration: </strong></td><td>'+item['crosslinking_cl_duration']+'</td></tr>'+
			'<tr><td><strong>Cross Linking Intensity: </strong></td><td>'+item['crosslinking_cl_intensity']+'</td></tr>'+
			'<tr><td><strong>Resolution Layer Num: </strong></td><td>'+item['resolution_layerNum']+'</td></tr>'+
			'<tr><td><strong>Resolution Layer Height: </strong></td><td>'+item['resolution_layerHeight']+'</td></tr>'+
			'<tr><td><strong>Wellplate: </strong></td><td>'+item['wellplate']+'</td></tr>'+
			'<tr><td><strong>Files Input: </strong></td><td>'+item['files_input']+'</td></tr>'+
			'<tr><td><strong>Files Output: </strong></td><td>'+item['files_output']+'</td></tr>'
			+'</table>'
			]);
			
		});
		
		var data = google.visualization.arrayToDataTable(a);
		
		
        var options = {
          title: 'Live vs Dead Percentage',
          hAxis: {
			  title: 'Live Tissue %'
			  },
          vAxis: {title: 'Dead Tissue %'
		  },
		  tooltip: {isHtml: true},
          legend: 'none',
		  crosshair: { trigger: 'both' },
		  explorer: { 
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 100.0}
        };
        chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
		
        chart.draw(data, options);
		$('#divProgressBar').hide();
		
	}	
};

