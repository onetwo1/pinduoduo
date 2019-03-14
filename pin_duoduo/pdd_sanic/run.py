import os
import time
import math
import random
from sanic import Sanic
from sanic.response import json, html

app = Sanic()
js_path = "merge.js"


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


@app.route('/')
@app.route('/index')
async def index(request):
    return html("<h1>Welcome</h1>")


@app.post('/anti_content')
async def anti_content(request):
    data = request.json
    opt_id = data.get("opt_id")
    opt_name = data.get("opt_name")
    referer_page_id = f"{opt_id}_{str(get_timestamp())}_{get_random_string(10)}"
    referer_page_url = f"""http://yangkeduo.com/catgoods.html?opt_id={opt_id}&opt_type=2&opt_name={opt_name}&opt_g=1&refer_page_name=search&refer_page_id={referer_page_id}&refer_page_sn=10031"""
    return json({"anti_content": os.popen(f'node {js_path} "{referer_page_url}"').read().strip()})


app.run(host="0.0.0.0", port=8000)


