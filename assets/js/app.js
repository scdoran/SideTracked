$(document).ready(function() {
   	$('body').scrollspy({target: '#navbar-example'});

   	$('#CCT').modal('show');

   	$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	});

 
	// Gathering taplist information from UnTappd
	$.ajax({
		url: "https://business.untappd.com/api/v1/menus/20486?full=true",
		beforeSend: function(xhr) {
		     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
		}, success: function(data){
		    // console.log(data.menu.sections[0].items);
		    var menu = data.menu.sections[0].items;

		    menu.forEach(function(element){

		    	var div = $("<div class='tapItems'>");

		    	var image = $("<img src='"+ element.label_image +"' class='beerImg'>");
		    	var beerName = $("<h3 data-name='"+element.name+"' class='beerName'>" + element.name + "</h3>");
		    	var beerStyle = $("<h4 data-style='"+element.style+"' class='beerStyle'>" + element.style + "</h4>");
		    	
		    	var beerInfo = $("<ul class='beerInfo'><li>ABV: " + element.abv + "%</li> | <li>" + element.brewery + "</li>, <li>" + element.brewery_location +"</li></ul>");
		    	
		    	var desc = $("<p class='description' data-desc='" + element.name + "'>" + element.description + "</p>");
		    	// var price = $("<p class='price'>$ " + element.containers[0].price + "</p>");
		    	
		    	div.append(image);
		    	div.append(beerName);
		    	div.append(beerStyle);
		    	div.append(beerInfo);
		    	div.append(desc);
		    	// div.append(price);

		    	$("#menu").append(div);
		    });
		}
	});

	// Gathering event information from UnTappd

	$.ajax({
		url: "https://business.untappd.com/api/v1/locations/7477/events",
		beforeSend: function(xhr) {
		     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
		}, success: function(data){
		    // console.log(data.events);
		    var events = data.events;

		    events.forEach(function(element){

		    	var time = element.start_time;
				var start = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("hh:mm a"));
				var date = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("MMM Do, YYYY"));
				var now = moment();
				var dateAttr = 0;
		    	
		    	if (moment(time, "YYYY-MM-DDT").isSameOrAfter(moment().subtract(1, "day")) && moment(time, "YYYY-MM-DDT").isSameOrBefore(moment().add(7, "day"))) {
		    		
		    		var div2 = $("<div class='eventList'>");

		    		div2.attr("data-date", date);

			    	var eventDate = $("<h3 data-name='"+element.name+"' class='eventDate'>" + date + "</h3>")
			    	var eventName = $("<h3 data-name='"+element.name+"' class='eventName'>" + element.name + "</h3>");
			    	
			    	var descr = $("<p class='eventDesc' data-descr='" + element.name + "'>" + element.description + "</p>");

			    	var start_time = $("<p class='start_time'>Start time: " + start + "</p>");

			    	// var end_time = $("<p class='end_time'>" + element.end_time + "</p>");

			    	div2.append(eventDate);
			    	div2.append(eventName);
			    	div2.append(descr);
			    	div2.append(start_time);
			    	// div2.append(end_time);
			    	$("#upcomingEvents").append(div2);
			    	$("#upcomingEvents").append("<hr>");

		    	} 
		    	// else {
		    	// 	console.log("These events have already passed or have not happened yet." + element.name + date);
		    	// }
		    });
		}
	});

});


  
