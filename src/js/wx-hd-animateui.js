//定义动画对象animateUi
;(function(win,undefined){

var animateUi={};
animateUi={
  element : $("#swiper"),
  wrap : $("#swiper").find(".swiper-wrapper"),
  //转化JSON字符串为JSON格式
  parseOptions : function(string) {
    if ($.isPlainObject(string)) 
      return string;
    var start = (string ? string.indexOf('{') : -1);
    var options = {};
    if (start != -1) {
      try {
        options = (new Function('',
          'var json = ' + string.substr(start) +
          '; return JSON.parse(JSON.stringify(json));'))();
      } catch (e) {
      }
    }
    return options;
  },
  //当转到新页时执行CSS3动画
  onChange : function(){
    var g=this
      , current=g.wrap.find(".swiper-page").filter(".swiper-slide-active")
      , items=current.find(".animate-item");

    this.autoCss3Ainmate(items);
    current.siblings().find(".animate-item").hide();
  },
  //自动执行CSS3动画函数
  autoCss3Ainmate : function(ele,options){
    var g=this
      , element=$(ele);
    element.each(function(){

      g.animateTimer=null;
      g.animateTimer2=null;

      var self=$(this) 
        , animateData=g.parseOptions( self.data("sx-animate") )
        , animateName=animateData.animation
        , infinite=animateData.infinite==true ? " infinite" : " "
        , delay=animateData.delay

        , animateData2=g.parseOptions( self.data("sx-animate-two") )
        , animateName2=animateData2.animation
        , infinite2=animateData2.infinite==true ? " infinite" : " "
        , delay2=animateData2.delay;

      self.hide();

      var animateNameStr='animated '+animateName+" "+ infinite ;
      var animateNameStr2='animated '+animateName2+" "+ infinite2 ;
      if(self.data("sx-animate")!==undefined){
        if(delay!==undefined){
          window.clearTimeout(g.animateTimer);
          g.animateTimer=window.setTimeout(function(){

            self.hasClass(animateName2) ?  self.removeClass(animateName2) :  (self.hasClass("infinite") ? self.removeClass("infinite") : null )
            
            self.removeClass(animateNameStr).addClass(animateNameStr).show().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              self.removeClass(animateNameStr);
            })
          },delay)
        }else{
          self.hasClass(animateName2) ?  self.removeClass(animateName2) :  (self.hasClass("infinite") ? self.removeClass("infinite") : null )
            
          self.removeClass(animateNameStr).addClass(animateNameStr).show().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            self.removeClass(animateNameStr);
          })
        }
      }
      if(self.data("sx-animate-two")!==undefined){
        if(delay2!==undefined){
          window.clearTimeout(g.animateTimer2);
          g.animateTimer2=window.setTimeout(function(){

            self.hasClass(animateName) ?  self.removeClass(animateName) :  (self.hasClass("infinite") ? self.removeClass("infinite") : null )

            self.removeClass(animateNameStr2).addClass(animateNameStr2).show().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              self.removeClass(animateNameStr2);
            })
          },delay2+680)
        }else{
          window.clearTimeout(g.animateTimer2); 
          g.animateTimer2=window.setTimeout(function(){

            self.hasClass(animateName) ?  self.removeClass(animateName) :  (self.hasClass("infinite") ? self.removeClass("infinite") : null )

            self.removeClass(animateNameStr2).addClass(animateNameStr2).show().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              self.removeClass(animateNameStr2);
            })
          },delay+680)
        }

      }
    })
  },
  //初始化滑动动画框架
  _initSwiper : function(){
    var g=this;
    var pages=$(".page");
    var slideTpl="";
    var pageLen=pages.length;
    pages.hide();
    for(var i=0,l=pages.length;i<l;i++){
      slideTpl+='<div class="swiper-slide swiper-page"><div class="page" id="'+pages.eq(i)[0].id+'">'+pages.eq(i).html()+'</div></div>';
    }
    g.wrap.html(slideTpl);
  }
}

return win.animateUi=animateUi;

})(window)


/////////////////////////////////////////
$(function(){

    // 初始化swiper
    animateUi._initSwiper();

    //gif动画    
    window.clearTimeout(timerGif);
    var timerGif=window.setTimeout(function(){
      $("#gif-img").fadeOut();
    },3000)


    //启用swiper
    window.swiper = new Swiper('.swiper-container', {
      //pagination: '.swiper-pagination',
      //paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      direction: 'vertical',
      //autoplay:true,
      //speed :8000,
      loop:false,
      runCallbacksOnInit : true,
      onInit:function(swiper, event){
        $("canvas").fadeIn("fast");
        animateUi.onChange();
      },
      onSlideChangeEnd:function(swiper, event){
        //特殊处理气泡
        var current=$(".swiper-page").filter(".swiper-slide-active");
        var btnNext=$("#swiper .swiper-button-next");
        if(current.find(".page").attr("id")=="p-1"){
          $("#canvas").fadeIn("fast");
        }else{
          $("#canvas").fadeOut("fast"); 
        }
/*        
        btnNext.addClass("animated").removeClass("fadeInUp").addClass("fadeInUp infinite").show().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          btnNext.removeClass("fadeInUp");
        })  
*/

        if(current.find(".page").attr("id")=="p-3"){
          btnNext.hide();
        }else{
          btnNext.show();
        }
        animateUi.onChange();
      }
    });

})