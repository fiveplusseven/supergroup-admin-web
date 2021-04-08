# API Doc
###  一些通用的错误码

``` golang
// Unrecognized APP
	Unrecognized = AppError{4000, "未知错误"}

	// ReqParamError 客户端错误
	ReqParamError       = AppError{4001, "请求参数错误"}
	ReqForbidden        = AppError{4003, "请求被拒绝"}
	ReqResourceNotExist = AppError{4004, "请求资源不存在"}

	// UnknownError 服务端错误
	UnknownError      = AppError{5000, "服务端未知错误"}
	Timeout           = AppError{5001, "服务超时"}
	ServerUnavailable = AppError{5005, "服务当前不可用"}
	// DbQueryError Common Server
	DbQueryError   = AppError{5001, "数据库查询错误"}
	DBSessionError = AppError{5001, "数据库事务错误"}
	// CacheRedisError Redis
	CacheRedisError       = AppError{5010, "REDIS 出错"}
	CacheKeyNotExistError = AppError{5011, "REDIS KEY 不存在"}

	// ========== APP ============== //

	// AppNotExists 业务
	AppNotExists = AppError{50001, "app 不存在"}

	// ========== User ============== //

	// AppUserError App User
	AppUserError = AppError{100000, "AppUserError"}

	// AuthAccessForbid AuthAccessForbid
	AuthAccessForbid     = AppError{4000, "没有访问权限"}
	AuthExpired          = AppError{4000, "令牌过期"}
	AuthTokenGenError    = AppError{4003, "无法生成签名"}
	AuthTokenInvalid     = AppError{4003, "无效签名 Invalid API token"}
	AuthTokenError       = AppError{4003, "API Token Error"}
	AuthUnknownScheme    = AppError{4003, "Unknown Auth scheme"}
	AuthNotExistError    = AppError{4003, "AuthNotExistError"}
	AuthTokenParseError  = AppError{4003, "AuthTokenParseError"}
	AuthTokenHeaderError = AppError{4003, "AuthTokenHeaderError"} // 不能分两段 scheme value
	
```

## oauth登录
### 1.1 用户登录
* 用户登录采用 mixin app 授权方式登录
* 当用户未登录或者token失效时，需要跳转到 mixin oauth 页面进行授权登录
* mixin 授权页面：
    * https://mixin-www.zeromesh.net/oauth/authorize?client_id=b7347ca4-186e-4e54-9db6-755a4ab0b5d4&scope=PROFILE:READ+PHONE:READ&response_type=code&return_to=
* 授权成功后会跳转至一个 callback页面(也就是机器人验证网址），需要开发者提供
* callback页面会带上授权后的code，然后拿这个code，调用后端接口获取登录token 

POST /v1/auth/mixin

request:
``` json
{
    "code":"9edc8487f361207fe33942901a7cb437a93b01f9e0cfe456c6d950bdc94f08ee"
}
```

response:
``` json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4NTc4OSIsImV4cCI6MTYxNzYwNjMwMywianRpIjoiYWY1Y2RjNzMtMTc2MS00YzVlLTlkMWYtOTMwOTAyM2RjMGYyIiwiaWF0IjoxNjE3MDAxNTAzLCJpc3MiOiIzMDAyMyIsIm1vZGUiOiJjbGllbnQiLCJ0eXAiOiJhcHB1c2VyIiwic2lkIjoiMjVlNmQ2Nzg1ZDE4NDRjMzgxNzRiNmZjOWVkNjg2MTAifQ.uXxz6Im6a70ZahAKSN_X86dqlxjX_576o_rJ7hcbEJM"
}
```

### 1.2 token
* 登录后，所有业务接口都要带上颁发的token
* api 授权验证采用 Bearer Token方式Authorization：
'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4NTc4OSIsImV4cCI6MTYxODQ1NDYzNiwianRpIjoiODNhNjE3ZTctYTgwOS00YzlkLTgxZjItYTE1Mjc0MmM3NzM5IiwiaWF0IjoxNjE3ODQ5ODM2LCJpc3MiOiIzMDAyMyIsInN1YiI6IjcwMDAxMDE3MTIiLCJtb2RlIjoiY2xpZW50IiwidHlwIjoiYXBwdXNlciIsIm9hcCI6Im1peGluIiwic2lkIjoiMjVlNmQ2Nzg1ZDE4NDRjMzgxNzRiNmZjOWVkNjg2MTAifQ.KhZhZdEuyc02V5Y7CcuqH9y99XUjmvL5LpSPmng7kQw' 

## 群管理 #1
### 2.1 群列表（带分页、搜索）
GET /v1/groups?start=0&limit=100&keyword=xxxx


| query参数   | 描述  |
|---------|---------------|
| start   | 分页参数，非必填，默认0，起始start是0  |
| limit   | 分页参数，非必填，默认20 |
| keyword | 搜索字段 支持群号、群名称 |

* 分页可以根据 start, limit 和返回的total 计算页码、可以总共页数等

response:
``` json
{
    "total": 5,
    "items": [
        {
            "id": "7000103163",
            "created_at": "2020-12-30T16:28:28.833719+08:00",
            "updated_at": "2020-12-30T16:28:28.833719+08:00",
            "client_id": "4ac2094b-442f-467c-b30c-2858b7156b10",
            "keystore_file": "keystores/keystore-7000103163.json",
            "status": 0,
            "name": "本地测试群2",
            "country_name": "cn"
        },
        {
            "id": "7000103417",
            "created_at": "2020-05-25T08:54:47+08:00",
            "updated_at": "2020-07-22T09:50:36.379072+08:00",
            "client_id": "2b72cd5d-a236-4fa5-af27-c3cb04ff2adb",
            "keystore_file": "keystores/keystore-7000103417.json",
            "status": 1,
            "name": "大佬测试群"
        },
        {
            "id": "7000101712",
            "created_at": "2020-05-25T08:29:11+08:00",
            "updated_at": "2020-07-22T09:50:34.322726+08:00",
            "client_id": "f52bd230-145a-4db5-ae47-8a74859ec2dc",
            "keystore_file": "keystores/keystore-7000101712.json",
            "status": 0,
            "name": "feicoin"
        },
        {
            "id": "7000103413",
            "created_at": "2020-05-25T08:54:47+08:00",
            "updated_at": "2020-08-05T22:43:22.125042+08:00",
            "client_id": "2827d81f-6ae0-4842-b92f-6576afe36863",
            "keystore_file": "keystores/keystore-7000103413.json",
            "status": 1,
            "name": "dev tool"
        },
        {
            "id": "7000103418",
            "created_at": "2020-05-25T08:54:47+08:00",
            "updated_at": "2020-07-22T09:50:33.462542+08:00",
            "client_id": "d41d106e-6d8e-43ae-a636-5127faffc479",
            "keystore_file": "keystores/keystore-7000103418.json",
            "status": 0,
            "name": "韭菜收割群"
        }
    ]
}
```

### 2.2 获取群信息
GET /v1/groups/:id

response:
``` json
{
    "id": "7000103417",
    "created_at": "2020-05-25T08:54:47+08:00",
    "updated_at": "2020-07-22T09:50:36.379072+08:00",
    "client_id": "2b72cd5d-a236-4fa5-af27-c3cb04ff2adb",
    "keystore_file": "keystores/keystore-7000103417.json",
    "status": 1,
    "name": "大佬测试群"
}
```

### 2.3 创建群
> 暂时无

### 2.4 更新群
PATCH /v1/groups/:id

request:
``` json
{
    "name":"大佬测试群2",
    "status":1
}
```

response:
``` json
{
    "id": "7000103417",
    "created_at": "2020-05-25T08:54:47+08:00",
    "updated_at": "2021-04-08T14:14:56.684329+08:00",
    "client_id": "2b72cd5d-a236-4fa5-af27-c3cb04ff2adb",
    "keystore_file": "keystores/keystore-7000103417.json",
    "status": 1,
    "name": "大佬测试群2"
}
```

### 2.5 获取群用户列表（带分页、搜索）
GET /v1/groups/:group_id/users?start=0&limit=100&keyword=xxxx


| query参数   | 描述  |
|---------|---------------|
| start   | 分页参数，非必填，默认0，起始start是0  |
| limit   | 分页参数，非必填，默认20 |
| keyword | 搜索字段 用户昵称、mixin id |

* 分页可以根据 start, limit 和返回的total 计算页码、可以总共页数等

response:
``` json
{
    "total": 14,
    "items": [
        {
            "user_id": "88cc2ec5-bdbe-4278-ad1d-063b3290712f",
            "group_id": "7000103413",
            "version": 8,
            "full_name": "OdysseyerR@Fox.ONE",
            "bio": "",
            "identity_number": 39204791,
            "avatar_url": "https://mixin-images.zeromesh.net/SEk0uAwrfiX3VlPCONxE9kuObyJ2Qw1pG5ALKSgO3B4pbJn4Ji4J6Dvm340WT5JdNZ2FGdMIkdJKD81bWp7sjw=s256",
            "state": "paid",
            "blocked": 0,
            "active_at": "2021-04-08T14:23:30.864577+08:00",
            "subscribed_at": "2020-12-07T19:07:43.097587+08:00",
            "expired_at": "2021-12-07T19:07:43.097587+08:00",
            "created_at": "2020-12-07T19:00:47.451252+08:00",
            "uiam_id": 85852,
            "joined_at": "2020-12-07T19:07:43.097587+08:00",
            "divided_to": "7000101712",
            "divided_at": "2020-12-07T19:07:45.912276+08:00"
        },
        {
            "user_id": "5467e9ea-cd04-4b91-b84c-93a0c87cb6a4",
            "group_id": "7000103413",
            "version": 43,
            "full_name": "divisey",
            "bio": "",
            "identity_number": 37176426,
            "avatar_url": "https://mixin-images.zeromesh.net/Y1tgxUK6EyJalixzHoUrzpOLHMiJRTOe-xjTwSsd_GPOJqnEKAzn-dA3ghliJB_m_4C9gjrtXXvntuTIS4EeptQ=s256",
            "state": "paid",
            "blocked": 0,
            "active_at": "2021-04-08T14:22:22.32045+08:00",
            "subscribed_at": "2020-12-09T17:45:43.004094+08:00",
            "expired_at": "2021-12-09T17:45:43.004094+08:00",
            "created_at": "2020-12-09T17:38:58.836504+08:00",
            "uiam_id": 30009,
            "joined_at": "2020-12-09T17:45:43.004094+08:00",
            "divided_to": "7000101712",
            "divided_at": "2020-12-09T17:45:46.388693+08:00"
        }
    ]
}
```


### 2.6 群发消息
POST /v1/groups/:group_id/send_message


| body 参数     | 描述                                                    |
|-------------|-------------------------------------------------------|
| reciever_id | 接收消息的用户id数组                                           |
| message     | 消息文本                                                  |
| broadcast   | 是否群发，当true时，reciever_id可以为空。 当false时，reciever_id 至少一个 |


request:
``` json
{
    "reciever_id":["a30bf8dd-e87f-4ff7-9da8-4abad6f3234e"],
    "message":"hi",
    "broadcast":true
}
```

response:
``` json
{
    "result": "ok"
}
```

### 2.7 群开启
POST /v1/groups/:id/start

request:
``` json
```

response:
``` json
{
    "id": "7000103417",
    "created_at": "2020-05-25T08:54:47+08:00",
    "updated_at": "2021-04-08T14:14:56.684329+08:00",
    "client_id": "2b72cd5d-a236-4fa5-af27-c3cb04ff2adb",
    "keystore_file": "keystores/keystore-7000103417.json",
    "status": 1,
    "name": "大佬测试群2"
}
```


### 2.8 群关闭
POST /v1/groups/:id/stop

request:
``` json
{
}
```

response:
``` json
{
    "id": "7000103417",
    "created_at": "2020-05-25T08:54:47+08:00",
    "updated_at": "2021-04-08T14:14:56.684329+08:00",
    "client_id": "2b72cd5d-a236-4fa5-af27-c3cb04ff2adb",
    "keystore_file": "keystores/keystore-7000103417.json",
    "status": 0,
    "name": "大佬测试群2"
}
```



## 3. 财务管理
### 3.1 获取cny profit records
GET /v1/profits/cny_records?state=init&start=0&limit=100&keyword=135xxxxx

| query参数   | 描述  |
|---------|---------------|
| start   | 分页参数，非必填，默认0，起始start是0  |
| limit   | 分页参数，非必填，默认20 |
| state | 状态字段 "init" 未发放， "error" 发放错误, "claimed" 已发放 |
| keyword | 搜索字段 支持用户姓名 手机号 |

* 分页可以根据 start, limit 和返回的total 计算页码、可以总共页数等

response:
``` json
{
    "total": 4,
    "items": [
        {
            "user_id": "42ef73da-9e7a-4abf-9708-2d44a1618fa9",
            "date": "202101",
            "group_id": "7000103413",
            "category": "Inviter",
            "amount": "0.108",
            "is_kyced": true,
            "kyc_authorized": false,
            "real_name": "张三",
            "id_type": "",
            "id_no": "",
            "phone_code": "86",
            "phone_number": "173xxxxx",
            "state": "error",
            "description": "bank account not found",
            "serial_id": "912db81a-612c-5927-96c9-82861e7ac40b",
            "created_at": "2021-03-20T17:11:11.903827+08:00",
            "updated_at": "2021-03-25T19:04:46.361013+08:00"
        },
        {
            "user_id": "42ef73da-9e7a-4abf-9708-2d44a1618fa9",
            "date": "202102",
            "group_id": "7000103413",
            "category": "Inviter",
            "amount": "0.27",
            "is_kyced": true,
            "kyc_authorized": false,
            "real_name": "李四",
            "id_type": "",
            "id_no": "",
            "phone_code": "86",
            "phone_number": "173xxxxx",
            "state": "error",
            "description": "bank account not found",
            "serial_id": "ad214d18-5902-58a3-9ef1-a1b718fea79b",
            "created_at": "2021-03-20T17:11:31.732413+08:00",
            "updated_at": "2021-03-25T19:04:46.366037+08:00"
        }
    ]
}
```

### 3.2 导出cny profit records csv
POST /v1/profits/cny_records/download 

> 下载导出一个csv 文件

request:
``` curl
curl --location --request POST 'localhost:7000//v1/profits/cny_records/download' \
--header 'group_id: 7000103413' \
--header 'Authorization: Basic NDY5ZDFiODE1Y2FlNGY4MDk5Nzk3MzVlMGVkNGE5Mzc6NDhkMTJmNzc5NDRhNGYwMjhmYzA5M2VmYWRjMDExZTk='
```

csv:
``` csv
流水号,真实姓名,收款方账户名称(必填),开户银行(选填),开户行全称(选填),身份证(必填),收款方账号(必填),实发金额(必填),实名手机号(必填),款项属性(选填),打款结果
2f808594-e0f8-543f-898a-4d5de9105b63,徐辉,徐辉,招商银行,上海张江支行,31022519888888888,000000000000000,4937.8265,1111111111,2021年02月群7000103413群主收入,
6adc6171-6240-556f-b411-1dafc31b97a0,徐辉,徐辉,招商银行,上海张江支行,31022519888888888,000000000000000,0.0675,13511111111,2021年02月群7000103413鼓励金,

```


### 3.3 反馈打款记录 cny profit records feedback
POST /v1/profits/cny_records/feedback 

> 上传一个csv 文件

request:
``` curl
curl --location --request POST 'localhost:7000/v1/profits/cny_records/feedback' \
--header 'group_id: 7000103413' \
--header 'Authorization: Basic NDY5ZDFiODE1Y2FlNGY4MDk5Nzk3MzVlMGVkNGE5Mzc6NDhkMTJmNzc5NDRhNGYwMjhmYzA5M2VmYWRjMDExZTk=' \
--form 'file=@"/Users/xuhui/Documents/cny_profit_record.csv"'
```

response:
``` json
{
    "result":"ok"
}

```

### 3.3 设置 cny profit record result
PATCH /v1/cny_records/:serial_id/set_result

| 参数   | 描述  |
|---------|---------------|
| serial_id   | 流水号 path参数  |
| state | 状态字段 "error" 发放错误, "claimed" 已发放 |
| description | 描述 |




request:
``` json
{
    "state":"claimed",
    "description":"已发放"
}
```

resonse:
``` json
{
    "user_id": "a30bf8dd-e87f-4ff7-9da8-4abad6f3234e",
    "date": "202102",
    "group_id": "7000103413",
    "category": "Group",
    "amount": "4937.8265",
    "is_kyced": true,
    "kyc_authorized": true,
    "real_name": "徐辉",
    "id_type": "idcard",
    "id_no": "efKMQa8ESqm+klvU3TWWN4CS4HbMgqAkrmPHE48MdXo=",
    "phone_code": "86",
    "phone_number": "1352xxxxxx",
    "issuer": "unionpay",
    "issuer_bank_name": "招商银行",
    "issuer_bank_symbol": "CMB",
    "issuer_branch_bank_name": "招商银行",
    "card_holder_name": "徐辉",
    "card_number": "000000000000000",
    "state": "claimed",
    "description": "银行卡错误",
    "serial_id": "2f808594-e0f8-543f-898a-4d5de9105b63",
    "created_at": "2021-03-20T17:11:12.49169+08:00",
    "updated_at": "2021-04-08T14:38:23.672484+08:00"
}
```
