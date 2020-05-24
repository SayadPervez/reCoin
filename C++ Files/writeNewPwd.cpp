#include<iostream>
#include<string>
#include<fstream>

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


string run(char *argv[])
{
    fstream infile;
    string s= argv[];
    int q = index(s);
    string s1= slice(s,0,q);
    string s2= slice(s,q+1,s.size());
    string type1, type2, type3, type4;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\db.csv",ios::in,ios::out);
    if(!infile.good())
    {
        return "failure";
    }
    else
    {
        while(!infile.eof())
        {
            getline(infile,type1,',');
            getline(infile,type2,',');
            if((type2 == s1))
            {
                infile << s2;
                infile.close();
                return "success";
            }
            else
            {
                getline(infile,type3,',');
                getline(infile,type4,',');
                getline(infile,type4,'\n');
            }
        }

    }
    infile.close();
    return "failure";
}

int main(int argc, char *argv[])
{
    if(argc == 2)
    {
        cout << run(argv);
    }
    else
    {
        cout << "failure";
    }
    return 0;

