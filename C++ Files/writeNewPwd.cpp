#include<iostream>
#include<string>
#include<fstream>

using namespace std;

string slice(string st, int s, int e)
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
    ifstream infile;
    string s= argv[1];
    string t = ",";
    string l = "\n";
    string Whole_file = "";
    int q = index(s);
    int count = 0;
    string s1= slice(s,0,q);
    string s2= slice(s,q+1,s.size());
    string type1, type2, type3, type4, type5;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\reCoin-master\\reCoin-master\\C++ Files\\db.csv");
    if(!infile.good())
    {
        return "failure";
    }
    else
    {
        while(!infile.eof())
        {
            getline(infile,type1,',');
            Whole_file = Whole_file + type1 + t;
            getline(infile,type2,',');
            Whole_file = Whole_file + type2 + t;
            if((type2 == s1))
            {    
                getline(infile,type3,',');
                type3 = s2;
                Whole_file = Whole_file + type3 + t;
                getline(infile,type4,',');
                Whole_file = Whole_file + type4 + t;
                getline(infile,type5,'\n');
                Whole_file = Whole_file + type5 + l;
                count++;
            }
            else
            {
                getline(infile,type3,',');
                Whole_file = Whole_file + type3 + t;
                getline(infile,type4,',');
                Whole_file = Whole_file + type4 + t;
                getline(infile,type5,'\n');
                Whole_file = Whole_file + type5 + l;
            }
        }

    }
    infile.close();
    ofstream outfile;
    outfile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\reCoin-master\\reCoin-master\\C++ Files\\db.csv");
    outfile << Whole_file;
    if(count == 1)
    {
        return "success";
    }
    else
    {
        return "failure";
    }
}

int main(int argc, char *argv[])
{
    if(argc == 2)
    {
        cout<<run(argv);
    }
    else
    {
        cout<<"failure";
    }
    return 0;
}
