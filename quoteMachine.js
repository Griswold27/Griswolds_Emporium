/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function inIframe () {try {return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224',
    '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
var currentQuote = '', currentAuthor = '';
function openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0,\n\
statusbar=0, menubar=0, resizable=0');
}
function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(r) {
            if (typeof r[0] === 'string') {
                r = JSON.parse(r);
            } 
            currentQuote = r[0].quote;
            currentAuthor = r[0].author;
            if(inIframe())
            {
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
                $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
            } else{console.log("THIS ISN'T QUITE RIGHT");}
            $('.quote-text').animate({
                opacity: 0
            }, 500,
            function() {
                $(this).animate({
                    opacity: 1
                }, 500);
                $('#text').html(r[0].quote);
            });
            
            $(".quote-author").animate({
                opacity: 0
            }, 500,
            function() {
                $(this).animate({
                    opacity: 1
                }, 500);
                $('#author').html(r[0].author);
            });
            
            var color = Math.floor(Math.random() * colors.length);
            $("html body").animate({
                backgroundColor: colors[color],
                color: colors[color]
            }, 1000);
            $(".button").animate({
                backgroundColor: colors[color]
            }, 1000);
        }
    });
}
$(document).ready(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
    $('#tweet-quote').on('click', function() {
        if(!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
    $('#tumblr-quote').on('click', function() {
        if(!inIframe()) {
            openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        }
    });
});