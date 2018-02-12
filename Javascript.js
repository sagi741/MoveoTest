/**
 * Created by sagifridman on 07/02/2018.
 */

var Func_Timeout;
var locatin_name;
var temprature;
var humidity;
var windSpeed;


function TimeOutFunc(locatin_name,temprature,humidity,windSpeed) {
    Func_Timeout = setTimeout(alertFunc, 3000);
}
