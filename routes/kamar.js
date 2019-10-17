var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection estabilished successfully");
});

mongoose.connect('mongodb://localhost:27017/info', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Kamar = mongoose.model('kamar', {
    no_kamar: String,
    jumlah_kamar: String,
    fasilitas_kamar: String,
    harga: String
});

/* GET admin page. */
router.get('/list', function (req, res, next) {
    Kamar.find((err, resData) => {
        let data = {
            title: 'Informasi Kamar',
            kamar: resData
        };
        res.render('kamar/list', data);
    });
});

router.get('/edit/:id', function (req, res, next) {
    Kamar.findById(req.params.id, (err, resData) => {
        let data = {
            title: 'Informasi Kamar',
            kamar: resData
        };
        res.render('kamar/edit', data);
    });
});

router.post('/:id/update', function (req, res, next) {
    let datakamar = req.body;
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.no_kamar = datakamar.no_kamar;
            resData.jumlah_kamar = datakamar.jumlah_kamar;
            resData.fasilitas_kamar = datakamar.fasilitas_kamar;
            resData.harga = datakamar.harga;

            resData.save().then(resData => {
                res.redirect('/admin/kamar/list');
            })
        }
    });
});

router.get('/:id/delete', function (req, res, next) {
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.delete().then(resData => {
                res.redirect('/admin/kamar/list');
            })
        }
    });
});
router.get('/tambah-kamar', function (req, res, next) {
    let data = {
        title: 'Tambah Kamar'
    };
    res.render('kamar/tambah', data);
});

router.post('/tambah-kamar', function (req, res, next) {
    let dataKamar = req.body;
    let kamar = new Kamar(dataKamar);
    kamar.save().then(resData => {
        res.redirect('/admin/kamar/list');
    }).catch(err => {
        res.status(400).send('Simpan kamar Gagal!');
    });
});

module.exports = router;