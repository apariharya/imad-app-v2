var button = document.getElementById('counter');
                    
button.onclick = function() {
    var counter =0;
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};