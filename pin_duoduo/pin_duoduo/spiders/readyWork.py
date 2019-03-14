# -*- coding: utf-8 -*-
"""准备工作: 抽取三级分类存入 data> work.json 文件中"""
import os
import json
import scrapy
from urllib.parse import urlencode
from pin_duoduo.items import ReadyWorkItem
from pin_duoduo.utils import get_random_string, get_anti_content


class ReadyWorkSpider(scrapy.Spider):
    name = 'readyWork'
    custom_settings = dict(
        COOKIES_ENABLED=False,  # 禁用 cookie
        RETRY_ENABLED=False,    # 重试中间件 指定关闭 默认为 True 是开启状态
        DOWNLOAD_TIMEOUT=15.0,
        # HTTPERROR_ALLOWED_CODES=[302, 500, 502, 404, 403, 503]
        ITEM_PIPELINES={'pin_duoduo.pipelines.JsonExportReadyWorkPipeline': 300}
    )
    headers = {
        'AccessToken': "R63WNH4E64IV5CZSCI77CLIYEEV4KV47D6Y6SZNZ4HJRYPCY755Q103d93f",
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
        'Origin': "http://yangkeduo.com",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
    }

    def start_requests(self):
        data_path = self.settings.get('DATA_PATH')
        file_path = os.path.join(data_path, 'pdd_first.json')
        with open(file_path, "r", encoding="utf8") as f:
            data_list = json.loads(f.read(), encoding="utf8")

        for data in data_list:
            tab_name = data["tabName"]
            cat_list = data.get("cat_list")
            for cat in cat_list:
                opt_id = cat.get('optID')
                opt_name = cat.get('optName')
                group_params = dict(
                    offset=0,
                    size=100,
                    opt_type=2,
                    sort_type="DEFAULT",
                    list_id=f"{opt_id}_rec_list_catgoods_{get_random_string(6)}",
                    anti_content=str(get_anti_content(opt_id=opt_id, opt_name=opt_name)),
                    pdduid=0
                )
                url = "http://apiv3.yangkeduo.com/v4/operation/{}/groups?".format(opt_id)
                cat_url = f'{url}{urlencode(group_params)}'
                # return [scrapy.Request(cat_url, headers=self.headers, meta={"tabName": tab_name,
                #                                                             "optName": opt_name})]
                yield scrapy.Request(cat_url, headers=self.headers, meta={"tabName": tab_name,
                                                                          "optName": opt_name})

    def parse(self, response):
        json_data = json.loads(response.text)
        opt_infos = json_data["opt_infos"]
        item = ReadyWorkItem()
        item["tabName"] = response.meta["tabName"]
        item["optName"] = response.meta["optName"]
        item["optInfos"] = opt_infos
        yield item
