const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 7777;
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const readXlsxFile = require('read-excel-file/node');
const PDFDocument = require('pdfkit');
const archiver = require('archiver');

PDFDocument.setMaxListeners(0);

const uploadsDirectory = './uploads';

//frontend assets all in the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

let filePath;

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

//IB
app.post('/downloadIB', upload.single('myFile'), (request, response) => {
  //archive
  let doc = new PDFDocument();
  var output = fs.createWriteStream('./myClass.zip');
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');

    response.download('./myClass.zip');

    // console.log(
    //   'archiver has been finalized and the output file descriptor has closed.'
    // );
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  //Archive Finished

  const file = request.file.path;
  //   console.log(file);
  readXlsxFile(file).then((rows) => {
    filePath = `./${rows[1][3]}`;

    for (let i = 1; i < rows.length; i++) {
      mainFolder = fs.mkdir(
        `./${rows[1][3]}/${rows[i][2]}_${rows[i][0]}_${rows[i][1]}`,
        { recursive: true },
        (err) => {
          if (err) {
            console.log('error creating main folder');
          } else {
            for (let j = 0; j < 3; j++) {
              doc.pipe(
                fs.createWriteStream(
                  `./${rows[1][3]}/${rows[i][2]}_${rows[i][0]}_${rows[i][1]}/${
                    rows[i][2]
                  }_${rows[i][0]}_${rows[i][1]}_evidence_${j + 1}.pdf`
                ),
                '',
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Successfully created inner files');
                  }
                }
              );
            }
          }
        }
      );
    }
  });
  setTimeout(() => {
    doc.end();
    archive.directory(filePath, false);
    archive.finalize();
  }, 1000);
});

//iGCSE
app.post('/downloadiGCSE', upload.single('myFile'), (request, response) => {
  let doc = new PDFDocument();
  //archive
  var output = fs.createWriteStream('./myClass.zip');
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');

    response.download('./myClass.zip');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  //Archive Finished

  const file = request.file.path;
  //   console.log(file);
  readXlsxFile(file).then((rows) => {
    filePath = `./${rows[1][3]}`;

    for (let i = 1; i < rows.length; i++) {
      mainFolder = fs.mkdir(
        `./${rows[1][3]}/${rows[i][2]}_${rows[i][0]}_${rows[i][1]}`,
        { recursive: true },
        (err) => {
          if (err) {
            console.log('error creating main folder');
          } else {
            for (let j = 0; j < 3; j++) {
              doc.pipe(
                fs.createWriteStream(
                  `./${rows[1][3]}/${rows[i][2]}_${rows[i][0]}_${rows[i][1]}/${
                    rows[i][2]
                  }_${rows[i][0]}_${rows[i][1]}_evidence_${j + 1}.pdf`
                ),
                '',
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Successfully created inner files');
                  }
                }
              );
            }
          }
        }
      );
    }
  });
  setTimeout(() => {
    doc.end();
    archive.directory(filePath, false);
    archive.finalize();
  }, 1000);
});

app.listen(process.env.PORT || PORT);
