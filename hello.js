
var result=fact(6);
console.log(result);
function fact(num){
    var f=1;
    for(var x=2;x<=num;x++) {
        f=f*x;
    }
    return f;
}