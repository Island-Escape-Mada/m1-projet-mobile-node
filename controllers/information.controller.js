const db = require('../models');

const url = require('../configs/static');

const Information = db.Information;
const InformationDetail = db.InformationDetail;
const InformationMedia = db.InformationMedia;
const ParentInformation = db.ParentInformation

const globalHeader = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <script src="js/jquery.min.js"></script>
`;

const globalFooter = `
    </html>
`;

var listHeader = globalHeader + `
  <style>
    body {
      background-color: #f8f9fa;
    }
    .beach-card {
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      padding: 20px;
      margin-bottom: 20px;
      transition: transform 0.3s ease-in-out;
    }
    .beach-card:hover {
      transform: translateY(-5px);
    }
    .beach-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .beach-name {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 5px;
    }
    .beach-location {
      font-size: 18px;
      color: #555;
      margin-bottom: 10px;
    }
    .beach-description {
      font-size: 16px;
      color: #333;
    }
    .welcome {

      height:220px;

      width:100%;

      background-color:rgba(255, 255, 0, 0.3);

    }

    .content {

      margin-top:230px;
      height:800px;

    }

    .stick {

      position:fixed;

      top:0px;

    }

    .video-wrapper {
      position: relative;
      width: 400px;
      height: 200px;

      overflow: hidden;
      text-align: center;
      display: flex;
      align-items: center;
      justify-centent: center;
    }

    .video {
      object-fit: cover;
      height: 100%;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;
    }
  
    .text-overlay {
      position: absolute;
      top: 50%;
      left: 45%;
      // right: 50%; 
      transform: translate(-50%, -50%);
      color: white;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 10px 20px;
  }
  </style>
` + "</head>";

var listFooter = `
    <script>
      function loadAPIContent(apiUrl) {
        console.log("Click");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("beach-card").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", apiUrl, true);
        xmlhttp.send();
      }
    </script>
    <script>
      $(window).scroll(function () {
          if ($(window).scrollTop() == 0) {
              $('.menu').hide();
              $('.msg').fadeIn(200);
              $('.welcome').animate({
                  height: "220px"
              }, 300);
              shown = false;
          } else if ($(window).scrollTop() > 0 && !shown) {
              $('.menu').fadeIn(200);
              $('.msg').hide();
              $('.welcome').animate({
                  height: "50px"
              }, 300);
              shown = true;
          }
      });
    </script>
` + globalFooter;

var detailHeader = globalHeader + `
    <style>
      body {
        background-color: #f8f9fa;
      }

      .welcome {

        height:220px;
  
        width:100%;
  
        background-color:rgba(255, 255, 0, 0.3);
  
      }
  
      .content {
  
        margin-top:230px;
        height:800px;
  
      }
  
      .stick {
  
        position:fixed;
  
        top:0px;
  
      }
  
      .video-wrapper {
        position: relative;
        width: 400px;
        height: 200px;
  
        overflow: hidden;
        text-align: center;
        display: flex;
        align-items: center;
        justify-centent: center;
      }
  
      .video {
        object-fit: cover;
        height: 100%;
        width: 100%;
  
        position: absolute;
        top: 0;
        left: 0;
      }
    
      .text-overlay {
        position: absolute;
        top: 50%;
        left: 45%;
        // right: 50%; 
        transform: translate(-50%, -50%);
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 10px 20px;
    }
    </style>
`+ "</head>";

var detailFooter = `
    <script>
    $(window).scroll(function () {
        if ($(window).scrollTop() == 0) {
            $('.menu').hide();
            $('.msg').fadeIn(200);
            $('.welcome').animate({
                height: "220px"
            }, 300);
            shown = false;
        } else if ($(window).scrollTop() > 0 && !shown) {
            $('.menu').fadeIn(200);
            $('.msg').hide();
            $('.welcome').animate({
                height: "50px"
            }, 300);
            shown = true;
        }
    });
    </script>
` + globalFooter;

// get list data
const getInfoList= async (req, res) => {
    var infoType = req.param('info_type');

    var htmlBody = "";
    var status = 200;
    try{
      const information = await Information.find({infoType: infoType});
      const parentInformation = await ParentInformation.find({infoType: infoType});
      // style="background-image: url('` + url + "image/" + parentInformation[0].mainImage + `"');"
      htmlBody += `
            <body>
              <div class="welcome stick card card-cover text-white bg-dark shadow-lg">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 video-wrapper">
                  <div class="msg">
                    <img class="video" src="` + url + "image/" + parentInformation[0].mainImage +`">
                    <h2 class="text-overlay">` + parentInformation[0].shortDescription + `</h2>
                  </div>
                </div>
              </div>
              <div class="content container mt-230">
      `;
      if (information.length > 0){
        htmlBody += `<div class="row">`;
        for (let i = 0; i < information.length; i ++){
              htmlBody += `
                  <div class="col-md-6">
                    <div class="beach-card">
                      <img class="beach-image" src="` + url + "image/" + information[i].mainImage +`" alt="` + information[i].title + `">
                      <div class="beach-name">` + information[i].title + `</div>
                      <div class="beach-location">` + information[i].location + `</div>
                      <div class="beach-description">` + information[i].shortDescription + `</div>
                      <a href="` + url + `info-detail?id=` + (information[i]._id).toString() + `">See more</a>
                    </div>
                  </div>`;
        }
        htmlBody += `</div>`;
      }else{
        htmlBody += `<h1>No data found</h1>`;
        status = 404;
      }
      htmlBody += `
          </div>
        </body>
        `;
      res.status(status).send(listHeader + htmlBody + listFooter);
    }catch(error){
      console.log(error);
      res.status(500).send({message: error});
    }
}

// get detail
const getDetail = async (req, res) => {
    var infoId = req.param('id');
    var htmlBody = "";
    try{
      // data
      const infoDetail = await InformationDetail.find({information: infoId});
      const infoName = await InformationDetail.find({information: infoId, infoType: "Name"});
      const infoDescription = await InformationDetail.find({information: infoId, infoType: "description"});
      const infoMediaVideoHeader = await InformationMedia.find({ information: infoId, mediaType: "video", mediaDescription: "header_video" });
      const infoMediaImageHeader = await InformationMedia.find({ information: infoId, mediaType: "image", mediaDescription: "header_image" });
      const infoMediaImageGallery = await InformationMedia.find({ information: infoId, mediaType: "image", mediaDescription: "gallery" });
      
      // html
      htmlBody += `
        <body>`;
      if (infoMediaVideoHeader.length == 0 && infoMediaImageHeader.length > 0){
        htmlBody += `
          <div class="welcome stick card card-cover text-white bg-dark shadow-lg">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 video-wrapper">
                <div class="msg">
                    <img class="video" src="` + url + "image/" + infoMediaImageHeader[0].mediaPath +`">
                    <h2 class="text-overlay">` + infoName[0].infoValue + `</h2>
                </div>
            </div>
          </div>
        `;
      }else if (infoMediaVideoHeader.length > 0){
        htmlBody += `
        <div class="welcome stick card card-cover text-white bg-dark shadow-lg">
          <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 video-wrapper">
            <span class="msg">
              <video playsinline autoplay muted>
                <source src="` + url + "video/" + infoMediaVideoHeader[0].mediaPath +`" type="video/mp4">
                Video not supported
              </video>
              <h2 class="text-center">` + infoName[0].infoValue + `</h2>
            </span>
          </div>
        </div>
        `;
      }else{
        htmlBody += `
          <div class="welcome stick card card-cover text-white bg-dark shadow-lg">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <span class="msg">
                <h2 class="text-center">` + infoName[0].infoValue + `</h2>
              </span>
            </div>
          </div>
        `;
      }
          
      htmlBody += `
                  <div class="content container mt-230">`;

      htmlBody +=`
                  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div class="col d-flex align-items-start">
                      <div>
                        <h2>` + infoName[0].infoValue + `</h2>
                        <p>` + infoDescription[0].infoValue + `</p>
                      </div>
                    </div>
                  </div>
      `;
      
      htmlBody += `
              <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="col-md-5 col-lg-4 order-md-last">
                  <h4 class="d-flex justify-content-between align-items-center mb-3">
                    Useful data
                  </h4>
                  <ul class="list-group mb-3">
      `;
      for(let i=0; i<infoDetail.length; i++){
        if (infoDetail[i].infoType != "description"){
          htmlBody += `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 class="my-0">` + infoDetail[i].infoType + `</h6>
                  </div>
                  <span class="text-muted">` + infoDetail[i].infoValue + `</span>
                </li>
        `;
        }
      }
      htmlBody += `
                  </ul>
                </div>
              </div>
      `;
      
      htmlBody += `
                  </div>
                </div>
              </body>
      `;
      res.status(200).send(detailHeader + htmlBody + detailFooter);
    }catch (error) {
      htmlBody = `<h1>Current info has no related data yet.</h1>`;
      res.status(500).send(detailHeader + htmlBody + detailFooter);
    }
}

module.exports = { getInfoList, getDetail }