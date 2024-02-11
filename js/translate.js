function GTranslateGetCurrentLang(){var keyValue=document['cookie'].match('(^|;) ?googtrans=([^;]*)(;|$)');return keyValue?keyValue[2].split('/')[2]:null;}
function GTranslateFireEvent(element,event){try{if(document.createEventObject){var evt=document.createEventObject();element.fireEvent('on'+event,evt)}else{var evt=document.createEvent('HTMLEvents');evt.initEvent(event,true,true);element.dispatchEvent(evt)}}catch(e){}}
function doGTranslate(lang_pair){if(lang_pair.value)lang_pair=lang_pair.value;if(lang_pair=='')return;var lang=lang_pair.split('|')[1];if(GTranslateGetCurrentLang()==null&&lang==lang_pair.split('|')[0])return;if(typeof ga!='undefined'){ga('send','event','GTranslate',lang,location.hostname+location.pathname+location.search);}else{if(typeof _gaq!='undefined')_gaq.push(['_trackEvent','GTranslate',lang,location.hostname+location.pathname+location.search]);}var teCombo;var sel=document.getElementsByTagName('select');for(var i=0;i<sel.length;i++)if(/goog-te-combo/.test(sel[i].className)){teCombo=sel[i];break;}if(document.getElementById('google_translate_element2')==null||document.getElementById('google_translate_element2').innerHTML.length==0||teCombo.length==0||teCombo.innerHTML.length==0){setTimeout(function(){doGTranslate(lang_pair)},500)}else{teCombo.value=lang;GTranslateFireEvent(teCombo,'change');GTranslateFireEvent(teCombo,'change')}}
function doGTranslate(a){if(a.value)a=a.value;if(a=='')return;if(a=='auto')return autoTranslate();var b=a.split('|')[1];var c;var d=document.getElementsByTagName('select');for(var i=0;i<d.length;i++)
if(d[i].className=='goog-te-combo')c=d[i];if(document.getElementById('google_translate_element2')==null||document.getElementById('google_translate_element2').innerHTML.length==0||c.length==0||c.innerHTML.length==0){setTimeout(function(){doGTranslate({value:a})},500)}else{c.value=b;GTranslateFireEvent(c,'change');}}
document.addEventListener("DOMContentLoaded",()=>{const select=document.querySelector("select")
function autoTranslate(){let lang=navigator.language;let value=`en|${lang}`
let foundOption=Array.from(select.options).find((option)=>{return option.value.split("-")[0]==value.split("-")[0]})
if(foundOption&&!foundOption.value.includes("-"))value=value.split("-")[0]
if(!foundOption){const newOption=document.createElement("option")
newOption.value=value
newOption.text=lang.toUpperCase()
select.appendChild(newOption)}
select.value=value
select.dispatchEvent(new Event("change"))}
autoTranslate()})