# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ReadyWorkItem(scrapy.Item):
    tabName = scrapy.Field()    # 一级分类名
    optName = scrapy.Field()    # 二级分类名
    optInfos = scrapy.Field()   # 三级分类数组, 格式如下 [{id: 5294, priority: 1, opt_name: "早教益智"}, .....]


