$(document).ready(function(){
	//window.alert("jq called");
$("#sr").hide();
$("#gbf").hide();
$("#cont2").hide();
$("#cont3").hide();

$("#search").click(function(){
	$("#cont2").hide();
$("#cont3").hide();
	$("#sr").show();
	$("#gbf").show();
});

$("#FOGSAA").click(function(){
	$("#sr").hide();
    $("#gbf").hide();
   $("#cont2").hide();
	$("#cont3").show();
});
$("#tree").click(function(){
	$("#sr").hide();
    $("#gbf").hide();
   $("#cont3").hide();
	$("#cont2").show();

});
});