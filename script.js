var a = [];
var b = 0;
var c = 0;
var d;
var e = 0;
var f = [];

document.getElementById("go").onclick = function(){
    loadthing();
};

function loadthing(){
    document.getElementById("go").innerHTML = "wait";
    document.getElementById("go").disabled = true;

    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(function(x){
        return x.json();
    })
    .then(function(y){
        var z = y.results;

        for(var i=0;i<z.length;i++){
            var lol = {};
            lol.a1 = fix(z[i].question);
            lol.a2 = fix(z[i].correct_answer);

            var arr = [];
            for(var j=0;j<z[i].incorrect_answers.length;j++){
                arr.push(fix(z[i].incorrect_answers[j]));
            }

            arr.push(lol.a2);
            lol.a3 = mix(arr);
            a.push(lol);
        }

        startthing();
    });
}

function startthing(){
    document.getElementById("s1").classList.add("hide");
    document.getElementById("s2").classList.remove("hide");
    showthing();
}

function showthing(){
    clearthing();
    var zz = a[b];

    document.getElementById("qqq").innerHTML = zz.a1;
    document.getElementById("num").innerHTML = "q " + (b + 1);

    for(var i=0;i<zz.a3.length;i++){
        var bt = document.createElement("button");
        bt.innerHTML = zz.a3[i];

        bt.onclick = function(ev){
            checkthing(ev.target, ev.target.innerHTML, zz.a2);
        };

        document.getElementById("xxx").appendChild(bt);
    }

    timego();
}

function timego(){
    e = 15;
    document.getElementById("tm").innerHTML = e;

    d = setInterval(function(){
        e--;
        document.getElementById("tm").innerHTML = e;

        if(e == 0){
            clearInterval(d);
            timeoutthing();
        }
    }, 1000);
}

function checkthing(btn, u, r){
    clearInterval(d);

    if(u == r){
        c++;
        btn.className = "ok";
    }else{
        btn.className = "no";
        showans(r);
    }

    f.push({ q: a[b].a1, u: u, r: r });
    lockthing();
    document.getElementById("okbtn").classList.remove("hide");
}

function timeoutthing(){
    showans(a[b].a2);

    f.push({
        q: a[b].a1,
        u: "none",
        r: a[b].a2
    });

    lockthing();
    document.getElementById("okbtn").classList.remove("hide");
}

function showans(x){
    var bb = document.querySelectorAll("#xxx button");
    for(var i=0;i<bb.length;i++){
        if(bb[i].innerHTML == x){
            bb[i].className = "ok";
        }
    }
}

function lockthing(){
    var bb = document.querySelectorAll("#xxx button");
    for(var i=0;i<bb.length;i++){
        bb[i].disabled = true;
    }
}

function clearthing(){
    document.getElementById("xxx").innerHTML = "";
    document.getElementById("okbtn").classList.add("hide");
    clearInterval(d);
}

document.getElementById("okbtn").onclick = function(){
    b++;
    if(b < a.length){
        showthing();
    }else{
        endthing();
    }
};

function endthing(){
    document.getElementById("s2").classList.add("hide");
    document.getElementById("s3").classList.remove("hide");

    document.getElementById("mmm").innerHTML = c;

    var h = "";
    for(var i=0;i<f.length;i++){
        h += "<p>" + f[i].q +
             "<br>your: " + f[i].u +
             "<br>ans: " + f[i].r + "</p>";
    }

    document.getElementById("res").innerHTML = h;
}

function mix(x){
    x.sort(function(){
        return Math.random() - 0.5;
    });
    return x;
}

function fix(t){
    var y = document.createElement("textarea");
    y.innerHTML = t;
    return y.value;
}
