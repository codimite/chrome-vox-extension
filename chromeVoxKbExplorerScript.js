var COMPILED=true;var goog=goog||{};goog.global=this;goog.global.CLOSURE_UNCOMPILED_DEFINES;goog.global.CLOSURE_DEFINES;goog.isDef=function(val){return val!==void 0;};goog.exportPath_=function(name,opt_object,opt_objectToExportTo){var parts=name.split('.');var cur=opt_objectToExportTo||goog.global;if(!(parts[0]in cur)&&cur.execScript){cur.execScript('var '+parts[0]);}
for(var part;parts.length&&(part=parts.shift());){if(!parts.length&&goog.isDef(opt_object)){cur[part]=opt_object;}else if(cur[part]){cur=cur[part];}else{cur=cur[part]={};}}};goog.define=function(name,defaultValue){var value=defaultValue;if(!COMPILED){var uncompiledDefines=goog.global.CLOSURE_UNCOMPILED_DEFINES;var defines=goog.global.CLOSURE_DEFINES;if(uncompiledDefines&&(uncompiledDefines).nodeType===undefined&&Object.prototype.hasOwnProperty.call(uncompiledDefines,name)){value=uncompiledDefines[name];}else if(defines&&(defines).nodeType===undefined&&Object.prototype.hasOwnProperty.call(defines,name)){value=defines[name];}}
return value;};goog.DEBUG=true;goog.LOCALE=goog.define('goog.LOCALE','en');goog.TRUSTED_SITE=goog.define('goog.TRUSTED_SITE',true);goog.STRICT_MODE_COMPATIBLE=goog.define('goog.STRICT_MODE_COMPATIBLE',false);goog.provide=function(name){if(!COMPILED){if(goog.isProvided_(name)){throw Error('Namespace "'+name+'" already declared.');}
delete goog.implicitNamespaces_[name];var namespace=name;while((namespace=namespace.substring(0,namespace.lastIndexOf('.')))){if(goog.getObjectByName(namespace)){break;}
goog.implicitNamespaces_[namespace]=true;}}
goog.exportPath_(name);};goog.setTestOnly=function(opt_message){if(COMPILED&&!goog.DEBUG){opt_message=opt_message||'';throw Error('Importing test-only code into non-debug environment'+
opt_message?': '+opt_message:'.');}};goog.forwardDeclare=function(name){};if(!COMPILED){goog.isProvided_=function(name){return!goog.implicitNamespaces_[name]&&goog.isDefAndNotNull(goog.getObjectByName(name));};goog.implicitNamespaces_={};}
goog.getObjectByName=function(name,opt_obj){var parts=name.split('.');var cur=opt_obj||goog.global;for(var part;part=parts.shift();){if(goog.isDefAndNotNull(cur[part])){cur=cur[part];}else{return null;}}
return cur;};goog.globalize=function(obj,opt_global){var global=opt_global||goog.global;for(var x in obj){global[x]=obj[x];}};goog.addDependency=function(relPath,provides,requires){if(goog.DEPENDENCIES_ENABLED){var provide,require;var path=relPath.replace(/\\/g,'/');var deps=goog.dependencies_;for(var i=0;provide=provides[i];i++){deps.nameToPath[provide]=path;if(!(path in deps.pathToNames)){deps.pathToNames[path]={};}
deps.pathToNames[path][provide]=true;}
for(var j=0;require=requires[j];j++){if(!(path in deps.requires)){deps.requires[path]={};}
deps.requires[path][require]=true;}}};goog.ENABLE_DEBUG_LOADER=goog.define('goog.ENABLE_DEBUG_LOADER',true);goog.require=function(name){if(!COMPILED){if(goog.isProvided_(name)){return;}
if(goog.ENABLE_DEBUG_LOADER){var path=goog.getPathFromDeps_(name);if(path){goog.included_[path]=true;goog.writeScripts_();return;}}
var errorMessage='goog.require could not find: '+name;if(goog.global.console){goog.global.console['error'](errorMessage);}
throw Error(errorMessage);}};goog.basePath='';goog.global.CLOSURE_BASE_PATH;goog.global.CLOSURE_NO_DEPS=true;goog.global.CLOSURE_IMPORT_SCRIPT;goog.nullFunction=function(){};goog.identityFunction=function(opt_returnValue,var_args){return opt_returnValue;};goog.abstractMethod=function(){throw Error('unimplemented abstract method');};goog.addSingletonGetter=function(ctor){ctor.getInstance=function(){if(ctor.instance_){return ctor.instance_;}
if(goog.DEBUG){goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=ctor;}
return ctor.instance_=new ctor;};};goog.instantiatedSingletons_=[];goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;if(goog.DEPENDENCIES_ENABLED){goog.included_={};goog.dependencies_={pathToNames:{},nameToPath:{},requires:{},visited:{},written:{}};goog.inHtmlDocument_=function(){var doc=goog.global.document;return typeof doc!='undefined'&&'write'in doc;};goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH){goog.basePath=goog.global.CLOSURE_BASE_PATH;return;}else if(!goog.inHtmlDocument_()){return;}
var doc=goog.global.document;var scripts=doc.getElementsByTagName('script');for(var i=scripts.length-1;i>=0;--i){var src=scripts[i].src;var qmark=src.lastIndexOf('?');var l=qmark==-1?src.length:qmark;if(src.substr(l-7,7)=='base.js'){goog.basePath=src.substr(0,l-7);return;}}};goog.importScript_=function(src){var importScript=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;if(!goog.dependencies_.written[src]&&importScript(src)){goog.dependencies_.written[src]=true;}};goog.writeScriptTag_=function(src){if(goog.inHtmlDocument_()){var doc=goog.global.document;if(doc.readyState=='complete'){var isDeps=/\bdeps.js$/.test(src);if(isDeps){return false;}else{throw Error('Cannot write "'+src+'" after document load');}}
doc.write('<script type="text/javascript" src="'+src+'"></'+'script>');return true;}else{return false;}};goog.writeScripts_=function(){var scripts=[];var seenScript={};var deps=goog.dependencies_;function visitNode(path){if(path in deps.written){return;}
if(path in deps.visited){if(!(path in seenScript)){seenScript[path]=true;scripts.push(path);}
return;}
deps.visited[path]=true;if(path in deps.requires){for(var requireName in deps.requires[path]){if(!goog.isProvided_(requireName)){if(requireName in deps.nameToPath){visitNode(deps.nameToPath[requireName]);}else{throw Error('Undefined nameToPath for '+requireName);}}}}
if(!(path in seenScript)){seenScript[path]=true;scripts.push(path);}}
for(var path in goog.included_){if(!deps.written[path]){visitNode(path);}}
for(var i=0;i<scripts.length;i++){if(scripts[i]){goog.importScript_(goog.basePath+scripts[i]);}else{throw Error('Undefined script input');}}};goog.getPathFromDeps_=function(rule){if(rule in goog.dependencies_.nameToPath){return goog.dependencies_.nameToPath[rule];}else{return null;}};goog.findBasePath_();if(!goog.global.CLOSURE_NO_DEPS){goog.importScript_(goog.basePath+'deps.js');}}
goog.typeOf=function(value){var s=typeof value;if(s=='object'){if(value){if(value instanceof Array){return'array';}else if(value instanceof Object){return s;}
var className=Object.prototype.toString.call((value));if(className=='[object Window]'){return'object';}
if((className=='[object Array]'||typeof value.length=='number'&&typeof value.splice!='undefined'&&typeof value.propertyIsEnumerable!='undefined'&&!value.propertyIsEnumerable('splice'))){return'array';}
if((className=='[object Function]'||typeof value.call!='undefined'&&typeof value.propertyIsEnumerable!='undefined'&&!value.propertyIsEnumerable('call'))){return'function';}}else{return'null';}}else if(s=='function'&&typeof value.call=='undefined'){return'object';}
return s;};goog.isNull=function(val){return val===null;};goog.isDefAndNotNull=function(val){return val!=null;};goog.isArray=function(val){return goog.typeOf(val)=='array';};goog.isArrayLike=function(val){var type=goog.typeOf(val);return type=='array'||type=='object'&&typeof val.length=='number';};goog.isDateLike=function(val){return goog.isObject(val)&&typeof val.getFullYear=='function';};goog.isString=function(val){return typeof val=='string';};goog.isBoolean=function(val){return typeof val=='boolean';};goog.isNumber=function(val){return typeof val=='number';};goog.isFunction=function(val){return goog.typeOf(val)=='function';};goog.isObject=function(val){var type=typeof val;return type=='object'&&val!=null||type=='function';};goog.getUid=function(obj){return obj[goog.UID_PROPERTY_]||(obj[goog.UID_PROPERTY_]=++goog.uidCounter_);};goog.hasUid=function(obj){return!!obj[goog.UID_PROPERTY_];};goog.removeUid=function(obj){if('removeAttribute'in obj){obj.removeAttribute(goog.UID_PROPERTY_);}
try{delete obj[goog.UID_PROPERTY_];}catch(ex){}};goog.UID_PROPERTY_='closure_uid_'+((Math.random()*1e9)>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(obj){var type=goog.typeOf(obj);if(type=='object'||type=='array'){if(obj.clone){return obj.clone();}
var clone=type=='array'?[]:{};for(var key in obj){clone[key]=goog.cloneObject(obj[key]);}
return clone;}
return obj;};goog.bindNative_=function(fn,selfObj,var_args){return(fn.call.apply(fn.bind,arguments));};goog.bindJs_=function(fn,selfObj,var_args){if(!fn){throw new Error();}
if(arguments.length>2){var boundArgs=Array.prototype.slice.call(arguments,2);return function(){var newArgs=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(newArgs,boundArgs);return fn.apply(selfObj,newArgs);};}else{return function(){return fn.apply(selfObj,arguments);};}};goog.bind=function(fn,selfObj,var_args){if(Function.prototype.bind&&Function.prototype.bind.toString().indexOf('native code')!=-1){goog.bind=goog.bindNative_;}else{goog.bind=goog.bindJs_;}
return goog.bind.apply(null,arguments);};goog.partial=function(fn,var_args){var args=Array.prototype.slice.call(arguments,1);return function(){var newArgs=args.slice();newArgs.push.apply(newArgs,arguments);return fn.apply(this,newArgs);};};goog.mixin=function(target,source){for(var x in source){target[x]=source[x];}};goog.now=(goog.TRUSTED_SITE&&Date.now)||(function(){return+new Date();});goog.globalEval=function(script){if(goog.global.execScript){goog.global.execScript(script,'JavaScript');}else if(goog.global.eval){if(goog.evalWorksForGlobals_==null){goog.global.eval('var _et_ = 1;');if(typeof goog.global['_et_']!='undefined'){delete goog.global['_et_'];goog.evalWorksForGlobals_=true;}else{goog.evalWorksForGlobals_=false;}}
if(goog.evalWorksForGlobals_){goog.global.eval(script);}else{var doc=goog.global.document;var scriptElt=doc.createElement('script');scriptElt.type='text/javascript';scriptElt.defer=false;scriptElt.appendChild(doc.createTextNode(script));doc.body.appendChild(scriptElt);doc.body.removeChild(scriptElt);}}else{throw Error('goog.globalEval not available');}};goog.evalWorksForGlobals_=null;goog.cssNameMapping_;goog.cssNameMappingStyle_;goog.getCssName=function(className,opt_modifier){var getMapping=function(cssName){return goog.cssNameMapping_[cssName]||cssName;};var renameByParts=function(cssName){var parts=cssName.split('-');var mapped=[];for(var i=0;i<parts.length;i++){mapped.push(getMapping(parts[i]));}
return mapped.join('-');};var rename;if(goog.cssNameMapping_){rename=goog.cssNameMappingStyle_=='BY_WHOLE'?getMapping:renameByParts;}else{rename=function(a){return a;};}
if(opt_modifier){return className+'-'+rename(opt_modifier);}else{return rename(className);}};goog.setCssNameMapping=function(mapping,opt_style){goog.cssNameMapping_=mapping;goog.cssNameMappingStyle_=opt_style;};goog.global.CLOSURE_CSS_NAME_MAPPING;if(!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING){goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING;}
goog.getMsg=function(str,opt_values){var values=opt_values||{};for(var key in values){var value=(''+values[key]).replace(/\$/g,'$$$$');str=str.replace(new RegExp('\\{\\$'+key+'\\}','gi'),value);}
return str;};goog.getMsgWithFallback=function(a,b){return a;};goog.exportSymbol=function(publicPath,object,opt_objectToExportTo){goog.exportPath_(publicPath,object,opt_objectToExportTo);};goog.exportProperty=function(object,publicName,symbol){object[publicName]=symbol;};goog.inherits=function(childCtor,parentCtor){function tempCtor(){};tempCtor.prototype=parentCtor.prototype;childCtor.superClass_=parentCtor.prototype;childCtor.prototype=new tempCtor();childCtor.prototype.constructor=childCtor;childCtor.base=function(me,methodName,var_args){var args=Array.prototype.slice.call(arguments,2);return parentCtor.prototype[methodName].apply(me,args);};};goog.base=function(me,opt_methodName,var_args){var caller=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||(goog.DEBUG&&!caller)){throw Error('arguments.caller not defined.  goog.base() cannot be used '+'with strict mode code. See '+'http://www.ecma-international.org/ecma-262/5.1/#sec-C');}
if(caller.superClass_){return caller.superClass_.constructor.apply(me,Array.prototype.slice.call(arguments,1));}
var args=Array.prototype.slice.call(arguments,2);var foundCaller=false;for(var ctor=me.constructor;ctor;ctor=ctor.superClass_&&ctor.superClass_.constructor){if(ctor.prototype[opt_methodName]===caller){foundCaller=true;}else if(foundCaller){return ctor.prototype[opt_methodName].apply(me,args);}}
if(me[opt_methodName]===caller){return me.constructor.prototype[opt_methodName].apply(me,args);}else{throw Error('goog.base called from a method of one name '+'to a method of a different name');}};goog.scope=function(fn){fn.call(goog.global);};if(!COMPILED){goog.global['COMPILED']=COMPILED;}
goog.provide('Msgs');Msgs=function(){};Msgs.NAMESPACE_='chromevox_';Msgs.getLocale=function(){return chrome.i18n.getMessage('locale');};Msgs.getMsg=function(messageId,opt_subs){var message=Msgs.Untranslated[messageId.toUpperCase()];if(message!==undefined)
return Msgs.applySubstitutions_(message,opt_subs);message=chrome.i18n.getMessage(Msgs.NAMESPACE_+messageId,opt_subs);if(message==undefined||message==''){throw new Error('Invalid ChromeVox message id: '+messageId);}
return message;};Msgs.addTranslatedMessagesToDom=function(root){var elts=root.querySelectorAll('.i18n');for(var i=0;i<elts.length;i++){var msgid=elts[i].getAttribute('msgid');if(!msgid){throw new Error('Element has no msgid attribute: '+elts[i]);}
var val=this.getMsg(msgid);if(elts[i].tagName=='INPUT'){elts[i].setAttribute('placeholder',val);}else{elts[i].textContent=val;}
elts[i].classList.add('i18n-processed');}};Msgs.getNumber=function(num){return''+num;};Msgs.applySubstitutions_=function(message,opt_subs){if(opt_subs){for(var i=0;i<opt_subs.length;i++){message=message.replace('$'+(i+1),opt_subs[i]);}}
return message;};Msgs.Untranslated={CHECKBOX_UNCHECKED_STATE_BRL:'( )',CHECKBOX_CHECKED_STATE_BRL:'(x)',RADIO_UNSELECTED_STATE_BRL:'( )',RADIO_SELECTED_STATE_BRL:'(x)',ARIA_HAS_SUBMENU_BRL:'->',ROLE_OPTION:' ',ROLE_OPTION_BRL:' ',ARIA_CHECKED_TRUE_BRL:'(x)',ARIA_CHECKED_FALSE_BRL:'( )',ARIA_CHECKED_MIXED_BRL:'(-)',ARIA_DISABLED_TRUE_BRL:'xx',ARIA_EXPANDED_TRUE_BRL:'-',ARIA_EXPANDED_FALSE_BRL:'+',ARIA_INVALID_TRUE_BRL:'!',ARIA_PRESSED_TRUE_BRL:'=',ARIA_PRESSED_FALSE_BRL:' ',ARIA_PRESSED_MIXED_BRL:'-',ARIA_SELECTED_TRUE_BRL:'(x)',ARIA_SELECTED_FALSE_BRL:'( )',HAS_SUBMENU_BRL:'->',TAG_TIME_BRL:' ',ARIA_VALUE_NOW:'$1',ARIA_VALUE_NOW_BRL:'$1',ARIA_VALUE_TEXT:'$1',ARIA_VALUE_TEXT_BRL:'$1',};goog.provide('cvox.ChromeVox');goog.addDependency('../host/interface/abstract_host.js',['cvox.AbstractHost'],[]);goog.addDependency('../host/interface/tts_interface.js',['cvox.TtsInterface'],[]);goog.addDependency('../host/interface/braille_interface.js',['cvox.BrailleInterface'],[]);goog.addDependency('../host/interface/mathjax_interface.js',['cvox.MathJaxInterface'],[]);goog.addDependency('../chromevox/messages/msgs.js',['Msgs'],[]);goog.addDependency('../host/interface/abstract_earcons.js',['cvox.AbstractEarcons'],[]);goog.addDependency('../chromevox/common/key_sequence.js',['cvox.KeySequence'],[]);goog.addDependency('../chromevox/injected/navigation_manager.js',['cvox.NavigationManager'],[]);goog.addDependency('../chromevox/injected/serializer.js',['cvox.Serializer'],[]);cvox.VERBOSITY_VERBOSE=0;cvox.VERBOSITY_BRIEF=1;cvox.ChromeVox=function(){};cvox.ChromeVox.host=null;cvox.ChromeVox.tts;cvox.ChromeVox.braille;cvox.ChromeVox.mathJax;cvox.ChromeVox.isActive=true;cvox.ChromeVox.version=null;cvox.ChromeVox.earcons=null;cvox.ChromeVox.navigationManager=null;cvox.ChromeVox.serializer=null;cvox.ChromeVox.isStickyPrefOn=false;cvox.ChromeVox.stickyOverride=null;cvox.ChromeVox.keyPrefixOn=false;cvox.ChromeVox.verbosity=cvox.VERBOSITY_VERBOSE;cvox.ChromeVox.typingEcho=0;cvox.ChromeVox.keyEcho={};cvox.Point;cvox.ChromeVox.position={};cvox.ChromeVox.isChromeOS=navigator.userAgent.indexOf('CrOS')!=-1;cvox.ChromeVox.isMac=navigator.platform.indexOf('Mac')!=-1;cvox.ChromeVox.modKeyStr;if(cvox.ChromeVox.isChromeOS){cvox.ChromeVox.modKeyStr='Shift+Search';}else if(cvox.ChromeVox.isMac){cvox.ChromeVox.modKeyStr='Ctrl+Cmd';}else{cvox.ChromeVox.modKeyStr='Shift+Alt';}
cvox.ChromeVox.sequenceSwitchKeyCodes=[];cvox.ChromeVox.visitedUrls={};cvox.ChromeVox.markInUserCommand=function(){};cvox.ChromeVox.syncToNode=function(targetNode,speakNode,opt_queueMode){};cvox.ChromeVox.speakNode=function(targetNode,queueMode,properties){};cvox.ChromeVox.executeUserCommand=function(commandName){};cvox.ChromeVox.entireDocumentIsHidden=false;cvox.ChromeVox.storeOn=function(store){store['isStickyPrefOn']=cvox.ChromeVox.isStickyPrefOn;cvox.ChromeVox.navigationManager.storeOn(store);};cvox.ChromeVox.readFrom=function(store){cvox.ChromeVox.isStickyPrefOn=store['isStickyPrefOn'];cvox.ChromeVox.navigationManager.readFrom(store);};cvox.ChromeVox.isStickyModeOn=function(){if(cvox.ChromeVox.stickyOverride!==null){return cvox.ChromeVox.stickyOverride;}else{return cvox.ChromeVox.isStickyPrefOn;}};function $(id){return document.getElementById(id);}
cvox.ChromeVox.injectChromeVoxIntoTabs=function(tabs){};cvox.ChromeVox.documentHasFocus=function(){if(!document.hasFocus()||document.hidden){return false;}
if(document.activeElement.tagName=='IFRAME'||document.activeElement.tagName=='WEBVIEW'){return false;}
return true;};goog.provide('cvox.PlatformFilter');goog.provide('cvox.PlatformUtil');goog.require('cvox.ChromeVox');cvox.PlatformFilter={NONE:0,WINDOWS:1,MAC:2,LINUX:4,WML:7,CHROMEOS:8,ANDROID:16};cvox.PlatformUtil.matchesPlatform=function(filter){var uA=navigator.userAgent;if(filter==undefined){return true;}else if(uA.indexOf('Android')!=-1){return(filter&cvox.PlatformFilter.ANDROID)!=0;}else if(uA.indexOf('Win')!=-1){return(filter&cvox.PlatformFilter.WINDOWS)!=0;}else if(uA.indexOf('Mac')!=-1){return(filter&cvox.PlatformFilter.MAC)!=0;}else if(uA.indexOf('Linux')!=-1){return(filter&cvox.PlatformFilter.LINUX)!=0;}else if(uA.indexOf('CrOS')!=-1){return(filter&cvox.PlatformFilter.CHROMEOS)!=0;}
return false;};goog.provide('cvox.KeySequence');goog.require('cvox.ChromeVox');goog.require('cvox.PlatformFilter');cvox.KeySequence=function(originalEvent,opt_cvoxModifier,opt_doubleTap,opt_skipStripping){this.doubleTap=!!opt_doubleTap;this.platformFilter;this.skipStripping=!!opt_skipStripping;if(opt_cvoxModifier==undefined){this.cvoxModifier=this.isCVoxModifierActive(originalEvent);}else{this.cvoxModifier=opt_cvoxModifier;}
this.stickyMode=!!originalEvent['stickyMode'];this.prefixKey=!!originalEvent['keyPrefix'];if(this.stickyMode&&this.prefixKey){throw'Prefix key and sticky mode cannot both be enabled: '+originalEvent;}
var event=this.resolveChromeOSSpecialKeys_(originalEvent);this.keys={ctrlKey:[],searchKeyHeld:[],altKey:[],altGraphKey:[],shiftKey:[],metaKey:[],keyCode:[]};this.extractKey_(event);};cvox.KeySequence.KEY_PRESS_CODE={39:222,44:188,45:189,46:190,47:191,59:186,91:219,92:220,93:221};cvox.KeySequence.doubleTapCache=[];cvox.KeySequence.prototype.addKeyEvent=function(additionalKeyEvent){if(this.keys.keyCode.length>1){return false;}
this.extractKey_(additionalKeyEvent);return true;};cvox.KeySequence.prototype.equals=function(rhs){if(!this.checkKeyEquality_(rhs)){return false;}
if(this.doubleTap!=rhs.doubleTap){return false;}
if(this.cvoxModifier===rhs.cvoxModifier){return true;}
var unmodified=this.cvoxModifier?rhs:this;return unmodified.stickyMode||unmodified.prefixKey;};cvox.KeySequence.prototype.extractKey_=function(keyEvent){for(var prop in this.keys){if(prop=='keyCode'){var keyCode;if(keyEvent.type=='keypress'&&keyEvent[prop]>=97&&keyEvent[prop]<=122){keyCode=keyEvent[prop]-32;}else if(keyEvent.type=='keypress'){keyCode=cvox.KeySequence.KEY_PRESS_CODE[keyEvent[prop]];}
this.keys[prop].push(keyCode||keyEvent[prop]);}else{if(this.isKeyModifierActive(keyEvent,prop)){this.keys[prop].push(true);}else{this.keys[prop].push(false);}}}
if(this.cvoxModifier){this.rationalizeKeys_();}};cvox.KeySequence.prototype.rationalizeKeys_=function(){if(this.skipStripping){return;}
var modifierKeyCombo=cvox.ChromeVox.modKeyStr.split(/\+/g);var index=this.keys.keyCode.length-1;if(modifierKeyCombo.indexOf('Ctrl')!=-1){this.keys.ctrlKey[index]=false;}
if(modifierKeyCombo.indexOf('Alt')!=-1){this.keys.altKey[index]=false;}
if(modifierKeyCombo.indexOf('Shift')!=-1){this.keys.shiftKey[index]=false;}
var metaKeyName=this.getMetaKeyName_();if(modifierKeyCombo.indexOf(metaKeyName)!=-1){if(metaKeyName=='Search'){this.keys.searchKeyHeld[index]=false;this.keys.metaKey[index]=false;}else if(metaKeyName=='Cmd'||metaKeyName=='Win'){this.keys.metaKey[index]=false;}}};cvox.KeySequence.prototype.getMetaKeyName_=function(){if(cvox.ChromeVox.isChromeOS){return'Search';}else if(cvox.ChromeVox.isMac){return'Cmd';}else{return'Win';}};cvox.KeySequence.prototype.checkKeyEquality_=function(rhs){for(var i in this.keys){for(var j=this.keys[i].length;j--;){if(this.keys[i][j]!==rhs.keys[i][j])
return false;}}
return true;};cvox.KeySequence.prototype.getFirstKeyCode=function(){return this.keys.keyCode[0];};cvox.KeySequence.prototype.length=function(){return this.keys.keyCode.length;};cvox.KeySequence.prototype.isModifierKey=function(keyCode){return keyCode==16||keyCode==17||keyCode==18||keyCode==91||keyCode==93;};cvox.KeySequence.prototype.isCVoxModifierActive=function(keyEvent){var modifierKeyCombo=cvox.ChromeVox.modKeyStr.split(/\+/g);if(this.isKeyModifierActive(keyEvent,'ctrlKey')){modifierKeyCombo=modifierKeyCombo.filter(function(modifier){return modifier!='Ctrl';});}
if(this.isKeyModifierActive(keyEvent,'altKey')){modifierKeyCombo=modifierKeyCombo.filter(function(modifier){return modifier!='Alt';});}
if(this.isKeyModifierActive(keyEvent,'shiftKey')){modifierKeyCombo=modifierKeyCombo.filter(function(modifier){return modifier!='Shift';});}
if(this.isKeyModifierActive(keyEvent,'metaKey')||this.isKeyModifierActive(keyEvent,'searchKeyHeld')){var metaKeyName=this.getMetaKeyName_();modifierKeyCombo=modifierKeyCombo.filter(function(modifier){return modifier!=metaKeyName;});}
return(modifierKeyCombo.length==0);};cvox.KeySequence.prototype.isKeyModifierActive=function(keyEvent,modifier){switch(modifier){case'ctrlKey':return(keyEvent.ctrlKey||keyEvent.keyCode==17);break;case'altKey':return(keyEvent.altKey||(keyEvent.keyCode==18));break;case'shiftKey':return(keyEvent.shiftKey||(keyEvent.keyCode==16));break;case'metaKey':return(keyEvent.metaKey||(keyEvent.keyCode==91));break;case'searchKeyHeld':return((cvox.ChromeVox.isChromeOS&&keyEvent.keyCode==91)||keyEvent['searchKeyHeld']);break;}
return false;};cvox.KeySequence.prototype.isAnyModifierActive=function(){for(var modifierType in this.keys){for(var i=0;i<this.length();i++){if(this.keys[modifierType][i]&&modifierType!='keyCode'){return true;}}}
return false;};cvox.KeySequence.deserialize=function(sequenceObject){var firstSequenceEvent={};firstSequenceEvent['stickyMode']=(sequenceObject.stickyMode==undefined)?false:sequenceObject.stickyMode;firstSequenceEvent['prefixKey']=(sequenceObject.prefixKey==undefined)?false:sequenceObject.prefixKey;var secondKeyPressed=sequenceObject.keys.keyCode.length>1;var secondSequenceEvent={};for(var keyPressed in sequenceObject.keys){firstSequenceEvent[keyPressed]=sequenceObject.keys[keyPressed][0];if(secondKeyPressed){secondSequenceEvent[keyPressed]=sequenceObject.keys[keyPressed][1];}}
var skipStripping=sequenceObject.skipStripping!==undefined?sequenceObject.skipStripping:true;var keySeq=new cvox.KeySequence(firstSequenceEvent,sequenceObject.cvoxModifier,sequenceObject.doubleTap,skipStripping);if(secondKeyPressed){cvox.ChromeVox.sequenceSwitchKeyCodes.push(new cvox.KeySequence(firstSequenceEvent,sequenceObject.cvoxModifier));keySeq.addKeyEvent(secondSequenceEvent);}
if(sequenceObject.doubleTap){cvox.KeySequence.doubleTapCache.push(keySeq);}
return keySeq;};cvox.KeySequence.fromStr=function(keyStr){var sequenceEvent={};var secondSequenceEvent={};var secondKeyPressed;if(keyStr.indexOf('>')==-1){secondKeyPressed=false;}else{secondKeyPressed=true;}
var cvoxPressed=false;sequenceEvent['stickyMode']=false;sequenceEvent['prefixKey']=false;var tokens=keyStr.split('+');for(var i=0;i<tokens.length;i++){var seqs=tokens[i].split('>');for(var j=0;j<seqs.length;j++){if(seqs[j].charAt(0)=='#'){var keyCode=parseInt(seqs[j].substr(1),10);if(j>0){secondSequenceEvent['keyCode']=keyCode;}else{sequenceEvent['keyCode']=keyCode;}}
var keyName=seqs[j];if(seqs[j].length==1){if(j>0){secondSequenceEvent['keyCode']=seqs[j].charCodeAt(0);}else{sequenceEvent['keyCode']=seqs[j].charCodeAt(0);}}else{if(j>0){cvox.KeySequence.setModifiersOnEvent_(keyName,secondSequenceEvent);if(keyName=='Cvox'){cvoxPressed=true;}}else{cvox.KeySequence.setModifiersOnEvent_(keyName,sequenceEvent);if(keyName=='Cvox'){cvoxPressed=true;}}}}}
var keySeq=new cvox.KeySequence(sequenceEvent,cvoxPressed);if(secondKeyPressed){keySeq.addKeyEvent(secondSequenceEvent);}
return keySeq;};cvox.KeySequence.setModifiersOnEvent_=function(keyName,seqEvent){if(keyName=='Ctrl'){seqEvent['ctrlKey']=true;seqEvent['keyCode']=17;}else if(keyName=='Alt'){seqEvent['altKey']=true;seqEvent['keyCode']=18;}else if(keyName=='Shift'){seqEvent['shiftKey']=true;seqEvent['keyCode']=16;}else if(keyName=='Search'){seqEvent['searchKeyHeld']=true;seqEvent['keyCode']=91;}else if(keyName=='Cmd'){seqEvent['metaKey']=true;seqEvent['keyCode']=91;}else if(keyName=='Win'){seqEvent['metaKey']=true;seqEvent['keyCode']=91;}else if(keyName=='Insert'){seqEvent['keyCode']=45;}};cvox.KeySequence.prototype.resolveChromeOSSpecialKeys_=function(originalEvent){if(!this.cvoxModifier||this.stickyMode||this.prefixKey||!cvox.ChromeVox.isChromeOS){return originalEvent;}
var evt={};for(var key in originalEvent){evt[key]=originalEvent[key];}
switch(evt['keyCode']){case 33:evt['keyCode']=38;break;case 34:evt['keyCode']=40;break;case 35:evt['keyCode']=39;break;case 36:evt['keyCode']=37;break;case 45:evt['keyCode']=190;break;case 46:evt['keyCode']=8;break;case 112:evt['keyCode']=49;break;case 113:evt['keyCode']=50;break;case 114:evt['keyCode']=51;break;case 115:evt['keyCode']=52;break;case 116:evt['keyCode']=53;break;case 117:evt['keyCode']=54;break;case 118:evt['keyCode']=55;break;case 119:evt['keyCode']=56;break;case 120:evt['keyCode']=57;break;case 121:evt['keyCode']=48;break;case 122:evt['keyCode']=189;break;case 123:evt['keyCode']=187;break;}
return evt;};goog.provide('cvox.KeyUtil');goog.provide('cvox.SimpleKeyEvent');goog.require('Msgs');goog.require('cvox.ChromeVox');goog.require('cvox.KeySequence');cvox.SimpleKeyEvent;cvox.KeyUtil=function(){};cvox.KeyUtil.modeKeyPressTime=0;cvox.KeyUtil.sequencing=false;cvox.KeyUtil.prevKeySequence=null;cvox.KeyUtil.stickyKeySequence=null;cvox.KeyUtil.maxSeqLength=2;cvox.KeyUtil.keyEventToKeySequence=function(keyEvent){var util=cvox.KeyUtil;if(util.prevKeySequence&&(util.maxSeqLength==util.prevKeySequence.length())){util.sequencing=false;util.prevKeySequence=null;}
var keyIsPrefixed=util.sequencing||keyEvent['keyPrefix']||keyEvent['stickyMode'];var keySequence=new cvox.KeySequence(keyEvent);var keyWasCvox=keySequence.cvoxModifier;if(keyIsPrefixed||keyWasCvox){if(!util.sequencing&&util.isSequenceSwitchKeyCode(keySequence)){util.sequencing=true;util.prevKeySequence=keySequence;return keySequence;}else if(util.sequencing){if(util.prevKeySequence.addKeyEvent(keyEvent)){keySequence=util.prevKeySequence;util.prevKeySequence=null;util.sequencing=false;return keySequence;}else{throw'Think sequencing is enabled, yet util.prevKeySequence already'+'has two key codes'+util.prevKeySequence;}}}else{util.sequencing=false;}
var currTime=new Date().getTime();if(cvox.KeyUtil.isDoubleTapKey(keySequence)&&util.prevKeySequence&&keySequence.equals(util.prevKeySequence)){var prevTime=util.modeKeyPressTime;if(prevTime>0&&currTime-prevTime<300){keySequence=util.prevKeySequence;keySequence.doubleTap=true;util.prevKeySequence=null;util.sequencing=false;if(cvox.ChromeVox.isChromeOS&&keyEvent.keyCode==cvox.KeyUtil.getStickyKeyCode()){cvox.ChromeVox.searchKeyHeld=false;}
return keySequence;}}
util.prevKeySequence=keySequence;util.modeKeyPressTime=currTime;return keySequence;};cvox.KeyUtil.keyCodeToString=function(keyCode){if(keyCode==17){return'Ctrl';}
if(keyCode==18){return'Alt';}
if(keyCode==16){return'Shift';}
if((keyCode==91)||(keyCode==93)){if(cvox.ChromeVox.isChromeOS){return'Search';}else if(cvox.ChromeVox.isMac){return'Cmd';}else{return'Win';}}
if(keyCode==45){return'Insert';}
if(keyCode>=65&&keyCode<=90){return String.fromCharCode(keyCode);}else if(keyCode>=48&&keyCode<=57){return String.fromCharCode(keyCode);}else{return'#'+keyCode;}};cvox.KeyUtil.modStringToKeyCode=function(keyString){switch(keyString){case'Ctrl':return 17;case'Alt':return 18;case'Shift':return 16;case'Cmd':case'Win':return 91;}
return-1;};cvox.KeyUtil.cvoxModKeyCodes=function(){var modKeyCombo=cvox.ChromeVox.modKeyStr.split(/\+/g);var modKeyCodes=modKeyCombo.map(function(keyString){return cvox.KeyUtil.modStringToKeyCode(keyString);});return modKeyCodes;};cvox.KeyUtil.isSequenceSwitchKeyCode=function(rhKeySeq){for(var i=0;i<cvox.ChromeVox.sequenceSwitchKeyCodes.length;i++){var lhKeySeq=cvox.ChromeVox.sequenceSwitchKeyCodes[i];if(lhKeySeq.equals(rhKeySeq)){return true;}}
return false;};cvox.KeyUtil.getReadableNameForKeyCode=function(keyCode){var msg=Msgs.getMsg.bind(Msgs);var cros=cvox.ChromeVox.isChromeOS;if(keyCode==0){return'Power button';}else if(keyCode==17){return'Control';}else if(keyCode==18){return'Alt';}else if(keyCode==16){return'Shift';}else if(keyCode==9){return'Tab';}else if((keyCode==91)||(keyCode==93)){if(cros){return'Search';}else if(cvox.ChromeVox.isMac){return'Cmd';}else{return'Win';}}else if(keyCode==8){return'Backspace';}else if(keyCode==32){return'Space';}else if(keyCode==35){return'end';}else if(keyCode==36){return'home';}else if(keyCode==37){return'Left arrow';}else if(keyCode==38){return'Up arrow';}else if(keyCode==39){return'Right arrow';}else if(keyCode==40){return'Down arrow';}else if(keyCode==45){return'Insert';}else if(keyCode==13){return'Enter';}else if(keyCode==27){return'Escape';}else if(keyCode==112){return cros?msg('back_key'):'F1';}else if(keyCode==113){return cros?msg('forward_key'):'F2';}else if(keyCode==114){return cros?msg('refresh_key'):'F3';}else if(keyCode==115){return cros?msg('toggle_full_screen_key'):'F4';}else if(keyCode==116){return cros?msg('window_overview_key'):'F5';}else if(keyCode==117){return cros?msg('brightness_down_key'):'F6';}else if(keyCode==118){return cros?msg('brightness_up_key'):'F7';}else if(keyCode==119){return cros?msg('volume_mute_key'):'F8';}else if(keyCode==120){return cros?msg('volume_down_key'):'F9';}else if(keyCode==121){return cros?msg('volume_up_key'):'F10';}else if(keyCode==122){return'F11';}else if(keyCode==123){return'F12';}else if(keyCode==186){return'Semicolon';}else if(keyCode==187){return'Equal sign';}else if(keyCode==188){return'Comma';}else if(keyCode==189){return'Dash';}else if(keyCode==190){return'Period';}else if(keyCode==191){return'Forward slash';}else if(keyCode==192){return'Grave accent';}else if(keyCode==219){return'Open bracket';}else if(keyCode==220){return'Back slash';}else if(keyCode==221){return'Close bracket';}else if(keyCode==222){return'Single quote';}else if(keyCode==115){return'Toggle full screen';}else if(keyCode>=48&&keyCode<=90){return String.fromCharCode(keyCode);}
return'';};cvox.KeyUtil.getStickyKeyCode=function(){var stickyKeyCode=45;if(cvox.ChromeVox.isChromeOS||cvox.ChromeVox.isMac){stickyKeyCode=91;}
return stickyKeyCode;};cvox.KeyUtil.getReadableNameForStr=function(keyStr){return null;};cvox.KeyUtil.keySequenceToString=function(keySequence,opt_readableKeyCode,opt_modifiers){var str='';var numKeys=keySequence.length();for(var index=0;index<numKeys;index++){if(str!=''&&!opt_modifiers){str+='>';}else if(str!=''){str+='+';}
var tempStr='';for(var keyPressed in keySequence.keys){if(!keySequence.keys[keyPressed][index]){continue;}
var modifier='';switch(keyPressed){case'ctrlKey':modifier='Ctrl';break;case'searchKeyHeld':var searchKey=cvox.KeyUtil.getReadableNameForKeyCode(91);modifier=searchKey;break;case'altKey':modifier='Alt';break;case'altGraphKey':modifier='AltGraph';break;case'shiftKey':modifier='Shift';break;case'metaKey':var metaKey=cvox.KeyUtil.getReadableNameForKeyCode(91);modifier=metaKey;break;case'keyCode':var keyCode=keySequence.keys[keyPressed][index];if(!keySequence.isModifierKey(keyCode)&&!opt_modifiers){if(opt_readableKeyCode){tempStr+=cvox.KeyUtil.getReadableNameForKeyCode(keyCode);}else{tempStr+=cvox.KeyUtil.keyCodeToString(keyCode);}}}
if(str.indexOf(modifier)==-1){tempStr+=modifier+'+';}}
str+=tempStr;if(str[str.length-1]=='+'){str=str.slice(0,-1);}}
if(keySequence.cvoxModifier||keySequence.prefixKey){if(str!=''){str='ChromeVox+'+str;}else{str='Cvox';}}else if(keySequence.stickyMode){if(str[str.length-1]=='>'){str=str.slice(0,-1);}
str=str+'+'+str;}
return str;};cvox.KeyUtil.isDoubleTapKey=function(key){var isSet=false;var originalState=key.doubleTap;key.doubleTap=true;for(var i=0,keySeq;keySeq=cvox.KeySequence.doubleTapCache[i];i++){if(keySeq.equals(key)){isSet=true;break;}}
key.doubleTap=originalState;return isSet;};goog.provide('cvox.KbExplorer');goog.require('cvox.KeyUtil');cvox.KbExplorer=function(){};cvox.KbExplorer.init=function(){var backgroundWindow=chrome.extension.getBackgroundPage();backgroundWindow.addEventListener('keydown',cvox.KbExplorer.onKeyDown,true);backgroundWindow.addEventListener('keyup',cvox.KbExplorer.onKeyUp,true);backgroundWindow.addEventListener('keypress',cvox.KbExplorer.onKeyPress,true);window.onbeforeunload=function(evt){backgroundWindow.removeEventListener('keydown',cvox.KbExplorer.onKeyDown,true);backgroundWindow.removeEventListener('keyup',cvox.KbExplorer.onKeyUp,true);backgroundWindow.removeEventListener('keypress',cvox.KbExplorer.onKeyPress,true);};};cvox.KbExplorer.onKeyDown=function(evt){chrome.extension.getBackgroundPage()['speak'](cvox.KeyUtil.getReadableNameForKeyCode(evt.keyCode),false,{});if(evt.keyCode==87&&evt.ctrlKey){return true;}
evt.preventDefault();evt.stopPropagation();return false;};cvox.KbExplorer.onKeyUp=function(evt){evt.preventDefault();evt.stopPropagation();};cvox.KbExplorer.onKeyPress=function(evt){evt.preventDefault();evt.stopPropagation();};goog.require('cvox.KbExplorer');document.addEventListener('DOMContentLoaded',function(){cvox.KbExplorer.init();},false);
