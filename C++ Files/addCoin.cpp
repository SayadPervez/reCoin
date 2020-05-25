#include<iostream>
#include<fstream>
#include<string>

using namespace std;

string theMain[4][5];
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

int index(string s, int g)
{
    int n=s.size();
    int ret=-1;
    for(int i=g+1;i<n;i++)
    {
        if((char)s[i]==',')
            {ret=i;break;}
    }
    return(ret);
}

string addC(char *argv[])
{
    fstream infile;
    string s= argv[1];
    int q = index(s,0);
    int p = index(s,q);
    int temp;
    int count = 0;
    int No_line = nlines();
    string s1= slice(s,0,q);
    string s2= slice(s,q+1,p);
    string s3= slice(s,p+1,s.size());
    infile.open("C:\\Users\\srise\\OneDrive\\Documents\\db.csv");
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
    for(int i = 0;i < No_line; i++)
    {
        if(theMain[i][1]== s1 && theMain[i][2] == s2)
        {
            temp = stoi(theMain[i][3])+ stoi(s3);
            theMain[i][3]= to_string(temp);
        }
    }
    string final="";
    for (int i=0;i<No_line-1;i++)
    {
        for(int j=0;j<5;j++)
        {
            final+=(theMain[i][j]);
            if(j!=4)
            {
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
        printf("%s",addC(argv));
    }
    else
    {
        printf("failure");
    }
    return 0;
}
