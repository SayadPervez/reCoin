#include <iostream>
#include <fstream>
#include <string.h>

using namespace std;
string getAmount(char *argv[])
{
    ifstream infile;
    string type1, type2, type3, type4;
    infile.open("C:\\Users\\admin\\OneDrive\\Documents\\alone.csv");
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
    if(argc == 3)
    {
        cout << getAmount(argv);
    }
    else
    {
        cout << "no output";
    }
    return 0;
}
