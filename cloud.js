var AV = require('leanengine');

var request = require("request");
var sha1 = require('sha1');


/**
 * 一个简单的云代码方法
 */

//cms端设置用户角色
AV.Cloud.define('setRole', function(request, res) {

    var userId = request.params.userId;  //参数－添加用户的id
    var role = request.params.role;　//参数－要设置的角色teacher或student
    var nowRole;

    verifyLogin(request, res, function (currentUser) {

        currentUser.getRoles().then(function (value) {
            var admins = [];
            for(var i=0;i<value.length;i++){
                if(value[i].attributes.name === 'superAdmin'){
                    admins.push(value[i].attributes.name);
                }
            }
            if(admins.length != 0){
                console.log('该用户是admin!');

                var update = AV.Object.createWithoutData('_User', userId);
                update.set('mobilePhoneVerified', true);
                update.save().then(function (value) {

                    if(role === 'teacher'){
                        nowRole = AV.Object.createWithoutData('_Role', '5b3c4536756571003d5747d1');
                    }else if(role === 'student'){
                        nowRole = AV.Object.createWithoutData('_Role', '5b3c452ad50eee003127fe6b');
                    }
                    nowRole.getUsers().add(value);
                    nowRole.save().then(function (data) {
                        console.log('设置用户角色成功...');
                        return res.success({status:true, data:'设置用户角色成功...'});
                    }, function (reason) {
                        console.log('设置用户角色失败!', reason)
                    })
                }, function (reason) {
                    console.log('更新手机号验证字段失败...', reason);
                });

            }else {
                console.log('该用户权限不够');
                res.success({status: false, data: '该用户权限不够'});
            }
        });
    });
});


//移动端设置用户角色
AV.Cloud.define('mobileSetRole', function (request, res) {

    var role = request.params.role; //leancloud创建的角色
    var accid = request.params.accid; //网易云通信id
    var nowRole;
    //验证注册用户登录
    verifyLogin(request, res, function (currentUser) {
        currentUser.getRoles().then(function (roles) {

            if(roles.length == 0){
                //注册行为
                console.log('注册行为');
                if(role === 'teacher'){
                    nowRole = AV.Object.createWithoutData('_Role', '5b3c4536756571003d5747d1');
                }else if(role === 'student'){
                    nowRole = AV.Object.createWithoutData('_Role', '5b3c452ad50eee003127fe6b');
                }
                nowRole.getUsers().add(currentUser);
                nowRole.save().then(function (value) {
                    console.log('设置用户角色成功');
                    //这里开始注册网易云通信id
                    return creatWYUser(res, accid);
                }, function (reason) {
                    console.log('设置用户角色失败　' + reason);
                    return res.success({status: 400, data: '设置用户角色失败' + reason})
                })
            }else {
                //登录行为
                console.log('登录行为');
                return res.success({status: 201, data: '这是一次登录行为'});
            }
        });
    })
});


function creatWYUser(res, accid) {

    var tmp = Date.parse( new Date() ).toString();
    tmp = tmp.substr(0,10);  //时间戳（精确到秒）
    var appSecret = 'd8096d5b3c9f';  //appSecret
    var nonce = '8tgggergigwow323t23w'; //生成的随机数
    var checksum = sha1(appSecret + nonce + tmp);　//sha1求哈希值

    var options = { method: 'POST',
        url: 'https://api.netease.im/nimserver/user/create.action',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                checksum: checksum,
                curtime: tmp,
                nonce: nonce,
                appkey: '34b421cf05779d2ddcfe1a1ae66035d1' },  //appkey
        form: { accid: accid, name: accid } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return res.success({status: 200, data: JSON.parse(body).info});
    });
}

//验证用户登录
function verifyLogin(req, res, cb) {
    if (!req.currentUser) {
        return res.success({status: false, message: '用户未登录'})
    }
    var currentUser = req.currentUser;
    return cb(currentUser);
}



