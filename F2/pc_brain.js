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

function page2(){
    var arr=document.getElementsByClassName('x');
    i=0;
    while(i<arr.length)
    {
        arr[i].style.display="block";
        i++;
    }
}

function submit(){
    var i=document.getElementById('uname').value;
    var j=document.getElementById('pwd').value;
    var reply=shell(hyb("login",{uname:i,pwd:j}));
    top.location.href="localhost:3000";
    if(reply.status!="success")
    {
        document.getElementById('span').innerText=JSON.stringify(reply.reply);
    }
    else{
        page2();
    }
}
