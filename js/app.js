/* --------------------------------------------------------
The Lawyer FrontEnd

version: 1.0
last modified: 19/04/2018 by iambluedev
author: iambluedev
email: iambluedev@gmx.fr
licence: Creative Commons Attribution-NonCommercial-ShareAlike 3.0
initiative by: VulkanNetwork [https://twitter.com/VulkanNetwork]
----------------------------------------------------------*/

var HOST_API = "http://127.0.0.1:8080/";
var hotlinks = [];
var lastResult = [];

$.getJSON(HOST_API + 'stats', function(json) {
    $("#bansCount").html(json.bans);
    $("#mutesCount").html(json.mutes);
    $("#kicksCount").html(json.kicks);
    $("#warningsCount").html(json.warnings);
}).fail(function(error) {
    console.log(error);
    showError();
});

$.getJSON(HOST_API + 'hotlinks', function(json) {
    hotlinks = json.hotlinks;
    $.each(hotlinks, function (i, item) {
        $('#servers').append($('<option>', { 
            value: i+1,
            text : item.name
        }));
    });
    $(".show-details").each(function() {
        $(this).show();
    });
}).fail(function(error) {
    console.log(error);
    showError();
});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = 'Le ' + date + ' ' + month + ' ' + year + ' à ' + hour + ':' + min;
    return time;
}

function showError(){
    $("#error").show();
    $("#bansCount").html(-1);
    $("#mutesCount").html(-1);
    $("#kicksCount").html(-1);
    $("#warningsCount").html(-1);
    $("#dropdown").attr("disabled", true);
    $("#searchBtn").attr("disabled", true);
    $("input").prop("disabled", true);
    $(".refresh").attr("disabled", true);
}

$('#player').autocomplete({
    source : function(requete, reponse){
        $.ajax({
            url : HOST_API + 'search/' + $('#player').val(),
            dataType : 'json',
            success : function(donnee){
                reponse(donnee.result);
            }
        });
    },
    minLength: 3
});

$(".refresh").click(function() {
    $(this).html("<i class=\"fa fa-spinner fa-spin fa-fw\"></i>");
    $(this).attr("disabled", true);
    $.getJSON(HOST_API + 'refresh', function(json) {
        if(json.code == 0){
            $(this).html("Actualisation des données déjà en cours !");
        } else {
            $(this).html("Actualisation en cours");
        }
    });
    setTimeout(function(el){ 
        $(el).attr("disabled", false);
        $(el).html("Actualiser");					
    }, 2000, this);
});

$(".show-details").click(function() {
    var type = $(this).attr("type");
    $("#detailsContent").html("");
    $("#detailName").html(type);
    $.each(hotlinks, function (i, item) {
        if(type == "bans"){
            $("#detailsContent").append("<strong>" + item.banCount + "</strong> bans provient du serveur <a href=" + item.website + ">" + item.name + "</a> <br>");
        } else if(type == "mutes"){
            $("#detailsContent").append("<strong>" + item.muteCount + "</strong> mutes provient du serveur <a href=" + item.website + ">" + item.name + "</a> <br>");
        } else if(type == "kicks"){
            $("#detailsContent").append("<strong>" + item.kickCount + "</strong> kicks provient du serveur <a href=" + item.website + ">" + item.name + "</a> <br>");
        } else if(type == "warnings"){
            $("#detailsContent").append("<strong>" + item.warningCount + "</strong> warnings provient du serveur <a href=" + item.website + ">" + item.name + "</a> <br>");
        }
    });
    $("#details").show();
});

$(".search-btn").click(function() {
    var servers = $("#servers option:selected").val();
    var type = $("#type option:selected").val();
    var player = $("#player").val();
    var like = ($("#sqlLike").is(":checked")) ? 1 : 0;
    
    if(player == ""){
        alert("Vous devez indiquer un pseudo !");
        return;
    }
    
    $("table").hide();
    $("#search").show();
    $("#searchParams").html("");
    $("#tbody").html("");
    $("#loading").show();
    $("#searchParams").append("Serveurs : <strong>" + $("#servers option:selected").text() + "</strong><br>");
    $("#searchParams").append("Type de sanctions : <strong>" + $("#type option:selected").text() + "</strong><br>");
    $("#searchParams").append("Joueur recherché : <strong>" + player + "</strong><br>");
    
    $.getJSON(HOST_API + 'search/' + player + '/' + type + '/' + servers + '/' + like, function(json) {
        lastResult = json.result;
        var x = 1;
        $.each(json.result, function (key, values) {
            $.each(values, function (i, item) {
                $("#tbody").append("<tr> <th>" + x + "</th><th>" + key + "</th><th>" + item.sanction_name + "</th><th>" + item.sanction_by + "</th><th>" + item.sanction_reason + "</th><th>" + timeConverter(item.sanction_at) + "</th><th><a href="+ hotlinks[item.hotlink_id - 1].website + ">" + hotlinks[item.hotlink_id - 1].name + "</a></th></tr>");
                x++;
            });
        });
        $("#searchParams").append("Sanctions trouvées : <strong>" + (x-1) + "</strong><br>");
        $("#loading").hide();
        $("table").show();
    });
});

$(".export-results-json").click(function() {
    var tmp = {
        search: {
            player: $("#player").val(),
            server: $("#servers option:selected").text(),
            type: $("#type option:selected").text(),
            like: $("#sqlLike").is(":checked")
        },
        result: lastResult
    }
    download(JSON.stringify(tmp, null, 2), "results.json", "application/json");
});

$(".export-hotlinks-json").click(function() {
    download(JSON.stringify(hotlinks, null, 2), "hotlinks.json", "application/json");
});

// https://stackoverflow.com/questions/16376161/javascript-set-filename-to-be-downloaded/16377813#16377813
function download(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { 
        navigator.msSaveBlob(new Blob([content], {
            type: mimeType
        }), fileName);
    } else if (URL && 'download' in a) { 
        a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
    }
}