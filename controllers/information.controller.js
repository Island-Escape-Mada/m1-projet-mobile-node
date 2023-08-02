const db = require('../models');

const Information = db.Information;

var htmlheader = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best Madagascar Beaches</title>
  <!-- Link Bootstrap CSS from a CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
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
  </style>
</head>
`;

var htmlFooter = `
    </html>
`;

// get list data
const getInfoList= (req, res) => {
    var infoType = req.param('info_type');
    Information.find({infoType: infoType}).exec()
    .then((info) =>{
        var htmlBody = `
        <body>
          <div class="container mt-4">
            <h1 class="text-center mb-4">Best Madagascar Beaches</h1>
              <div class="row">`;
        for (let i = 0; i < info.length; i ++){
              htmlBody += `
                  <div class="col-md-6">
                    <div class="beach-card">
                      <img class="beach-image" src="` + info[i].mainImage +`" alt="` + info[i].title + `">
                      <div class="beach-name">` + info[i].title + `</div>
                      <div class="beach-location">` + info[i].location + `</div>
                    <div class="beach-description">`
                     + info[i].shortDescription +
                  `</div>
                </div>
              </div>
                `;
        }
        htmlBody += `
            </div>

          </div>
        </body>
        `;
        res.status(200).send(htmlheader + htmlBody + htmlFooter);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: err});
    });
}

module.exports = { getInfoList }