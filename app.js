var streamers = ["MedryBW", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var clientId = 1;
var getStreamer = function(streamer) {
  var returnData;
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams/" + streamer,
    dataType: "jsonp",
    success: function(data){
      console.log(data.stream);
      getChannel(data._links.channel, data.stream);
    }
  });

  console.log("got streamer" + streamer);
  return returnData;
}

var getChannel = function(channelUrl, isStreaming){
  $.ajax({
    url: channelUrl,
    dataType: "jsonp",
    success: function(data){
      console.log("isStreaming: " + isStreaming);
      channelImage = data.logo ? data.logo : "noLogo.jpg";
      isStreamingIcon = isStreaming ? "<i class='fa fa-check-circle pull-right'></i>" : "<i class='fa fa-exclamation-circle streaming-icon pull-right'></i>";
      $(".outer-container").append("<div class='channel row'><div class='col-md-4'><img class='channel-image' src='" + channelImage + "' </img></div><div class='col-md-8 '><div class='channel-name'><a href='" + data.url + "' class='pull-left'>" + data.display_name + "</a>" + isStreamingIcon + "</div</div></div>");
    }
  });
}


$(window).ready(function(){
  console.log("jQuery ok");
  streamers.forEach(function(streamer){
    getStreamer(streamer);
  })
})