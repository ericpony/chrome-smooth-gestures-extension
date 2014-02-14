var langs={am:"Amharic",ar:"Arabic",bg:"Bulgarian",bn:"Bengali",ca:"Catalan",cs:"Czech",da:"Danish",de:"German",el:"Modern Greek",en:"English",en_GB:"English: British",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"French",gu:"Gujarati",he:"Hebrew",hi:"Hindi",hr:"Croatian",hu:"Hungarian",id:"Indonesian",it:"Italian",ja:"Japanese",kn:"Kannada",ko:"Korean",lt:"Lithuanian",lv:"Latvian",ml:"Malayalam",mr:"Marathi",nb:"Norwegian",nl:"Dutch",or:"Oriya",pl:"Polish",pt:"Portuguese",pt_BR:"Portuguese: Brazil",
ro:"Romanian",ru:"Russian",sk:"Slovak",sl:"Slovenian",sr:"Serbian",sv:"Swedish",sw:"Swahili",ta:"Tamil",te:"Telugu",th:"Thai",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese",zh:"Chinese",zh_TW:"Chinese: Traditional"},accept=[];
chrome.i18n.getAcceptLanguages(function(a){a.indexOf(window.navigator.language.replace("-","_"))!=-1&&a.splice(a.indexOf(window.navigator.language.replace("-","_")),1);a.unshift(window.navigator.language.replace("-","_"));for(i=0;i<a.length;i++)langs[a[i]]||(a.splice(i,1),i--);accept=a;language=accept[0];$("body").append($("<div>").attr("id","instruct").append($("<p>").text("Choose the language to translate to from the dropdown box. Type translations for some or all phrases, then click Submit.")).append($("<p>").text("The gray words are a description of the phrase. The bold phrases are the English to be translated. Type the translation in the textbox.")).append($("<p>").text("It is not neccessary to fill out all of the empty boxes, only the ones that need to be translated. You can edit any already existing translations to make changes.")));
var a=$("<optgroup>").attr("label","Detected Languages"),b=$("<optgroup>").attr("label","Other Languages");for(i=0;i<accept.length;i++)a.append($("<option>").val(accept[i]).text(langs[accept[i]]));for(l in langs)accept.indexOf(l)==-1&&b.append($("<option>").val(l).text(langs[l]));$("body").append($("<div>").attr("id","languages").append($("<div>").text("Translate to: ").append($("<select>").append(a).append(b).change(function(){language=$(this).val();loadpage()}))));$("body").append($("<div>").attr("id",
"generatediv").append($("<input>").attr("type","button").val("Submit >").click(function(){var a=new Date,a=a.getUTCFullYear().toString()+(a.getUTCMonth()+1<10?"0":"")+(a.getUTCMonth()+1).toString()+(a.getUTCDate()<10?"0":"")+a.getUTCDate().toString(),b={};for(id in src){var f=$("#edit-"+id).val(),d=res[id]?res[id].message:null;if(f&&!(f==""||f==d))d=JSON.parse(JSON.stringify(src[id])),d.message=f,d.update=a,b[id]=d}JSON.stringify(b)=="{}"?alert("No changes submitted."):($("#generatediv input").val("Uploading..."),
$.ajax({url:"http://fujan.name/smoothgestures/translate.php",type:"post",data:{key:"smooth",lang:language,tran:JSON.stringify(b)},success:function(a){$("#generatediv input").val("Submit >");a=="success"?setTimeout(function(){alert("Translation Sent. Thanks!\n\nFeel free to email smoothgestures@fujan.name to notify the developer that you have submitted a translation.")},0):setTimeout(function(){alert("Error Sending Translation")},0)},error:function(){$("#generatediv input").val("Submit >");setTimeout(function(){alert("Error Sending Translation")},
0)}}))})));$.get(chrome.extension.getURL("_locales/en/messages.json"),null,function(a){src=JSON.parse(a);loadpage()})});var src=null,res=null,language="zh",words=null,tree=null;document.title="Smooth Gestures: Translate";$("body").append($('<h1 id="translatetitle"><img src="im/icon48.png"/> Smooth Gestures: Translate</h1>'));
var loadpage=function(){$.get(chrome.extension.getURL("_locales/"+language+"/messages.json"),null,function(a){res=a&&a!=""?JSON.parse(a):{};formpage()})},formpage=function(){var a=JSON.parse(JSON.stringify(res));words=[];for(id in src)id!="_"&&words.push({id:id,src:src[id],res:a[id]&&a[id].update&&a[id].update>src[id].update?a[id]:void 0}),delete a[id];for(id in a)words.push({id:id,src:void 0,res:a[id]});tree={empty:[],complete:[],old:[]};for(i=0;i<words.length;i++)words[i].res?words[i].src?tree.complete.push(words[i]):
tree.old.push(words[i]):tree.empty.push(words[i]);for(s in tree){a={};for(i=0;i<tree[s].length;i++){var b=tree[s][i].src?tree[s][i].src.category:tree[s][i].res.category;a[b]||(a[b]=[]);a[b].push(tree[s][i])}tree[s]=a}buildpage()},buildpage=function(){var a={};for(c in tree.empty){a[c]=$("<div>").attr("class","translatetable").append($("<div>").attr("class","tabletitle").text(c));for(i=0;i<tree.empty[c].length;i++)a[c].append(buildword(tree.empty[c][i]))}for(c in tree.complete){var b=$("<div>");for(i=
0;i<tree.complete[c].length;i++)b.append(buildword(tree.complete[c][i]));a[c]||(a[c]=$("<div>").attr("class","translatetable").append($("<div>").attr("class","tabletitle").text(c)));a[c].append(completedwords(b))}$("#translateroot").remove();var b=$("<div>").attr("id","translateroot"),e=[];for(c in a)e.push(c);e.sort();for(i=0;i<e.length;i++)b.append(a[e[i]]);$("body").append(b)},completedwords=function(a){var b=Math.random().toString().substr(2);return $("<div>").attr("class","rowgroup").append($("<div>").attr("class",
"grouptitle").text("Phrases with translations ("+$(".wordrow",a).size()+")").append($("<a>").attr("href","#").text("show").click(function(){$(this).text()=="hide"?($(this).text("show"),$("#"+b+"group").animate({height:"hide",opacity:0},200)):($(this).text("hide"),$("#"+b+"group").animate({height:"show",opacity:1},200));return!1}))).append(a.attr("id",b+"group").attr("class","grouprows").css({display:"none"}))},buildword=function(a){if(!a.src)return"<div>"+a.id;return $("<div>").attr("class","wordrow").append($("<div>").attr("class",
"descrip").text(a.src.description+" ").append($("<span>").text("[ "+a.id+" ]"))).append($("<div>").attr("class","message").html(a.src.message.replace(/\n/g,"<br>\n"))).append($("<textarea>").attr("id","edit-"+a.id).text(a.res?a.res.message:res[a.id]?res[a.id].message:""))};