#include<iostream>
#include<string>
#include<fstream>

using namespace std;
string theMain[5000][5];
string slice(string st, int s, int e)
{
    string ret;
    for(int i=s;i<e;i++)
        ret+=st[i];
    return(ret);
}

int nlines()
{
    ifstream infile;
    char ch;
    int count_n=0;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\reCoin-master\\reCoin-master\\C++ Files\\db.csv");
    while(!infile.eof())
    {
        infile.get(ch);
        if(ch == '\n')
        {
            count_n++;
        }
    }
    infile.close();
    return count_n;
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
    string s= argv[1];
    string t = ",";
    string l = "\n";
    string Whole_file = "";
    int q = index(s);
    int count = 0,i,j;
    int No_line = nlines();
    string s1= slice(s,0,q);
    string s2= slice(s,q+1,s.size());
    ifstream infile;
    infile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\reCoin-master\\reCoin-master\\C++ Files\\db.csv");
    if(!infile.good())
    {
        return "failure";
    }
    else
    {
        while(infile.good())
        {
            for(int i=0;i< No_line;i++)
            {
                for(int j=0;j<5;j++)
                {

                    if(j == 4 && i == No_line - 1)
                    getline(infile,theMain[i][j]);
                    else if(j==4)
                    getline(infile,theMain[i][j],'\n');
                    else
                    {
                       getline(infile,theMain[i][j],',');
                    }
                    
                }
            }

        }
           
    }
    infile.close();
    for (i=0;i<No_line;i++)
    {
        if(theMain[i][1]==s1)
        {
            theMain[i][2]=s2;
            count+=1;
            break;
        }
    }
    string final="";
    for (i=0;i<No_line-1;i++)
    {
        for(j=0;j<5;j++)
        {
            final+=(theMain[i][j]);
            if(j!=4){
                final+=",";
            }
        }final+="\n";
    }
    
    ofstream outfile;
    outfile.open("P:\\Pvz_Program_Files\\Web_Development\\_reCoin_\\_Boosh C++\\reCoin-master\\reCoin-master\\C++ Files\\db.csv");
    outfile<<final;
    outfile.close();
    if(count > 0)
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
