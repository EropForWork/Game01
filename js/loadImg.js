let TempImgCon = new createjs.Container();

function loadImage() {
  for (let i = 0; i < ImgArr.length; i++) {
    let Img = new createjs.Bitmap('images/' + ImgArr[i].place + '/' + ImgArr[i].img);
    Img.name = ImgArr[i].img.substring(0, ImgArr[i].img.indexOf('.'));
    TempImgCon.addChild(Img);
    Img.alpha = 0;
    Img.crossOrigin="Anonymous";
    if (ImgArr[i].place == 'Shop' && ImgArr[i].img.indexOf('Shop') == -1) {
      Img.scaleX = Img.scaleY = ImgArr[i].scale;
    }
  }
  textLoginDis();
  MainCanvas.addChild(TempImgCon);

}

// настоящий код
/*let TempImgCon = new createjs.Container();

function loadImage() {
  let ImgLinkArr = [];
  for (let i = 0; i < JSON.parse(ImgArr).length; i++) {
    ImgLinkArr.push(JSON.parse(ImgArr)[i].img.substring(0, JSON.parse(ImgArr)[i].img.indexOf('.')), 'images/' + JSON.parse(ImgArr)[i].place + '/' + JSON.parse(ImgArr)[i].img);
  }
  var queue = new createjs.LoadQueue(true);
  for (let i = 0; i < ImgLinkArr.length / 2; i++) {
    queue.loadManifest({
      id: ImgLinkArr[i * 2],
      src: ImgLinkArr[i * 2 + 1]
    });
  }
  queue.on("complete", loadComplete);
  queue.on("fileload", imgLoad);
  // queue.on("progress", loadProgress);
  queue.load();
}

function loadComplete(e) {
  console.log('Загрузился полностью.');
  // textLoginDis();
  MainCanvas.addChild(TempImgCon);
  console.log(TempImgCon);
}

function imgLoad(e) {
  // console.log('Файл', e.item, 'загрузился.');
  let Img = new createjs.Bitmap(e.item.src);
  Img.name = e.item.id;
  Img.alpha = 0;
  TempImgCon.addChild(Img);
}

function loadProgress(e) {
  console.log("Загрузка файлов:", Math.floor(e.progress * 100) + '%');
}
*/
