/**
 * Frilend.js 1.0.0 | Frilend.org/LICENSE.md
 */
(function(global, undefined) {

//避免Frilend.js多次加载引起的冲突
if (global.Frilend || global.F ) {
  return
}

var Frilend = global.Frilend =global.F= {
  // 当前版本
  version: "1.0.0",
  //默认配置参数
  options : {
    //自定义的默认基准路径
    base : null
  },
  isArray :function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
  },
  isObject : function(obj){
    if(obj instanceof Object) 
      return true
    else 
      return false
  },
  loadcss : function(href,callback){
    var docHead = document.getElementsByTagName('head')[0]|| document.documentElement;
    var style = document.createElement('link');
    var timer=null;
    this.options.base ? href=this.options.base+"/"+href : null ;
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', href);
    docHead.appendChild(style);
    callback ?  callback(): null;
    return style;
  },
  loadjs : function(src,callback,opts){
    var docHead = document.getElementsByTagName('head')[0]|| document.documentElement;
    var script = document.createElement('script');
    var timer=null;
    this.options.base ? src=this.options.base+"/"+src : null ;
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    if( this.isObject(opts) && opts.async!==undefined){
      script.setAttribute('async', opts.async);
    }
    docHead.appendChild(script);
    callback ?  callback(): null;
    return script;
  },
  _autoLoad : function(value){
    if(value.indexOf(".css")>-1) 
      this.loadcss(value);
    else 
      this.loadjs(value); 
  },
  use : function(ids, callback) {
    if(this.isArray(ids)){
      for(var i=0,l=ids.length;i<l;i++){
        var value=ids[i];
        this._autoLoad(value)
      }
    }else{
      var value=ids;
      this._autoLoad(value)
    }
    callback ?  callback(): null;
  }
}

})(this);

