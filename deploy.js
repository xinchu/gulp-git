import gutil from 'gulp-util';
import git from 'gulp-git';
import gitRemoteOriginUrl from  'git-remote-origin-url';
import del from 'del';

/**
 * about git
 * @returns {Promise}
 */
const deployPath = './deploy', delPath = './deploy/.git';
const errMessage = {
    del: '删除文件失败',
    getRemoteUrl: '获取git地址失败'
};
const notify = {
    build:   '打包编译中...',
    init:    '初始化git成功',
    setUrl:  '设置远端git remote url成功',
    branch:  '切换deploy分支成功',
    add:     'git add . 成功',
    commit:  'git commit 成功',
    push:    'git push 成功',
    success: '打包、编译、推送远端结束，祝您愉快=^_^='
};

/**
 * git init
 * @returns {Promise}
 */
const gitInit = ()=>{
    return new Promise((resolve, reject)=>{
        git.exec({args: 'init', cwd: deployPath},  (err, stdout)=> {
            if (err)  throw err;
            console.log(gutil.colors.green(notify.init));
            resolve();
        })
    })
};

/**
 * get remote url
 * @returns {Promise}
 */
const getRemoteUrl = ()=>{
    return new Promise((resolve, reject)=>{
        gitRemoteOriginUrl()
            .then(url => {
                console.log(gutil.colors.green('获取remote url 成功'));
                resolve(url);
            })
            .catch((e)=>{
                throw errMessage.getRemoteUrl;
            })
    })
};

/**
 * set git remote url
 * @param url
 * @returns {Promise}
 */
const setOriginUrl = (url)=>{
    return new Promise((resolve, reject)=>{
        git.exec({args: 'remote add origin ' + url
            , cwd: deployPath},  (err, stdout)=> {
            if (err)  throw err;
            console.log(gutil.colors.green(notify.setUrl));
            resolve();
        });
    })
};

/**
 * git checkout -b deploy
 * @returns {Promise}
 */
const checkoutBranch = ()=>{
    return new Promise((resolve, reject)=>{
        git.exec({args:'checkout -b deploy', cwd: deployPath},  (err, stdout) =>{
            if (err)  throw err;
            console.log(gutil.colors.green(notify.branch));
            resolve();
        })
    })
};

/**
 * git add
 * @returns {Promise}
 */
const gitAdd = ()=>{
    return new Promise((resolve, reject)=>{
        git.exec({args:'add .', cwd: deployPath},  (err, stdout)=>{
            if (err)  throw err;
            console.log(gutil.colors.green(notify.add));
            resolve();
        })
    })
};

/**
 * git commit
 * @returns {Promise}
 */
const gitCommit = ()=>{
    return  new Promise((resolve, reject)=>{
        let param = gutil.env.m, curTime = getTime();
        let message = param && param+'_'+ curTime || 'update_'+curTime;
        git.exec({args:'commit -m '+ message, cwd: deployPath},  (err, stdout)=>{
            if (err)  throw err;
            console.log(gutil.colors.green(notify.commit));
            resolve();
        })
    })
};

/**
 * git push
 * @returns {Promise}
 */
const gitPush = ()=>{
    return new Promise((resolve, reject)=>{
        git.exec({args:'push origin -f deploy', cwd: deployPath},  (err, stdout)=>{
            if (err)  throw err;
            console.log(gutil.colors.green(notify.push));
            resolve();
        })
    });
};

const getTime = ()=>{
    let date = new Date();
    let year = date.getFullYear(),
        month = (date.getMonth() + 1) <10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return '\''+year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second+'\'';
};


/**
 * del files
 * @returns {Promise}
 */
const delFiles = ()=>{
    del([delPath])
        .then(() => {
            console.log(gutil.colors.green(notify.build));
        })
        .catch(()=>{
            console.log(gutil.colors.red(errMessage.del));
        });
};

const deploy = ()=>{
    Promise
        .resolve()
        .then(gitInit)
        .then(getRemoteUrl)
        .then(setOriginUrl)
        .then(checkoutBranch)
        .then(gitAdd)
        .then(gitCommit)
        .then(gitPush)
        .then(()=>{
            console.log(gutil.colors.green(notify.success));
        })
        .catch((err)=>{
        });
};

export {
    delFiles,
    deploy
}