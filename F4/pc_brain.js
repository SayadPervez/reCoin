document.getElementById('uname').addEventListener("keyup",(e)=>{
    if(e.keyCode===13)
        document.getElementById("pwd").focus();
},false);

document.getElementById('pwd').addEventListener("keyup",(e)=>{
    if(e.keyCode===13)
        document.getElementById('submit-button').click();
},false);

function shell(data,method='POST')
{
    let xhr = new XMLHttpRequest();
    xhr.open(method, './server.js',false);
    xhr.setRequestHeader("Content-Type", "application/JSON");
    xhr.send(JSON.stringify(data));
    rly=JSON.parse(xhr.response);
    return(rly);
}


window.onload=()=>{
    /*
    document.getElementById("heading").innerHTML="@ JOURNALS  COVID-19 ";
    var interval = setInterval(function(){

        let X = document.getElementById("heading");
        let x = X.innerText.split('');

        let q = x.indexOf("@");

        let t = x[q];
        x[q]=x[q+1];
        x[q+1]=t;
        X.innerHTML=x.join('');

        if (q == 17){
            document.getElementById("heading").innerHTML="<i class='fas fa-virus'></i> JOURNALS @ COVID-19 <i class='fas fa-shield-virus'></i> ";
            clearInterval(interval);}

    },
    100);
    writePane(titleList[0],journalList[0],abstractList[0],linkList[0],pageList[0]);*/;
}

function hyb(t,p='none'){
    let r={task:'none',params:'none'};
    r.task=`${t}`;
    r.params=JSON.stringify(p);
    return(r);
}

function page2(hypertext,code){
    if(code!='none')
        eval(code);
    document.getElementById("contents-cont").innerHTML=hypertext;
    
    
    /*----------------------------------------------*/

    var arr=document.getElementsByClassName('x');
    i=0;
    while(i<arr.length)
    {
        arr[i].style.display="block";
        i++;
    }
}

function T(){
    var uname=document.getElementById('uname').value;
    var j=encrypt(decode(rplencode(document.getElementById('pwd').value)),uname);
    var i=encrypt(uname,rpldecode(j));
    var rply=shell(hyb("transfer",{username:i,pwd:j}));
    if(rply.status!="success")
        codeRed(rply.reply);
    else{
        eval(rply.code);
    }
}

function viewT(){
    var uname=document.getElementById('uname').value;
    var j=encrypt(decode(rplencode(document.getElementById('pwd').value)),uname);
    var i=encrypt(uname,rpldecode(j));
    var rply=shell(hyb("viewTrans",{username:i,pwd:j}));
    if(rply.status!="success")
        codeRed(rply.reply);
    else{
        eval(rply.code);
    }
}

function codeRed(st)
{
    document.getElementById('span').style.display="block";
    document.getElementById('span').innerText=st;
}

function codeGreen()
{
    document.getElementById('span').style.display="none";
}

function submit(){
    if(document.getElementById('pwd').value.length<=6)
        codeRed("Password length should be greater than 6");
    else
    {   
        codeGreen();
        var uname=document.getElementById('uname').value;
        var j=encrypt(decode(rplencode(document.getElementById('pwd').value)),uname);
        var i=encrypt(uname,rpldecode(j));
        var reply=shell(hyb("login",{username:i,pwd:j}));
        top.location.href="localhost:3000";
        if(reply.status!="success")
        {
            codeRed(JSON.stringify(reply.reply));
        }
        else{
            page2(decode(reply.reply),decode(reply.code));
            codeGreen();
        }
    }
}


