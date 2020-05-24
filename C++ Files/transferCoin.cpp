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

string transfer(char *argv[])
{
    fstream infile;
    string s= argv[1];
    int q = index(s,0);
    int p = index(s,q);
    int temp;
    int count = 0;
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
            if(type1 == s1)
            {
                getline(infile,type2,',');
                getline(infile,type3,',');
                int size = type3.size();
                infile.seekg((-size),ios::cur);
                temp = stoi(type3) - stoi(s3);
                type3= to_string(temp);
                infile << type3;
                getline(infile,type4,'\n');
                count++;
            }
            else if(type1 == s2)
            {
                getline(infile,type2,',');
                getline(infile,type3,',');
                int size = type3.size();
                infile.seekg((-size),ios::cur);
                temp = stoi(type3)+ stoi(s3);
                type3= to_string(temp);
                infile << type3;
                getline(infile,type4,'\n');
                count++;
            }
            else
            {
                getline(infile,type2,',');
                getline(infile,type3,',');
                getline(infile,type4,'\n');
            }
        }
    }
    infile.close();
    if(count == 2)
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
        printf("%s",transfer(argv));
    }
    else
    {
        printf("failure");
    }
    return 0;
}