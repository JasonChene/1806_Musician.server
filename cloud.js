var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
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

//验证用户登录
function verifyLogin(req, res, cb) {
    if (!req.currentUser) {
        return res.success({status: false, message: '用户未登录'})
    }
    var currentUser = req.currentUser;
    return cb(currentUser);
}



