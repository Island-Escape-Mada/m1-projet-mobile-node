const db = require('../models');

const BasicInfo = db.BasicInfo;

var htmlheader = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore Madagascar</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            color: #333;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
        }
        h1 {
            color: #007bff;
            font-size: 32px;
            text-align: center;
            margin-bottom: 30px;
        }
        h2 {
            color: #555;
            font-size: 24px;
        }
        .info {
            color: #222;
            font-size: 20px;
        }
    </style>
</head>
`;

var htmlFooter = `
    </html>
`;

// get about mada info
const getAboutMadaInfo = (req, res) => {
    BasicInfo.find({}).sort('rank').exec()
    .then((info) =>{
        var htmlBody = `
            <body> 
                <div class="container">
                    <h1>Explore Madagascar</h1>`;
        for (let i = 0; i < info.length; i ++){
            if (info[i].rank == 0){
                htmlBody += "<p>" + info[i].value + "</p>";
            }else{
                htmlBody += `
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">`
                htmlBody += "<h2>" + info[i].title + "</h2>";
                htmlBody += `<p class="info">` + info[i].value + `</p>
                    <button class="btn btn-primary">Test</button>
                        </div>
                    </div>
                    </div>
                </body>
                `
            }
        }
        res.status(200).send(htmlheader + htmlBody + htmlFooter);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: err});
    });
}

module.exports = { getAboutMadaInfo }