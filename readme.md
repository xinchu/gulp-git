本文档只针对 fancyui ( http://www.fancyui.org ） 生成的项目
> * 安装npm包，执行命令   npm i --save-dev gulp-git git-remote-origin-url del gulp-sequence
> * 将deploy.js 放在项目根目录
> * 修改gulpfile.babel.js文件，增加如下内容
> * 如果你的webpack打包路径不是deploy, 请重新指定	

	import gulpSequence from 'gulp-sequence';
	import {delFiles, deploy} from './git';

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
