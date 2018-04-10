import json

mapmore15={}
counter=0

for line in open("""C:/Users/Abhijeet/Desktop/MajorProject/ToysOriginalData/reviews_Toys_and_Games.json""", 'r'):
    x=(json.loads(line))

    if (x["asin"] in mapmore15):
        mapmore15[x["asin"]] += 1
    else:
        mapmore15[x["asin"]] = 1
###   122663 with equal to sign
###   106819 without equal to sign

fhtest = open("""C:/Users/Abhijeet/Desktop/MajorProject/ToysOriginalData/TestingFinal.json""","a")
fhtrain = open("""C:/Users/Abhijeet/Desktop/MajorProject/ToysOriginalData/TrainingNew.json""","a")

for line in open("""C:/Users/Abhijeet/Desktop/MajorProject/ToysOriginalData/reviews_Toys_and_Games.json""", 'r'):
    x = (json.loads(line))
    if((x["helpful"][0]+x["helpful"][1])>10):
        if((x["asin"] in mapmore15) and (mapmore15[x["asin"]]>15)):
            counter+=1
            if(counter%5==0):
               fhtest.write(line)
            else:
               fhtrain.write(line)

print("Number of Reviews Selected are   "+str(counter))