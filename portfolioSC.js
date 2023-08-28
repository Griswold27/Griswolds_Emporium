/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("hashchange", function() { scrollBy(0, -100); });


$(document).ready(function() {
    $(".btn-nav").click(function() {
        var target = $(this).data("target");
        $(target).addClass("faded-highlight");

        setTimeout(function() {
            $(target).removeClass("faded-highlight");
        }, 1000); // pulse length
    });
});