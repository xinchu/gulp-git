本文档只针对 fancyui 生成的项目
> * 安装npm包，执行命令   npm i --save-dev gulp-git git-remote-origin-url del gulp-sequence
> * 将deploy.js 放在项目根目录
> * 修改gulpfile.babel.js文件，增加如下内容

    ```javascript
	import gulpSequence from 'gulp-sequence';
	import {delFiles, deploy} from './git';
	```

	```javascript
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
	```