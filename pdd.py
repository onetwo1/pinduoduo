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

referer_page_id = f"10031_{str(getTimeStamp())}_{getRandomString(10)}"
referer_page_url = f"""http://yangkeduo.com/catgoods.html?opt_id=2715&opt_type=2&opt_name=%e8%a3%99%e8%a3%85&opt_g=1&refer_page_name=search&refer_page_id={referer_page_id}&refer_page_sn=10031"""


first_url = "http://yangkeduo.com"
first_headers = {
    'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    'Accept-Encoding': "gzip, deflate",
    'Accept-Language': "zh-CN,zh;q=0.9",
    'Cache-Control': "max-age=0",
    'Connection': "keep-alive",
    'Host': "yangkeduo.com",
    'Upgrade-Insecure-Requests': "1",
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
}
session = requests.session()
session.get(first_url, headers=first_headers)
anti_content = os.popen(f"node merge.js {referer_page_url}").read().strip()
url = "http://apiv3.yangkeduo.com/v4/operation/2715/groups"
post_url = "http://t.yangkeduo.com/t.gif"
group_params = dict(
    offset = 0,
    size = 100,
    opt_type = 2,
    sort_type = "DEFAULT",
    list_id = f"2715_rec_list_catgoods_{getRandomString(6)}",
    anti_content=str(anti_content),
    pdduid=0
)
post_time = getTimeStamp()
# post_params = dict(
#     screen_width = 375,
#     screen_height = 812,
#     dpr = 2,
#     app_version = "",
#     platform = "unknown",
#     opt_id = 2715,
#     opt_type = 2,
#     op = "pv",
#     user_id = 0,
#     app_id = "",
#     time = post_time,
#     page_name = "opt",
#     page_id = f"10028_{str(post_time-1)}_{getRandomString(10)}",
#     page_sn = 10028,
#     refer_page_name = "search",
#     refer_page_id = referer_page_id,
#     refer_page_sn = 10031,
#     event = "page_show",
#     page_url = ""
# )
headers_options = {
    'Access-Control-Request-Headers': "accesstoken",
    'Access-Control-Request-Method': "GET",
    'Origin': "http://yangkeduo.com",
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
}
headers_get = {
    'AccessToken': "",
    'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
    'Origin': "http://yangkeduo.com",
    'Referer': referer_page_url,
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
}
headers_post = {
    "Content-Type": "text/plain;charset=UTF-8",
    'Origin': "http://yangkeduo.com",
    'Referer': referer_page_url,
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
}
session.options(url, params=group_params, headers=headers_options)
# session.post(post_url, params=post_params, headers=headers_post)
res = session.get(url, params=group_params, headers=headers_get)
with open("1.txt", "w", encoding="utf8") as f:
    f.write(res.text)