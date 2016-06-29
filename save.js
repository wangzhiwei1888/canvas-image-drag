$('.game_save').on('click', function() {


  var $playbox = $('.playbox');
  var width = $playbox.width();
  var height = $playbox.height();

  var canvas = '<canvas class="myCanvas" width=' + width + ' height=' + height + ' ></canvas>';

  $('.myCanvas').remove();
  $('body').append(canvas);

  // console.log(width,height)

  var imgArr = [];

  $playbox.find('img').each(function() {

    var index = $(this).css('z-index');
    // console.log(index);
    // console.log($(this)[0])
    imgArr[index] = {};

    // console.log($(this)[0]);
    imgArr[index]['img'] = $(this)[0];
    imgArr[index]['width'] = $(this).width();
    imgArr[index]['height'] = $(this).height();
    imgArr[index]['x'] = $(this).css('left');
    imgArr[index]['y'] = $(this).css('top');

    // console.log($(this).css('transform'));
    // console.log($(this)[0].style.transform);
    imgArr[index]['rotate'] = parseInt($(this)[0].style.transform.replace("rotate(", "")) || 0;


  })

  var ctx = $('.myCanvas')[0].getContext("2d");
  var imgTotal = 0;
  var loadImgTotal = 0;
  for (var i = 1; i < imgArr.length; i++) {

    var img = imgArr[i]

    if (img) {

      imgTotal = imgTotal + 1;
      (function(img) {

        var newimg = new Image;
        newimg.onload = function() {

          loadImgTotal = loadImgTotal + 1;

          if (loadImgTotal == imgTotal) {

            setTimeout(function() {

              var localImg = convertCanvasToImage($('.myCanvas')[0]);
              $('body').append(localImg);

            }, 300)

          }
          var width = img.width;
          var height = img.height;

          var x = parseInt(img.x);
          var y = parseInt(img.y);

          // console.log(width,height,x,y)
          // console.log(img[i].img)
          // ctx.rotate(img.rotate);
          console.log(img.rotate);
          // ctx.rotate(img.rotate);
          ctx.save();
          ctx.translate(x+width/2, y+height/2);
          ctx.rotate(img.rotate * Math.PI / 180);
          ctx.drawImage(newimg, -width/2, -height/2,width,height);
          ctx.restore();
          // ctx.save();
          // console.log(canvas.toDataURL());
        };
        newimg.crossOrigin = ""; //关键
        newimg.src = img.img.src;

      })(img)
    }

  }

  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

})
