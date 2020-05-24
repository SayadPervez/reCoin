#include<iostream>
#include<fstream>
#include<string>

using namespace std;

string slice(string st,int s,int e)
{
    string ret;
    for(int i=s;i<e;i++)
        ret+=st[i];
    return(ret);
}

int index(string s)
{
    int n=s.size();
    int ret=-1;
    for(int i=0;i<n;i++)
    {
        if((char)s[i]==',')
            {ret=i;break;}
    }
    return(ret);
}

string getAmount(char* argv[])
{
    ifstream infile;
    string s=argv[1];
    int q=index(s);
    string s1=slice(s,0,q);
    string s2=slice(s,q+1,s.size());
    string type1, type2, type3, type4;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\db.csv");
    type3 = "failure";
    if(!infile.good())
    {
        return "failure";
    }
    else
    {
        while(!infile.eof())
        {
            getline(infile,type1,',');
            getline(infile,type1,',');
            getline(infile,type2,',');
            getline(infile,type3,',');
            if((type1 == s1) && (type2 == s2))
            {
                return type3;
            }
        }
        type3 = "failure";
    }
    return type3;
}


int main(int argc, char *argv[])
{
    if(argc == 2)
    {
        cout << getAmount(argv);
    }
    else
    {
        cout << "failure";
    }
    return 0;
}