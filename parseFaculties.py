# -*- coding: utf-8 -*-
import urllib, json
url = "http://api.grsu.by/1.x/app1/getFaculties"
response = urllib.urlopen(url)
data = json.loads(response.read())

with open('faculties.json', 'w') as outfile:
    json.dump(data, outfile)