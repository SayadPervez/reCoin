function chr(asciiVal)
{
    return String.fromCharCode(asciiVal);
}



function ord(char)
{
    return char.charCodeAt(0);
}

var dmap={'a': 'q',
 'b': 'w',
 'c': 'e',
 'd': 'r',
 'e': 't',
 'f': 'y',
 'g': 'u',
 'h': 'i',
 'i': 'o',
 'j': 'p',
 'k': 'a',
 'l': 's',
 'm': 'd',
 'n': 'f',
 'o': 'g',
 'p': 'h',
 'q': 'j',
 'r': 'k',
 's': 'l',
 't': 'z',
 'u': 'x',
 'v': 'c',
 'w': 'v',
 'x': 'b',
 'y': 'n',
 'z': 'm',
 'A': 'Q',
 'B': 'W',
 'C': 'E',
 'D': 'R',
 'E': 'T',
 'F': 'Y',
 'G': 'U',
 'H': 'I',
 'I': 'O',
 'J': 'P',
 'K': 'A',
 'L': 'S',
 'M': 'D',
 'N': 'F',
 'O': 'G',
 'P': 'H',
 'Q': 'J',
 'R': 'K',
 'S': 'L',
 'T': 'Z',
 'U': 'X',
 'V': 'C',
 'W': 'V',
 'X': 'B',
 'Y': 'N',
 'Z': 'M',
};

var emap={'q': 'a',
'w': 'b',
'e': 'c',
'r': 'd',
't': 'e',
'y': 'f',
'u': 'g',
'i': 'h',
'o': 'i',
'p': 'j',
'a': 'k',
's': 'l',
'd': 'm',
'f': 'n',
'g': 'o',
'h': 'p',
'j': 'q',
'k': 'r',
'l': 's',
'z': 't',
'x': 'u',
'c': 'v',
'v': 'w',
'b': 'x',
'n': 'y',
'm': 'z',
'Q': 'A',
'W': 'B',
'E': 'C',
'R': 'D',
'T': 'E',
'Y': 'F',
'U': 'G',
'I': 'H',
'O': 'I',
'P': 'J',
'A': 'K',
'S': 'L',
'D': 'M',
'F': 'N',
'G': 'O',
'H': 'P',
'J': 'Q',
'K': 'R',
'L': 'S',
'Z': 'T',
'X': 'U',
'C': 'V',
'V': 'W',
'B': 'X',
'N': 'Y',
'M': 'Z',
};

function rplenc(st){
    var x=[];
    var i=0;
    while(i<st.length)
    {
        if(st[i] in emap)
        x.push(emap[st[i]]);
        else
        x.push(st[i]);
        i++;
    }
    return(x.join(""));
}

function rpldec(st){
    var x=[];
    var i=0;
    while(i<st.length)
    {
        if(st[i] in dmap)
        x.push(dmap[st[i]]);
        else
        x.push(st[i]);
        i++;
    }
    return(x.join(""));
}

function rplencode(st){
    return(rplenc(rplenc(rplenc(st))));
}

function rpldecode(st){
    return(rpldec(rpldec(rpldec(st))));
}

function encode(inp)
{   
    var arr=new Array;
    for(var i=0;i<inp.length;i++)
    {
        arr[i]=chr(ord(inp[i])+3);
    }
    return arr.join('');
}

function decode(inp)
{   
    var arr=new Array(inp.length);
    
    
    for(var i=0;i<inp.length;i++)
    {
        arr[i]=chr(ord(inp[i])-3);
    }
    return arr.join('');
}
encrypt("hello");
function encrypt(word,key=encode("reCoin"))
{
    eval(decode("surfhvv1h{lw+,>"));
    word=word.toUpperCase();
    function divide(num)
    {
        if(num%2==0)
            return parseInt(num/3);
        else
            return parseInt(num/9);
    }
    n=key.length;
    fin=new Array;
    final=new Array;
    ascii_li=new Array;
    K=new Array;
    for(var j=0;j<n;j++)
    {
        K[j]=key[j];
    }
    N=K.length;
    for(var z=0;z<(word.length/N);z++)
    {
        K=K.concat(K);
    }
    key=K.join('');
    n=key.length;

    for(var alphabet=0;alphabet<n;alphabet++)
    {
        var ppi=123-ord(key[alphabet]);
        if(ord(key[alphabet])>124)
            ascii_li[alphabet]=ord(key[alphabet])-ppi;
        else
            ascii_li[alphabet]=ord(key[alphabet]);
    }
    
    lett=0;
    while(lett<word.length)
    {
        for(var _=0;_<n;_++)
        {
            if(lett%n==_)
                fin.push(Number(divide(Number(ord(word[lett]))+ascii_li[lett%n])));
        }
        lett++;
    }
    for(var entries=0;entries<n;entries++)
    {
        final.push(chr(fin[entries]));
    }
    final=final.slice(0,word.length);
    //console.log(final.join(''));
    return (final.join('').trim("")).replace(/[^a-z0-9]/gi,'');
}

eval(decode("surfhvv1h{lw+,>"));
