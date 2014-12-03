//API Key : AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow

var tableID, locationColumn, map, layer, select;

function initialize() {

	tableID = '1Q6AhIjgkzyWQ4csnjfLmy2dfebBURCe4uVcpaB-y';
	locationColumn = 'Latitude';
    
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {
    	lat: 40.741037, 
    	lng: -100.109076
      },
      zoom: 4
    });

	select = document.getElementById('State');

	getData();
}

function showAll(){
    layer = new google.maps.FusionTablesLayer({
    	query:{
	      select: locationColumn,
	      from: tableID
    	}
    });
    layer.setMap(map);
}

function hideAll(){
    layer.setMap();
}

function getData() {
    // Builds a Fusion Tables SQL query and hands the result to dataHandler()
    //var query = 'https://www.googleapis.com/fusiontables/v1/tables/1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa/columns/6?key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow';
    var query = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT State FROM "+ tableID +"&key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow";
    var queryurl = encodeURI(query);
    var jqxhr = $.get(queryurl, dataHandler);
}

var StatesList = new Array();

function dataHandler(data) {
    // display the first row of retrieved data
    for (var i = 0; i < data.rows.length; i++) {
    	if (StatesList.indexOf(data.rows[i][0])==-1){
    		StatesList.push(data.rows[i][0]);
    		addOption(select, data.rows[i][0], data.rows[i][0]);
    	}	
    };  
}

function addOption(selectbox,text,value )
{
	var optn = document.createElement("Option");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

function selectState(){
	var selState = select.value;
	//var selState = "New York";
	layer.setOptions({
	    query: {
	      select: locationColumn,
	      from: tableID,
	      where: "State = '" + selState + "'"
	    }
	});	
	layer.setMap(map);

	//var query = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Latitude,Longitude FROM 1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa WHERE State="' + selState + '"&key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow';
    var query = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Latitude,Longitude FROM "+ tableID +"  WHERE State='" + selState + "'&key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow";
    var queryurl = encodeURI(query);
    var jqxhr = $.get(queryurl, dataHandlerCenter);
}
//Center the selected results
function dataHandlerCenter(data) {

    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i < data.rows.length; i++) {
        var point = new google.maps.LatLng(
			data.rows[i][0], 
			data.rows[i][1]);
        bounds.extend(point);
    }
    // zoom to the bounds
    map.fitBounds(bounds);
}


google.maps.event.addDomListener(window, 'load', initialize);

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT * FROM 1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa limit 100?key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT State FROM 1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa&key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT * FROM 1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa?key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow&jsonCallback=?

//https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Latitude,Longitude FROM 1eXzPtDLF7ZfEyK76tRYpLgph8aZzVCoaqfPzyLfa WHERE State='Ohio'&key=AIzaSyClmT0--eBE_r40OoRILf0m1wNhSQ8ueow
