console.log('Loaded!');
alert('Hi everyone');
var img = document.getElementById('m');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px' ;
}
img.onclick = function() {
    var interval = setInterval(moveRight, 50);
};