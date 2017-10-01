$(document).ready(() => {
   	$('body').scrollspy({target: '#navbar-example'});

   	$('#CCT').modal('show');
 
	// Gathering taplist information from UnTappd
	// $.ajax({
	// 	url: "https://business.untappd.com/api/v1/menus/20486?full=true",
	// 	beforeSend: (xhr)=> {
	// 	     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
	// 	}, success: (data)=>{
	// 	    // console.log(data.menu.sections[0].items);
	// 	    let menu = data.menu.sections[0].items;

	// 	    menu.forEach((element) => {

	// 	    	let div = $("<div class='tapItems'>");

	// 	    	let image = $("<img src='"+ element.label_image +"' class='beerImg'>");
	// 	    	let beerName = $("<h3 data-name='"+element.name+"' class='beerName'>" + element.name + "</h3>");
	// 	    	let beerStyle = $("<h4 data-style='"+element.style+"' class='beerStyle'>" + element.style + "</h4>");
		    	
	// 	    	let beerInfo = $("<ul class='beerInfo'><li>ABV: " + element.abv + "%</li> | <li>" + element.brewery + "</li>, <li>" + element.brewery_location +"</li></ul>");
		    	
	// 	    	let desc = $("<p class='description' data-desc='" + element.name + "'>" + element.description + "</p>");
	// 	    	// let price = $("<p class='price'>$ " + element.containers[0].price + "</p>");
		    	
	// 	    	div.append(image);
	// 	    	div.append(beerName);
	// 	    	div.append(beerStyle);
	// 	    	div.append(beerInfo);
	// 	    	div.append(desc);
	// 	    	// div.append(price);

	// 	    	$("#menu").append(div);
	// 	    });
	// 	}
	// });

	// Gathering event information from UnTappd

	$.ajax({
		url: "https://business.untappd.com/api/v1/locations/7477/events",
		beforeSend: (xhr)=> {
		     xhr.setRequestHeader("Authorization", "Basic ZW1pbHlzaWxrZUB5YWhvby5jb206YzVQRERDX2NtMUFvNTlmZzc1TGk=");
		}, success: (data)=>{
		    let events = data.events;

		    events.sort((a,b) => {
		    	return a.start_time - b.start_time;
		    });

		    events.forEach((element) => {

		    	let time = element.start_time;
				let start = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("hh:mm a"));
				let date = (moment(time, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format("MMM Do, YYYY"));
				let now = moment();
				let dateAttr = 0;
		    	
		    	if (moment(time, "YYYY-MM-DDT").isSameOrAfter(moment().subtract(1, "day")) && moment(time, "YYYY-MM-DDT").isSameOrBefore(moment().add(30, "day"))) {
		    		
		    		let div2 = $("<div class='eventList'>");

		    		div2.attr("data-date", date);

			    	let eventDate = $("<h3 data-name='"+element.name+"' class='eventDate'>" + date + "</h3>")
			    	let eventName = $("<h3 data-name='"+element.name+"' class='eventName'>" + element.name + "</h3>");
			    	
			    	let descr = $("<p class='eventDesc' data-descr='" + element.name + "'>" + element.description + "</p>");

			    	let start_time = $("<p class='start_time'>Start time: " + start + "</p>");

			    	// let end_time = $("<p class='end_time'>" + element.end_time + "</p>");

			    	div2.append(eventDate);
			    	div2.append(eventName);
			    	div2.append(descr);
			    	div2.append(start_time);
			    	// div2.append(end_time);
			    	$(".upcomingEvents").prepend(div2);
			    	// $("#upcomingEvents").append("<hr>");

		    	} 
		    	// else {
		    	// 	console.log("These events have already passed or have not happened yet." + element.name + date);
		    	// }
		    });
		    // let stevent = document.getElementsByClassName('eventList');
		    // let allEvents = Array.from(stevent);
		
		    // allEvents.sort((a,b) =>{

		    // 	return a.dataset.date - b.dataset.date;
		    // });
		}
	});

});


  
