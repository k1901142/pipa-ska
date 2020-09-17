const express = require("express");
const body_parser = require("body-parser");
const gnuplot=require("gnuplot");

// Asenna paketit konsolista
// npm install express etc.

const app = express(); // alustaa appin, exxpress-sovelluksen

//Lisää parserit POST kutsun json muotoiselle bodylle 
//ja GET query parametreille
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

//Käsittelijä POST kutsulle, jossa JSON muotoinen data
//{
// "formula":"sin(x)+x**2"
//}
app.post("/", (req, res, next) => {
    const formula = req.body.formula; //request pyynnön sisään body-objektiin

    // plottaa png kuva
    gnuplot()
    .set("term png")
    .unset("output")
    .plot(formula, {
        end:true
    })
    .pipe(res);

    console.log(formula);
    res.send("ok");
}); // kuunnellaan juurihakemistoa


//Kuuntelee porttia 8080
app.listen(8083);
