本文档只针对 fancyui 生成的项目
> * 安装npm包，执行命令   npm i --save-dev gulp-git git-remote-origin-url del gulp-sequence
> * 将deploy 放在项目根目录
> * 修改gulpfile.babel.js文件如下
    > * 在头部引入
    ```javascript
    /**
	* 发版部分  start
	*/
	import gulpSequence from 'gulp-sequence';
	import {delFiles, deploy} from './git';
	/**
	* 发版部分  end
	*/
	```

	> * 在任务 gulp.task('default', ['serve']);前加入
	```javascript
	/**
	 * 发版部分  start
	 */
	gulp.task('del', ()=>{
	    delFiles();
	});

	gulp.task('git:work', ()=>{
	    deploy();
	});

	gulp.task('deploy',gulpSequence(
	    ['del'],
	    'webpack',
	    ['git:work']
	));
	/**
	 * 发版部分  end
	 */
	 ```