var myUserName="";
var dev="";

document.getElementById('uname').addEventListener("keyup",(e)=>{
    if(e.keyCode===13)
        document.getElementById("pwd").focus();
},false);

document.getElementById('pwd').addEventListener("keyup",(e)=>{
    if(e.keyCode===13)
        document.getElementById('submit-button').click();
},false);

function metaData(){
    htmlRender=`<h1>Developer's Data</h1><br>
    <div class="metaData">
     <span class="name__">Sayad Pervez . B</span><br><br>
     Full Stack Web Developer,<br>
     BlockChain Engineer,<br>
     REC ECE (2019 TO 2023)<br>
     <span style="color:darkblue;">pervez2504@gmail.com</span><br><br></div>
     <br><div class="metaData"><span class="name__">Sriraman . S</span><br><br>
     DataBase Analyst,<br>
     BlockChain Engineer,<br>
     REC ECE (2019 TO 2023)<br>
     <span style="color:darkblue;">srisethu7@gmail.com</span><br><br></div>`;
    codeRender=`none`;
    page2(htmlRender,codeRender);
}

function pwd_validate()
{   
    document.getElementById('pwd_no_match').style.display="none";
    if((document.getElementById('np1').value==document.getElementById('np2').value) && (document.getElementById('np1').value.length>6))
    {
        console.log("all ok");
        var j=encrypt(decode(rplencode(document.getElementById('pwd').value)),myUserName);
        var reply=shell(hyb('new_pwd',{pwd:j}));
        if(reply.status=="success")
        {
            document.getElementById('pwd_no_match').innerHTML="Password Changed ! <br> Refresh to continue <i class='far fa-smile-wink'></i>";
            document.getElementById('pwd_no_match').style.display="block";
        }
        else{
            document.getElementById('pwd_no_match').innerHTML="Some error occured<br>Try again";
            document.getElementById('pwd_no_match').style.display="block";
        }
    }
    else if(document.getElementById('np1').value!=document.getElementById('np2').value)
    {
        document.getElementById('pwd_no_match').innerHTML="PASSWORDS DO NOT MATCH <i class='far fa-frownfar fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }
    else if(document.getElementById('np1').value.length<=6)
    {
        document.getElementById('pwd_no_match').innerHTML="PASSWORD length must be greater than 6 <i class='far fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }
    else{
        document.getElementById('pwd_no_match').innerHTML="Password size must be greater than 6 <i class='far fa-frown'></i>";
        document.getElementById('pwd_no_match').style.display="block";
    }

}

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
    var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
console.log(isMobile);
if(isMobile==true)
    dev="mobile";
else
    dev="pc";

}



function hyb(t,p='none'){
    let r={device:dev,task:'none',params:'none'};
    r.task=`${t}`;
    r.params=JSON.stringify(p);
    console.log(r);
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

function hideall()
{
    document.getElementById('sp').innerText="-";
    document.getElementById('s').innerText="-";
}

function forgot_pwd(){
    var reply=shell(hyb('forgot_pwd'));
    if(reply.status=="success")
        {page2(decode(reply.reply),decode(reply.code));
        codeGreen();}
}

function submit_otp(){
    document.getElementById('sp').innerText="";
    var i=encode(rplencode(document.getElementById('pwd_uname').value));
    var c=encode(rplencode(document.getElementById('pwd_otp_inp').value));
    var reply=shell(hyb('submit_pwd_otp',{username:i,code:c}));
    if(reply.status=="success"){
        myUserName=document.getElementById('pwd_uname').value;
        page2(reply.reply,reply.code);}
    else
    {
        document.getElementById('sp').style.display="block";
        document.getElementById('sp').innerText="Wrong OTP";
    }
}

function get_pwd_code(){
    hideall();
    var i=encode(rplencode(document.getElementById('pwd_uname').value));
    var reply=shell(hyb('reset_pwd',{username:i}));
    if(reply.status=="success"){
        document.getElementById('s').style.display="block";
        document.getElementById('s').innerText="reset code sent";}
    else
    {
        document.getElementById('sp').style.display="block";
        document.getElementById('sp').innerText=reply.reply;
    }
}

function copy_uname(){
    var uname=document.getElementById('uname').value;
    document.getElementById("pwd_uname").placeholder=uname;
    document.getElementById("pwd_uname").value=uname;
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
        var i=encode(rplencode(uname));
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


