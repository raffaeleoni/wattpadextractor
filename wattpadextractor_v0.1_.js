/**
    -- BEGIN WITH --
    copy and past this first to import jquery
*/

var _script= document.createElement('script');
_script.type= 'text/javascript';
_script.src= 'https://code.jquery.com/jquery-3.2.1.min.js';
document.getElementsByTagName('head')[0].appendChild(_script);

/**
    -- THEN --
    look at the _opera_ var and replace what you have to
*/

var _content = `
<html>
<head>
	<style>
		body {
			margin: 0;
			padding: 0;
			background-color: #FAFAFA;
			font: 10pt "Lucida Sans Unicode", "Lucida Grande", sans-serif;
		}
		.opera {
			width: 210mm;
			min-height: 297mm;
			padding: 10mm;
			margin: 10mm auto;
			background: white;
		}
		br { line-height:20px; }
		li { line-height:1.50em; }
		* {
			box-sizing: border-box;
			-moz-box-sizing: border-box;
		}
		.poem {
			padding: 5mm;
			height: auto;
			max-height: 287mm;
			line-height:1.25em;
		@page { size: A4; margin: auto 0; }
		@media print {
			.opera{
				margin: 0;
				width: initial;
				background: initial;
			}
			.poem{
				text-align: justify;
			}
		}
	</style>
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		
</head>
	
<body>
	
	<div class="opera">
	</div>
</body>
</html>
`;


/**
    -- SET THE OPERA TO BE EXTRACTED HERE --
    here you have to replace the $TARGET with your work path, it should look like "NNNNNNNNNN-title-like-this" without quotes
    where NNNNNNNNNN is a number
*/

var _OPERA_ = "https://www.wattpad.com/story/$TARGET/parts";



/**
    THIS MAKES THE MAGIC
*/
var _wrt = window.open('','_self');
_wrt.document.write(_content);

var xhttp = new XMLHttpRequest();
xhttp.open("GET",_OPERA_, true);
xhttp.send();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		$(xhttp.responseText).find('#tab-content .story-parts div ul.table-of-contents li[data-part-id!=""] a').each(function (i, _item) {
			var _itm = "https://www.wattpad.com" + $(_item).attr("href") + "/page/0";
			
				var innerxhttp = new XMLHttpRequest();
				innerxhttp.open("GET",_itm, true);
				innerxhttp.send();
				innerxhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var _title = $(innerxhttp.responseText).find('header.panel.panel-reading.text-center h2');
						$(document.body).find('.opera').append( "\n<br><center><h2>"+_title.html()+"</h2></center>");
						$(innerxhttp.responseText).find('p[data-p-id]').each(function (i, _item) {
							var corrected = $(_item).remove("span");
							$(document.body).find('.opera').append( "<p class='poem'>" + $(corrected).html() + "</p>" );
						});
					}
				}
		});
    }
};

