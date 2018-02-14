/**
 * Created by sagifridman on 07/02/2018.
 */


$(document).ready(function() {

    console.log( "ready!" );


    $("#searchBtn").click(function(){
        //call to ajax

        var s= $("#searchCity").val();
        $.post('/search', {query: s}, function (response) {
            console.log(response);
            $('body').append('<div>'+response.location+'</div>' + '<div>'+response.temp+'</div>' + '<div>'+response.humidity+'</div>')
        });
        console.log( "button clicked.... "+ s );

    });


});

