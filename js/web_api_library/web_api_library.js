

$(function(){
    
  //////   library information get (name & post_code)   ////////////////////
  
  $("#btn_search").on("click",function(){
      
      var beforeURL = "http://api.calil.jp/library?appkey=";
      var myKey = "{f0d8e57f777d7f6c3c9512e94ea6a699}";
      var afterKey = "&pref=";
      var prefecture = $("#pre").val();
      var afterURL ="&format=json&callback=";
      var limit = "&limit=";
      var limitNumber = 10;
      
      var allURL = beforeURL+myKey+afterKey+prefecture+afterURL;

      $.ajax({
      
        url: allURL,
        dataType:"jsonp",

      }).done(function(data){
      
        var number_of_library = data.length;

        for(var i=0; i<=number_of_library-1; i++ ){
          $(".library_name_area").append('<p class="library_name" id=p' +i+ '>' + data[i]['formal'] + '</p>');
          $("#Data_save").data("URL_p"+i , data[i]["url_pc"]);
          $("#Data_save").data("postal_code_p"+i , data[i]["post"]);
        };
        
        get_library_link();
        get_library_post_code();
        get_ajax_post_code();
        reload_func();
        smart_phone_touch_func_jquery_ver();
        
    });

    
    });
  
  
  function get_library_link(){
    
    $(".library_name").click(function(){
      $(".link").remove();
      $(".map_link_area").append('<p><a class="link" href='+$("#Data_save").data("URL_"+$(this).attr("id"))+' target="_blank" title="official site">LINK</a><p>');
    });
    
    return;
    
  };
  
  
  function get_library_post_code(){
    
    $(".library_name").click(function(){
      
      var post_code = $("#Data_save").data("postal_code_" + $(this).attr("id"));
      
    });
    
    return;
    
  };
  
  
  function get_ajax_post_code (){
    
    $(".library_name").click(function(){
      
      var post_code = $("#Data_save").data("postal_code_" + $(this).attr("id"));
      var after_URL = "https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=";
      var before_URL = "&appid=dj00aiZpPTFXV2tqaUpEQ1FWTCZzPWNvbnN1bWVyc2VjcmV0Jng9YzU-&output=json";
      
      $.ajax({
        
        url:after_URL+post_code+before_URL,
        type : 'get',
        crossDomain : true,
        dataType: "jsonp",
        
      }).done(function(data){
        
        $("#Data_save").data("latitude", data["Feature"][0]["Geometry"]["Coordinates"].slice(13,24));  // ido
        $("#Data_save").data("longitude", data["Feature"][0]["Geometry"]["Coordinates"].slice(0,12));  // keido
        
        library_link_fadeIn();
        
        yahoo_map();
        
        });
    
    });
    
    return;
    
  };
  
  
  ///////   smart phone touch function jQuery ver   ////////////////
  
  function smart_phone_touch_func_jquery_ver(){
    
    ///////////   library_name   ////////////
    $(".library_name").on("touchstart",function(){
      $(this).css({
        fontWeight: "bold",
        color: "rgba(65,105,225,0.8)",
      });
    });
    
    $(".library_name").on("touchmove",function(){
      $(this).css({
        fontWeight: "bold",
        color: "rgba(65,105,225,0.8)",
      });
    });
    
    $(".library_name").on("touchend",function(){
      $(this).css({
        fontWeight: "normal",
        color: "rgba(0,0,0,0.7)",
      });
    });
    
    //////////   link   ////////////////
    $(".link").on("touchstart",function(){
      console.log("OK");
      $(this).css({
        color: "rgba(135,206,250,1)",
        backgroundColor: "rgba(255,255,0,0.8)",
        fontWeight: "bold",
      });
    });
    
    $(".link").on("touchmove",function(){
      console.log("OKOK");
      $(this).css({
        color: "rgba(135,206,250,1)",
        backgroundColor: "rgba(255,255,0,0.8)",
        fontWeight: "bold",
      });
    });
    
    $(".link").on("touchend",function(){
      console.log("OKX3");
      $(this).css({
        color: "rgba(255,255,0,0.8)",
        backgroundColor: "rgba(135,206,250,0.8)",
        fontWeight: "normal",
      });
    });
    
    
    return;
    
  };
  
  
  
  
  });

library_link_fadeOut();
select_hover_func();
smart_phone_touch_func();





///////   javascript function   //////////

  /////   library&link fadeIn fadeOut   //////////////

function library_link_fadeIn(){
  
  var grayLayer = document.getElementById("grayLayer");
  grayLayer.style.display = "block";
  
  var map_link_area = document.getElementsByClassName("map_link_area");
  var first_map_link_area = map_link_area[0];
  first_map_link_area.style.display = "block";
  
  var map = document.getElementById("map");
  map.style.display = "block";
  
  return;

};

function library_link_fadeOut(){
  
  var btn_delete = document.getElementById("delete");
  
  btn_delete.addEventListener("click",function(){
    var grayLayer = document.getElementById("grayLayer");
    grayLayer.style.display = "none";
    
    var map_link_area = document.getElementsByClassName("map_link_area");
    var first_map_link_area = map_link_area[0];
    first_map_link_area.style.display = "none";
  });
  
  return;
  
};

//////////   yahoo_map function   //////////////
var ymap = new Y.Map("map",{
  configure : {
    doubleClickZoom : true,
    scrollWheelZoom : true,
    singleClickPan : true
  }
  });

var mark = new Y.CenterMarkControl();
var scale = new Y.ScaleControl();
ymap.addControl(mark);
ymap.addControl(scale);



function yahoo_map (){
  
  var Lat = $("#Data_save").data("latitude");
  var Lng = $("#Data_save").data("longitude");
  
  console.log(Lat);
  console.log(Lng);
  
  ymap.drawMap(new Y.LatLng(Lat, Lng), 17, Y.LayerSetId.NORMAL);
  
  //ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);
  
  return;
};

///////   reload function   ///////////

function reload_func(){
  
  var btn_search = document.getElementById("btn_search");
  btn_search.addEventListener("click",function(){
    location.reload();
  });
  
  return;
  
};


//////////   select hover function   ///////////////

function select_hover_func (){
  
  var select = document.getElementById("pre");
  var down_icon = document.getElementsByClassName("fa");
  var first_down_icon = down_icon[0];
  
  ////////   mouseover   //////////
  select.addEventListener("mouseover",function(){
    first_down_icon.style.color = "rgba(255,255,0,0.8)";
  });
  
  ////////   mouseout   //////////
  select.addEventListener("mouseout",function(){
    first_down_icon.style.color = "rgba(0,0,0,0.8)";
  });

  return;
  
};


////////////////   smart phone touch function  //////////////////////////

function smart_phone_touch_func(){
  
  /////   select function   ////////////////////////////
  var select = document.getElementById("pre");
  
  select.addEventListener("touchstart",function(){
    this.style.backgroundColor = "rgba(135,206,250,0.4)";
    this.style.fontWeight = "bold";
    this.style.color = "rgba(255,255,0,0.8)";
  });
  
  select.addEventListener("touchmove",function(){
    this.style.backgroundColor = "rgba(135,206,250,0.4)";
    this.style.fontWeight = "bold";
    this.style.color = "rgba(255,255,0,0.8)";
  });
  
  select.addEventListener("touchend",function(){
    this.style.backgroundColor = "rgba(255,255,255,0.5)";
    this.style.fontWeight = "normal";
    this.style.color = "rgba(0,0,0,0.6)";
  });
  
  /////////   search button   ////////////////////
  var btn_search = document.getElementById("btn_search");
  
  btn_search.addEventListener("touchstart",function(){
    this.style.border = "solid 5px rgba(135,206,250,1)";
    this.style.color = "rgba(135,206,250,1)";
    this.style.backgroundColor = "rgba(255,255,0,0.8)";
    this.style.fontWeight = "bold";
  });
  
  btn_search.addEventListener("touchmove",function(){
    this.style.border = "solid 5px rgba(135,206,250,1)";
    this.style.color = "rgba(135,206,250,1)";
    this.style.backgroundColor = "rgba(255,255,0,0.8)";
    this.style.fontWeight = "bold";
  });
  
  btn_search.addEventListener("touchend",function(){
    this.style.border = "solid 5px rgba(255,255,0,0.8)";
    this.style.color = "rgba(255,255,0,0.8)";
    this.style.backgroundColor = "rgba(135,206,250,0.8)";
    this.style.fontWeight = "normal";
  });
  
  return;
  
};
