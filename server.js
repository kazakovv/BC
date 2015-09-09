/**
 * Created by Victor on 9/8/2015.
 */
var express = require('express'),
    app = express();

app.use(express.static('/'))
    .get('*',function(req,res){
        res.sendfile('index.html');

    })
    .listen(3000);