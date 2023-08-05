const db = require('../models');

const Information = db.Information;

var htmlheader = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <!-- Link Bootstrap CSS from a CDN -->
  <link href="css/bootstrap.css" rel="stylesheet">
  <script src="js/jquery.min.js"></script>
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
  
  </style>
</head>
`;

var htmlFooter = `
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
    </html>
`;

// get list data
const getInfoList= (req, res) => {
    var infoType = req.param('info_type');
    Information.find({infoType: infoType}).exec()
    .then((info) =>{
      if (info.length > 0){
        var htmlBody = `
        <body>
          <div class="welcome stick card card-cover text-white bg-dark shadow-lg" style="background-image: url('image/unsplash-photo-2.jpg');">
            <!-- <h1 class="text-center">Best Madagascar Beaches</h1> -->
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <span class="msg">
                  <h2 class="text-center">Some random text<br/> or image or anything<br/> to welcome user.</h2>
              </span>
            </div>
          </div>
          <div class="content container mt-230"`;
        
        
        htmlBody += `<div class="row">`;
        for (let i = 0; i < info.length; i ++){
              htmlBody += `
                  <div class="col-md-6">
                    <div class="beach-card">
                      <img class="beach-image" src="` + info[i].mainImage +`" alt="` + info[i].title + `">
                      <div class="beach-name">` + info[i].title + `</div>
                      <div class="beach-location">` + info[i].location + `</div>
                      <div class="beach-description">` + info[i].shortDescription + `</div>
                      <a href="http://192.168.43.52:4000/info-detail?id=` + (info[i]._id).toString() + `">See more</a>
                    </div>
                  </div>`;
        }
        htmlBody += `
            </div>
          </div>
        </body>
        `;
        res.status(200).send(htmlheader + htmlBody + htmlFooter);
      }else{
        res.status(404).send("<h1>No data found</h1>");
      }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: err});
    });
}

// get detail
const getDetail = (req, res) => {
    var infoId = req.param('id');
    res.status(200).send(infoId);
}

module.exports = { getInfoList, getDetail }