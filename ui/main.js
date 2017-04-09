console.log('Loaded!');
alert('Hi everyone');
var img = document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft = marginLerft + 5;
    img.style.marginLeft=marginLeft + 'px';

}
img.onclick=function(){
    var interval = setInterval(moveRight,50);
}
