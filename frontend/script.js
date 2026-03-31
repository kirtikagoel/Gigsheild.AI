function registerUser(){

let name=document.getElementById("name").value;
let city=document.getElementById("city").value;
let platform=document.getElementById("platform").value;

if(name=="" || city==""){
document.getElementById("message").innerText="Please fill all fields";
return;
}

let user={
name:name,
city:city,
platform:platform
};

localStorage.setItem("worker",JSON.stringify(user));

document.getElementById("message").innerText="Registration Successful";

}
function savePlan(){

let basePlan=parseInt(document.getElementById("plan").value);
let risk=document.getElementById("risk").value;
let hours=document.getElementById("hours").value;

let finalPremium=basePlan;

if(risk=="low"){
finalPremium=basePlan-2;
}

else if(risk=="high"){
finalPremium=basePlan+5;
}

let policy={
premium:finalPremium,
risk:risk,
hours:hours
};

localStorage.setItem("policy",JSON.stringify(policy));

document.getElementById("planMessage").innerText=
"Policy Activated with Premium ₹"+finalPremium+"/week";

}

function checkTrigger(){

let trigger=document.getElementById("trigger").value;

if(trigger=="none"){
document.getElementById("claimMessage").innerText=
"No disruption detected";
return;
}

let claimStatus="Claim Approved";

if(trigger=="rain"){
claimStatus="Claim Approved due to Heavy Rain";
}

else if(trigger=="flood"){
claimStatus="Claim Approved due to Flood Risk";
}

else if(trigger=="traffic"){
claimStatus="Claim Approved due to Traffic Delay";
}

else if(trigger=="strike"){
claimStatus="Claim Approved due to Worker Strike";
}

else if(trigger=="appdown"){
claimStatus="Claim Approved due to App Failure";
}

document.getElementById("claimMessage").innerText=
claimStatus;

}

function checkWeatherAPI(){

let weatherConditions=[
"clear",
"rain",
"cloudy",
"storm"
];

let randomWeather=
weatherConditions[Math.floor(Math.random()*weatherConditions.length)];

if(randomWeather=="rain" || randomWeather=="storm"){

document.getElementById("weatherMessage").innerText=
"Weather API Alert: Heavy Rain Detected — Claim Approved";

document.getElementById("claimMessage").innerText=
"Claim Approved due to Weather Risk";

}

else{

document.getElementById("weatherMessage").innerText=
"Weather API Alert: No Risk Detected";

}

}

function checkTrafficAPI(){

let trafficConditions=[
"normal",
"moderate",
"heavy"
];

let randomTraffic=
trafficConditions[Math.floor(Math.random()*trafficConditions.length)];

if(randomTraffic=="heavy"){

document.getElementById("trafficMessage").innerText=
"Traffic API Alert: Heavy Traffic Detected — Claim Approved";

document.getElementById("claimMessage").innerText=
"Claim Approved due to Traffic Delay";

}

else{

document.getElementById("trafficMessage").innerText=
"Traffic API Alert: No Major Delay";

}

}

function checkFloodAPI(){

let floodZones=[
"safe",
"warning",
"flood"
];

let randomFlood=
floodZones[Math.floor(Math.random()*floodZones.length)];

if(randomFlood=="flood"){

document.getElementById("floodMessage").innerText=
"Flood API Alert: High Flood Risk — Claim Approved";

document.getElementById("claimMessage").innerText=
"Claim Approved due to Flood Risk";

}

else{

document.getElementById("floodMessage").innerText=
"Flood API Alert: Area Safe";

}

}

function loadDashboard(){

let worker=localStorage.getItem("worker");
let policy=localStorage.getItem("policy");

if(worker==null || policy==null){

document.getElementById("dashboardMessage").innerHTML=

"<b>Worker:</b> "+workerData.name+
"<br><b>City:</b> "+workerData.city+
"<br><b>Platform:</b> "+workerData.platform+
"<br><b>Premium:</b> ₹"+policyData.premium+"/week"+
"<br><b>Risk:</b> "+policyData.risk+
"<br><b>Coverage:</b> "+policyData.hours;

return;

}

let workerData=JSON.parse(worker);
let policyData=JSON.parse(policy);

document.getElementById("dashboardMessage").innerText=

"Worker: "+workerData.name+
" | City: "+workerData.city+
" | Platform: "+workerData.platform+
" | Premium: ₹"+policyData.premium+
"/week | Risk: "+policyData.risk+
" | Coverage: "+policyData.hours;

}

function resetSystem(){

localStorage.clear();

document.getElementById("dashboardMessage").innerText=
"System Reset Successful";

document.getElementById("message").innerText="";
document.getElementById("planMessage").innerText="";
document.getElementById("claimMessage").innerText="";
document.getElementById("weatherMessage").innerText="";
document.getElementById("trafficMessage").innerText="";
document.getElementById("floodMessage").innerText="";

}