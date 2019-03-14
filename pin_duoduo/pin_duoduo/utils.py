# encoding=utf-8
import re
import os
import time
import math
import json
import random
import requests
from scrapy.selector import Selector
from pin_duoduo.settings import DATA_PATH, JS_FILE_PATH

first_pattern = re.compile(r"__NEXT_DATA__\s?=\s?({.*?});.*?", re.DOTALL)


def get_random_string(e):
    e = 32 if not e else e
    t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    r = ""
    for i in range(e):
        _ = math.floor(random.random()*len(t))
        if _ < len(t):
            r += t[_]
    return r


def get_timestamp():
    return int(round(time.time() * 1000))


def get_anti_content(opt_id, opt_name, opt_type=2):
    referer_page_id = f"{opt_id}_{str(get_timestamp())}_{get_random_string(10)}"
    referer_page_url = f"""http://yangkeduo.com/catgoods.html?opt_id={opt_id}&opt_type={opt_type}&opt_name={opt_name}&opt_g=1&refer_page_name=search&refer_page_id={referer_page_id}&refer_page_sn=10031"""
    return os.popen(f'node {JS_FILE_PATH} "{referer_page_url}"').read().strip()


def first():
    # 获取主分类
    url = "https://mobile.yangkeduo.com/classification.html"
    headers = {
        'Host': "yangkeduo.com",
        'Connection': "keep-alive",
        'Cache-Control': "no-cache",
        'Upgrade-Insecure-Requests': "1",
        'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) \
        AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 \
            Mobile/15A372 Safari/604.1",
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,\
        image/webp,image/apng,*/*;q=0.8",
        'Accept-Encoding': "gzip, deflate",
        'Accept-Language': "zh-CN,zh;q=0.9"
    }
    s = requests.get(url, headers=headers)
    _str = Selector(s).xpath("//script[@id='__NEXT_PAGE__/classification']/\
            preceding-sibling::script[1]/text()").extract()
    json_str = first_pattern.match(_str[0]).group(1)
    data = json.loads(json_str, encoding="utf8")
    data_list = data.get("props").get("pageProps").get("data").get(
        "operationsData").get("detailData")
    return data_list


def process_first():
    # 获取主分类并提取需要的信息, 保存到 pdd_first.json 文件中
    data_list = first()
    all_data = []
    cats = {}
    for data in data_list:
        cats["optID"] = data.get("optID")
        cats["tabName"] = data.get("tabName")
        cats_cat_list = []
        cat_list = data.get("cat")
        for cat in cat_list:
            d = cat.copy()
            d.pop("key")
            d.pop("isHightlight")
            d.pop("imgUrl")
            cats_cat_list.append(d)
        cats["cat_list"] = cats_cat_list
        all_data.append(cats)
        cats = {}

    with open(os.path.join(DATA_PATH, "pdd_first.json"), "w", encoding="utf8") as p:
        p.write(json.dumps(all_data, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    first()
    process_first()
