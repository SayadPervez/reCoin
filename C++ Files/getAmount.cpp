#include<iostream>
#include<fstream>
#include<string>

using namespace std;

int index(string)
{
    int n=strlen(s);
    int ret=-1;
    for(int i=0;i<n;i++)
    {
        if(s[i]==",")
            {ret=i;break;}
    }
    return(ret);
}

string getAmount(char* argv[])
{
    ifstream infile;
    string s=argv[1];
    cout<<s<<"\n";
    int q=index(s);
    string type1, type2, type3, type4;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\db.csv");
    type3 = "-x-x-x-";
    if(!infile.good())
    {
        return type3;
    }
    else
    {
        while(!infile.eof())
        {
            getline(infile,type1,',');
            getline(infile,type1,',');
            getline(infile,type2,',');
            getline(infile,type3,',');

            if((type1 == argv[1]) && (type2 == argv[2]))
            {
                getline(infile,type4,'\n');
                return type3;
            }
            getline(infile,type4,'\n');
        }
        type3 = "-x-x-x-";

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
        cout << "no output";
    }
    return 0;
}