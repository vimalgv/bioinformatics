$.ajax({
	url: "https://data.crookedly98.hasura-app.io/v1/query",
	contentType: "application/json",
	data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "dna",
            "columns": [
                  "name"
            ]
      }
	}),
	type: "POST",
	dataType: "json"
}).done(function(json) {
var dna_sequence=[];
for(var i=0;i<json.length;i++)
dna_sequence[i]=json[i]["name"];
window.alert("welcome");
var input = document.getElementById("serachval");
var awesomplete=new Awesomplete(input, {list:dna_sequence,
minChars:1
});
	// Handle Response
}).fail(function(xhr, status, errorThrown) {
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});