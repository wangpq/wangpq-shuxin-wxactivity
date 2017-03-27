/**********简易音乐盒子**********/
$(function(){
  var audioBox=$(".audio-box")
    , ai=audioBox.find("i")
    , audio=$("audio")[0];
  if (!audio.paused) audio.play();
  audioBox.off(".audio");
  audioBox.on("click.audio",function(){
    var self=$(this);
    if (audio.paused){  
      audio.play();
      self.addClass("play-audio");
      ai.addClass("rotate"); 
    }else{
      audio.pause(); 
      self.removeClass("play-audio");
      ai.removeClass("rotate");
    }
  })
  window.setTimeout(function(){
    audioBox.trigger("click");
  },800)
})
