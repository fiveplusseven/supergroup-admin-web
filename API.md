# API Doc

## 1. 用户
### 1.1 用户登录
POST /v1/auth/login

request:
``` json
{
    "phone_number":"13524119644",
    "password":"123456"
}
```

response:
``` json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4NTc4OSIsImV4cCI6MTYxNzYwNjMwMywianRpIjoiYWY1Y2RjNzMtMTc2MS00YzVlLTlkMWYtOTMwOTAyM2RjMGYyIiwiaWF0IjoxNjE3MDAxNTAzLCJpc3MiOiIzMDAyMyIsIm1vZGUiOiJjbGllbnQiLCJ0eXAiOiJhcHB1c2VyIiwic2lkIjoiMjVlNmQ2Nzg1ZDE4NDRjMzgxNzRiNmZjOWVkNjg2MTAifQ.uXxz6Im6a70ZahAKSN_X86dqlxjX_576o_rJ7hcbEJM"
}
```

## 2. 群管理
### 2.1 群列表
GET /v1/groups?start=0&limit=100&keyword=xxxx

### 2.2 获取群信息
GET /v1/groups/:id

### 2.3 创建群
POST /v1/groups

### 2.4 更新群
PATCH /v1/groups/:id

### 2.5 群开启
POST /v1/groups/:id/start

### 2.6 群关闭
POST /v1/groups/:id/stop

## 3. 用户管理
### 3.1 用户列表
GET /v1/groups/:id/users?start=0&limit=100

### 3.2 用户信息
GET /v1/groups/:id/users/:user_id

### 3.3 用户银行卡信息列表
GET /v1/users/:user_id/bank_accounts

### 3.3 用户银行卡信息
GET /v1/users/:user_id/bank_accounts/:bid

## 4 运营管理
### 4.1 优惠券发放
POST /v1/coupons/send

### 4.2 邀请码
......

### 4.3 直播管理
......


## 5. 财务管理
### 5.1 获取cny profit records
GET /v1/profits/cny_records?state=init&start=0&limit=100
* state 状态： init/cliamed/error
* start/limit 分页参数

response:
``` json
{
    "total": 2,
    "items": [
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
            "id_no": "efKMQa8ESqm+klvU3TWWN4CS4HbMgqAkXXPHE48MdXo=",
            "phone_code": "86",
            "phone_number": "1111111111",
            "issuer": "unionpay",
            "issuer_bank_name": "招商银行",
            "issuer_bank_symbol": "CMB",
            "issuer_branch_bank_name": "招商银行",
            "card_holder_name": "徐辉",
            "card_number": "000000000000000",
            "state": "init",
            "description": "身份证有误",
            "serial_id": "2f808594-e0f8-543f-898a-4d5de9105b63",
            "created_at": "2021-03-20T17:11:12.49169+08:00",
            "updated_at": "2021-03-25T19:04:46.433386+08:00"
        },
        {
            "user_id": "a30bf8dd-e87f-4ff7-9da8-4abad6f3234e",
            "date": "202102",
            "group_id": "7000103413",
            "category": "Inviter",
            "amount": "0.0675",
            "is_kyced": true,
            "kyc_authorized": true,
            "real_name": "徐辉",
            "id_type": "idcard",
            "id_no": "efKMQa8ESqm+klvU3TWWN4CS4HbMgqAkrmPHE4XXXXo=",
            "phone_code": "86",
            "phone_number": "111111111111",
            "issuer": "unionpay",
            "issuer_bank_name": "招商银行",
            "issuer_bank_symbol": "CMB",
            "issuer_branch_bank_name": "招商银行",
            "card_holder_name": "徐辉",
            "card_number": "000000000000000",
            "state": "init",
            "description": "手机号不对",
            "serial_id": "6adc6171-6240-556f-b411-1dafc31b97a0",
            "created_at": "2021-03-20T17:11:12.829575+08:00",
            "updated_at": "2021-03-25T19:04:46.439067+08:00"
        }
    ]
}
```

### 5.2 导出cny profit records csv
POST /v1/profits/cny_records/download 
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


### 5.3 反馈打款记录 cny profit records feedback
POST /v1/profits/cny_records/feedback 
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
