import json
import requests

# 接口测试

data = json.dumps({"opt_id": 123, "opt_name": "字符串"})
res = requests.post(url="http://39.107.59.59:8000/anti_content", data=data,
                    headers={"contentType": 'application/json'})
if res.status_code == 200:
    anti_content = res.json().get("anti_content")
    print(anti_content)


pass
