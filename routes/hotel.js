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

const Hotel = mongoose.model('hotel', {
    nama_hotel: String,
    alamat: String
});

router.get('/informasi-hotel', function (req, res, next) {
    Hotel.find((err, resData) => {
        let data = {
            title: 'Informasi Hotel',
            hotel: resData
        };
        res.render('hotel/informasi-hotel', data);
    });
});
router.get('/edit/:id', function (req, res, next) {
    Hotel.findById(req.params.id, (err, resData) => {
        let data = {
            title: 'Informasi hotel',
            hotel: resData
        };
        res.render('hotel/ubah-hotel', data);
    });
});

router.post('/:id/update', function (req, res, next) {
    let dataHotel = req.body;
    Hotel.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.nama_hotel = dataHotel.nama_hotel;
            resData.alamat = dataHotel.alamat;

            resData.save().then(resData => {
                res.redirect('/admin/hotel/informasi-hotel');
            })
        }
    });
});

router.get('/:id/delete', function (req, res, next) {
    Hotel.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.delete().then(resData => {
                res.redirect('/admin/hotel/informasi-hotel');
            })
        }
    });
});
router.get('/tambah-hotel', function (req, res, next) {
    let data = {
        title: 'Tambah hotel'
    };
    res.render('hotel/tambah-hotel', data);
});

router.post('/tambah-hotel', function (req, res, next) {
    let dataHotel = req.body;
    let hotel = new Hotel(dataHotel);
    hotel.save().then(resData => {
        res.redirect('/admin/hotel/informasi-hotel');
    }).catch(err => {
        res.status(400).send('Simpan hotel Gagal!');
    });
});

module.exports = router;