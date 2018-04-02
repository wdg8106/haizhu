// $(".navigate").html('<a href="http://'+window.location.host+'/'+city_name+'/roomlist.html#c='+$.hash("c")+'">嗨住'+cityzname+'租房</a>');
// $.hash("map",null);
// $.hash("zoom",null);
// var come = getParam("come") || '';//判断来源
var key = getParam("key");//搜索关键词
$(".input_box").val(key);//设置输入框内容

// 点击反馈
$(".feedback_btn").click(function(){
  $(".feedback_box").show();
  $("body").css({"height":"100%","overflow":"hidden"});
})
function isEmail(str){
  if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
  return true;
  else
  return false;
}
// textarea 聚焦
$(".feedback_main textarea").focus(function(){
  $(this).addClass("selected").removeClass("error");
  $(".ly_title").removeClass("error").text("留言");
});
// textarea 失去聚焦
$(".feedback_main textarea").blur(function(){
  var content = $("textarea").val();
  if (content == '') {
    $(this).removeClass("selected").addClass("error");
    $(".ly_title").addClass("error").text("你还没有留言哦");
  }else{
    $(this).removeClass("selected");
  };
});
//input 聚焦
$(".feedback_main input").focus(function(){
  $(this).addClass("selected").removeClass("error");
  $(".lx_title").removeClass("error").text("联系方式");
});
//input 失去聚焦
$(".feedback_main input").blur(function(){
  var contact = $(".feedback_main input").val();
  var isMobile=/^1[34578]\d{9}$/;//判断手机号是否填写正确
  if (!isMobile.test(contact) && !isEmail(contact)) {
    $(this).removeClass("selected").addClass("error");
    $(".lx_title").addClass("error").text("请填写正确的联系方式");
  }else{
    $(this).removeClass("selected");
  };
});
$("#send").click(function(){
    var contact = $(".feedback_main input").val();
    var content = $(".feedback_main textarea").val();
    var isMobile=/^1[34578]\d{9}$/;//判断手机号是否填写正确
    if (content == '') {
      $(".feedback_main textarea").removeClass("selected").addClass("error");
      $(".ly_title").addClass("error").text("你还没有留言哦");
    }else{
      if (!isMobile.test(contact) && !isEmail(contact)) {
        $(this).removeClass("selected").addClass("error");
        $(".lx_title").addClass("error").text("请填写正确的联系方式");
      }else{
        $.post(http+"postfeedback.html",{contact:contact,content:content,city_code:city_code},function(data){
          $(".common_succ").show().find("p").text("反馈成功");
          $(".feedback_main textarea").val('');
          $(".feedback_main input").val("");
          $(".feedback_box").fadeOut();
          setTimeout(function(){
            $(".common_succ").fadeOut();
          },2000)
        })
      };
    };
})
$(".feedback_box_close").click(function(){
  $(".feedback_box").hide();
  $("body").css({"height":"auto","overflow":"auto"});
});
$(".feedback_box").click(function(e){
  var target = $(e.target);
  if (target.closest(".feedback_main").length == 0) {
    $(".feedback_box").hide();
    $("body").css({"height":"auto","overflow":"auto"});
  };
})

function setval(){
  var value = $('.range-slider').val();
  $(".filter_condition").show();
  $(".condition_main span[data-money]").remove();
  $(".range em").removeClass("on");
  var val = value.split(",");
  var min = val[0];
  var max = val[1];
  if(max == '0' && min == '0'){
    $.hash("max",max);
    $.hash("min",min);
    money_max = 999999;
    money_min = 0;
    $("#min").html("0");
    $("#max").html("12000+");
    $(".range em").addClass("on");
    // 如果没有span则不显示
    if ($(".condition_main").find("span").length == '0') {
      $(".filter_condition").hide();
    };
  }else{
    if (max == "12000") {
      max = max + '+';
      $.hash("max",null);
      $.hash("min",min);
      money_max = 999999;
      money_min = min;
      if (money_min != '0') {
        $(".condition_main").append('<span data-money="1">'+money_min+'+<em></em></span>');
      }else{
        $(".range em").addClass("on");
        // 如果没有span则不显示
        if ($(".condition_main").find("span").length == '0') {
          $(".filter_condition").hide();
        };
      };
    }else{
      $.hash("max",max);
      $.hash("min",min);
      money_max = max;
      money_min = min;
      $(".condition_main").append('<span data-money="1">'+money_min+'-'+money_max+'<em></em></span>');
    };
    $("#min").html(min);
    $("#max").html(max);
  }
}