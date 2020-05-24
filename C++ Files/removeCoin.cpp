#include<iostream>
#include<fstream>
#include<string>

using namespace std;

string slice(string st, int s, int e)
{
    string ret;
    for(int i=s;i<e;i++)
        ret+=st[i];
    return(ret);
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

string subC(char *argv[])
{
    fstream infile;
    string s= argv[1];
    int q = index(s,0);
    int p = index(s,q);
    int temp;
    string s1= slice(s,0,q);
    string s2= slice(s,q+1,p);
    string s3= slice(s,p+1,s.size());
    string type1, type2, type3, type4;
    infile.open("C:\\Users\\srise\\OneDrive\\Documents\\db.csv");
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
            if((type1 == s1) && (type2 == s2))
            {
                getline(infile,type3,',');
                int size = type3.size();
                infile.seekg((-size),ios::cur);
                temp = stoi(type3) - stoi(s3);
                type3= to_string(temp);
                infile << type3;
                getline(infile,type4,'\n');
                infile.close();
                return type3;
            }
            else
            {
                getline(infile,type3,',');
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
        printf("%s",subC(argv));
    }
    else
    {
        printf("failure");
    }
    return 0;
}