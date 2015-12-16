function() {
var set = document.querySelector('#set').selected;
var age = document.querySelector('#age').immediateValue;
var sequence = "";
var chars = 100;
var total = 0;
var i = 0;
var waiting = false;
$(".form").toggleClass("hidden");
$(".exam").toggleClass("hidden");
var correct = 0;

while (i < 1) {
if (chars < 0 && !waiting) {
$("#guesser").toggleClass("hidden");
break;
var R = 0;

if(set == 'numeric') {
R = 10;
}
if(set == 'alphabetic') {
R = 52;
}
if(set == 'alphanumeric') {
R = 62;
}

var score = (R/62.0)*(correct/(100.0-chars));
time = total/(1000.0*i);

$("#sequence").html(score);

$.ajax({
type: 'POST',
url: '/record',
data: {"time": time, "score": score, "age": age}
})
}
}
if(!waiting) {
$("#guesser").toggleClass("hidden");
$.get('/generate', {"age": age, "set": set},function(data, json){
sequence = data.sequence;
$("#sequence").html(sequence);
$("#sequence").toggleClass(hidden);
chars = chars - sequence.length;
});
i++;
wait = Math.floor((Math.random() * 100) + 1);
total+=wait
setTimeout(function () {
$("#sequence").toggleClass(hidden);
$("#guesser").toggleClass(hidden);
}, wait);
waiting = true;
}
$(document).keypress(function(e) {
if(e.which == 13) {
waiting = false;
var guess = document.querySelector('#guesser').input;
var min = Math.min(guess.length, sequence.length);
for (i = 0; i < min; i++) {
if (guess.charAt(i) == sequence.charAt(i)) {
correct++;
}
}
}});
