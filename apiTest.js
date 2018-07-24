var request = require("request");
var sha1 = require('sha1');



var tmp = Date.parse( new Date() ).toString();
tmp = tmp.substr(0,10);  //时间戳（精确到秒）
var appSecret = 'd8096d5b3c9f';  //appSecret
var nonce = '8tgggergigwow323t23w'; //生成的随机数


var checksum = sha1(appSecret + nonce + tmp);

var options = { method: 'POST',
    url: 'https://api.netease.im/nimserver/user/create.action',
    headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            checksum: checksum,
            curtime: tmp,
            nonce: nonce,
            appkey: '34b421cf05779d2ddcfe1a1ae66035d1' },
    form: { accid: 'qqq', name: 'qqq' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(JSON.parse(body).info);
});

