var _rootPath = (function () {
    var path = location.pathname;

    if(path.indexOf('/') == 0) {
    	path = path.substring(1);
    }
    
    return '/' + path.split('/')[0];
}());

// 前端开发的目录
var _basePath = _rootPath + '/managepage';

var SrcBoot = {
	// 获取资源全路径
	getPath: function(path) {
		// 全路径
       	if (/^(http|https|ftp)/g.test(path)) {
            return path;
        }

		if(path.indexOf('_test') != -1 && !this.debug) {
			return false;
		}

		// 是否是相对路径
		var isRelative = path.indexOf('./') != -1 || path.indexOf('../') != -1;

		path = (isRelative ? '' :  (_basePath + '/')) + path;
	
		return path;
	},

	getExt: function(path) {
		if(path.indexOf('?') != -1) {
			path = path.split('?')[0];
		}

		var dotPos = path.lastIndexOf('.'),
			ext = path.substring(dotPos + 1);

		return ext;
	},

	// 批量输出css|js
	output: function(arr) {
		var i = 0, 
			len = arr.length,
			path,
			ext;

		for(; i < len; i++) {
			path = arr[i];

			if(path === false) continue;

			ext = this.getExt(path);
			if(ext == 'js') {
				document.writeln('<script src="' + path + '"></sc' + 'ript>');
			} else {
				document.writeln('<link rel="stylesheet" href="' + path + '">');
			}
		}
	}
};



