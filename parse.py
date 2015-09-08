# -*- coding: utf-8 -*-
import urllib, json
url = "http://api.grsu.by/1.x/app1/getTeachers?extended=true"
response = urllib.urlopen(url)
data = json.loads(response.read())

with open('teachers.json', 'w') as outfile:
    json.dump(data, outfile)