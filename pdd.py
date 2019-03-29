#!/usr/local/bin/python3
import os
import math
import time
import random
import requests
from requests.utils import dict_from_cookiejar


def getRandomString(e):
    e = 32 if not e else e
    t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    r = ""
    for i in range(e):
        _ = math.floor(random.random()*len(t))
        if _ < len(t):
            r+= t[_]
    return r

def getTimeStamp():
    return int(round(time.time() * 1000))

session = requests.session()

anti_content = os.popen(f"node merge.js").read().strip()

url = "http://apiv3.yangkeduo.com/v4/operation/2715/groups"

group_params = dict(
    offset = 0,
    size = 100,
    opt_type = 2,
    sort_type = "DEFAULT",
    list_id = f"2715_rec_list_catgoods_{getRandomString(6)}",
    anti_content=str(anti_content),
    pdduid=0
)

headers_get = {
    'AccessToken': "",
    'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
    'Origin': "http://yangkeduo.com",
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
}

res = session.get(url, params=group_params, headers=headers_get)

with open("1.txt", "w", encoding="utf8") as f:
    f.write(res.text)
