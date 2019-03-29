# 搜索接口测试
import os
import requests
from pin_duoduo.utils import get_random_string, get_timestamp
from pin_duoduo.settings import JS_FILE_PATH

url = "https://mobile.yangkeduo.com/proxy/api/search?"


referer_page_id = f"10031_{str(get_timestamp())}_{get_random_string(10)}"

headers = {
    'accept': "*/*",
    'accept-encoding': "gzip, deflate, br",
    'accept-language': "zh-CN,zh;q=0.9",
    'accesstoken': "R63WNH4E64IV5CZSCI77CLIYEEV4KV47D6Y6SZNZ4HJRYPCY755Q103d93f",
    'content-type': "application/x-www-form-urlencoded;charset=UTF-8",
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
    'cache-control': "no-cache",
}
anti_content = os.popen(f'node {JS_FILE_PATH}').read().strip()
group_params = dict(
    page=7,
    size=50,
    sort_type='default',
    requery=0,
    q="洛神山庄",
    list_id=f"{get_random_string(10)}",
    anti_content=str(anti_content),
    pdduid=0,
)

res = requests.get(url, params=group_params, headers=headers)
