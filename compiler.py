import pymongo
import os
import sys
from pymongo import MongoClient
import subprocess
import threading
import time

client = MongoClient('localhost', 27017)

while True:
    result = list(client.code.packages.find({'compiled': False}, {'task': 1, 'compiler': 1}).sort('date',pymongo.ASCENDING))
    if len(result) > 0:
        for row in result:
            print(row)
            if row['compiler'] == 'Python 3.8':
                for taskNumber in range(1, int(len(os.listdir("./tasks/"+str(row['task'])+"/tests")) / 2) + 1):
                    with open("./tasks/"+str(row['task'])+"/tests/"+str(taskNumber), "r") as inpFile:
                        process = subprocess.run(["python", "packages/" + row['_id'] + ".py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, input=inpFile.read())
                        with open("tasks/"+str(row['task'])+"/tests/"+str(taskNumber)+".a", "r") as outFile:
                            out = process.stdout.translate(dict.fromkeys(range(32)));
                            ans = outFile.read().translate(dict.fromkeys(range(32)));
                            print("out: " + out + "; ans: " + ans)
                            if (out == ans):
                                print("eq")
                                client.code.packages.update_one({'_id': row['_id']}, {'$push': {'tests': 'OK'}})
                            else:
                                print("ne")
                                if (len(process.stderr) == 0):
                                    client.code.packages.update_one({'_id': row['_id']}, {'$push': {'tests': 'WA'}})
                                else:
                                    client.code.packages.update_one({'_id': row['_id']}, {'$push': {'tests': 'ER'}})
                client.code.packages.update_one({'_id': row['_id']}, {'$set': {'compiled': True}})
