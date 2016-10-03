<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Fairview Directory</title>

<meta http-equiv="Content-Type" content="text/html; CHARSET=utf-8" />

<!--files needed for the ftp'd/automatic menu process developed. This file is content managed on UCMSTAGE with Content ID: FV_NOLEFTNAV_CSS-->
<link href="/fv/groups/ssadminview/documents/web_assets/styles.css" rel="stylesheet" type="text/css" />
<link href="/fv/groups/ssadminview/documents/web_assets/colorbox.css" rel="stylesheet" type="text/css" />
<link href="/fv/groups/ssadminview/documents/web_assets/fv_jquery_ui_css.css" rel="stylesheet" type="text/css" />
<link href="/fv/groups/ssadminview/documents/web_assets/intranet_print_styles.css" rel="stylesheet" type="text/css" media="print" />

<!--IE specific mods-->
<!--[if lte IE 6]><link rel="stylesheet" type="text/css" href="<link href="/fv/groups/ssadminview/documents/web_assets/styles-iefix.css" rel="stylesheet" type="text/css" />" /><![endif]-->
<!--//IE specific mods-->


<script type="text/javascript" src="/fv/groups/ssadminview/documents/web_assets/fv_jquery_library.js"></script>
<script src="/fv/groups/ssadminview/documents/web_assets/fv_jquery_ui_library.js" type="text/javascript"></script>

<script src="/fv/groups/ssadminview/documents/web_assets/json2.js" type="text/javascript"></script>
<script src="/fv/groups/ssadminview/documents/web_assets/jquery.colorbox-min.js" type="text/javascript"></script>
<script type="text/javascript" src="/fv/groups/ssadminview/documents/web_assets/recentpages.js"></script>
<script type="text/javascript">

  //FAIRVIEW GLOBAL JAVASCRIPT VARIABLES (THE IDOC VERSIONS ARE SET IN INTRANET STANDARD HEAD CONTENT FRAG)
  var urlProtocol = window.location.protocol;
  //alert("protocol: " + urlProtocol);

  //var JiveBaseURL = urlProtocol + "//intr-stats.fairview.org/"; //stage
  var JiveBaseURL = urlProtocol + "//intranet1.fairview.org/"; //prod
  //var GoogleAnalyticsInstance = "fv_disabled"; //disable
  var GoogleAnalyticsInstance = "fv_intranet"; //enabled
  //var BaseUrl = urlProtocol + "//intranettest.fairview.org"; //load testing
  //var BaseUrl = urlProtocol + "//ucm-intranet1.fairview.org/intranet"; //pre go-live
  var BaseUrl = urlProtocol + "//intranet.fairview.org"; //go-live/prod
  //var BaseDomain = urlProtocol + "//intranettest.fairview.org"; //load testing
  //var BaseDomain = urlProtocol + "//ucm-intranet1.fairview.org"; //pre go-live
  var BaseDomain = urlProtocol + "//intranet.fairview.org"; //prod

  var tickle = document.createElement("script");
  tickle.type = "text/javascript";
  tickle.src = BaseDomain + "/tickle/";
    //document.getElementsByTagName('head')[0].appendChild(tickle);

  var userprefsLink = document.createElement("script");
  userprefsLink.type = "text/javascript";
  userprefsLink.src = BaseDomain + "/userprefs/";
  document.getElementsByTagName('head')[0].appendChild(userprefsLink);
     var recentupdates = document.createElement("script");
  recentupdates.type = "text/javascript";
  recentupdates.src = BaseDomain + "/recentupdates/";
  document.getElementsByTagName('head')[0].appendChild(recentupdates);
  </script>
<script type="text/javascript">
  function getServices() {
      $.getScript(tickle.src);
     // $.getScript(userprefsLink.src);
     // $.getScript(recentupdates.src);
      getQuickLinks();
      getRecentPages();
      populateRecentUpdates();
  }
  function populateRecentUpdates() {
      var ul = document.createElement('ul');
             for (i = 0; i < recentUpdates.updates.length; i++) {
          var title = recentUpdates.updates[i].recentUpdateTitle
          if (title != undefined) {
              var a = document.createElement('a');
              var tn = document.createTextNode(title);
              var url = recentUpdates.updates[i].recentUpdateUrl
              a.setAttribute('href', url);
              a.appendChild(tn);
              var li = document.createElement('li');
              li.appendChild(a);
              ul.appendChild(li);
                        }
      }
      $('#recent-updates').empty();
      $('#recent-updates').html(ul);
}
</script>
		<link rel="stylesheet" type="text/css" href="PhoneDirectory.css" />
		<link type="text/css" rel="Stylesheet" href="/2006/CSS/Intranet.css" />
               <link rel="stylesheet" type="text/css" href="PhoneDirectoryPrint.css" media="print" />
		<meta name="keywords" content="" />
	</head>
	
<!--Body-->
<body onload="getServices()">
<div id="body-image">
  <div id="center-wrapper">
    <div id="float-wrapper">
      <!--Header-->
<!--this file assumes you have added the following to the hosting page:
/fv/groups/ssadminview/documents/web_assets/styles.css
/fv/groups/ssadminview/documents/web_assets/styles-iefix.css
/fv/groups/ssadminview/documents/web_assets/fv_jquery_library.js
This file is maintained on the ucmstage.fairview.org server -->
<!--googleoff: all -->
<!-- Global - HEADER - Start -->
<!-- Global - Top Ribbon - Start -->
<DIV id='top-ribbon'>
<DIV id='top-ribbon-logo'><A href='http://intranet.fairview.org/index.htm'><IMG height=23 alt=Intranet
src="/fv/groups/intranet/documents/web_assets/hdr-text-intranet.gif" width=126 border=0></A></DIV>
<DIV id='top-ribbon-navigation'>
  <DIV id="TopRibbon1"> </DIV>
</DIV>
</DIV>
<!-- Global - Top Ribbon - End -->
<!-- Global - Header - Start -->
<DIV id='header'>
<DIV id=fairview-logo><A href='http://intranet.fairview.org/index.htm'><IMG height=51 alt=Fairview
src="/fv/groups/intranet/documents/web_assets/main-fairview-logo.gif" width=202 border="0"></A></DIV>
<DIV id=header-navigation>
  <UL>
    <!-- Global - Header - About Fairview - Start -->
    <LI>
      <div id="MenuTitle2"></div>
      <DIV class="single-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock2"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn2"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn2"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - About Fairview - End -->
    <!-- Global - Header - Clinical Teams - Start -->
    <LI>
      <div id="MenuTitle3"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock3"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn3"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn3"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Clinical Teams - End -->
    <!-- Global - Header - Business Services - Start -->
    <LI>
      <div id="MenuTitle4"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock4"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn4"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn4"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Business Services - End -->
    <!-- Global - Header - Resources - Start -->
    <LI>
      <div id="MenuTitle5"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock5"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn5"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn5"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Resources - End -->
    <!-- Global - Header - Applications - Start -->
    <LI>
      <div id="MenuTitle6"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock6"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn6"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn6"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Applications - End -->
    <!-- Global - Header - Learning & Development - Start -->
    <LI>
      <div id="MenuTitle7"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock7"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn7"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn7"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Learning & Development - End -->
    <!-- Global - Header - Benefits & Services - Start -->
    <LI id="benefits">
      <div id="MenuTitle8"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock8"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn8"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn8"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Benefits & Services - End -->
    <!-- Global - Header - Leadership Resources - Start -->
    <LI id=slt>
      <div id="MenuTitle9"></div>
      <DIV class="double-wide flyout-menu">
        <DIV class=title-area>
          <div id="SearchBlock9"></div>
        </DIV>
        <DIV class=content-area>
          <DIV class=first-column>
            <div id="FirstColumn9"></div>
          </DIV>
          <DIV class=second-column>
            <div id="SecondColumn9"></div>
          </DIV>
        </DIV>
      </DIV>
    </LI>
    <!-- Global - Header - Leadership Resources - End -->
  </UL>
</DIV>
<!-- Global - Header - Supplemental Nav - Start -->
<DIV id=header-supplimental>
<img src="/fv/groups/intranet/documents/web_assets/powered_by_google.png" alt="Powered by Google" class="google-head-logo" />
  <DIV id=header-supplimental-nav>
    <div id="TopRibbon10"></div>
  </DIV>
  <!-- Global - Header - Supplemental Nav - End -->
  <FORM id="header-search" name="header-search" action="http://intranet.fairview.org/SearchResults/index.htm" method="get">
          <INPUT id="searchinput" name="q">
          <input type="hidden" name="site" value="IntranetwConn|LegacyPolicies" />
          <input type="hidden" name="client" value="default_frontend" />
          <input type="hidden" name="getfields" value="dDocName.dDocTitle.dInDate.dDocType.dDocAuthor.dReleaseDate.xOriginalAuthor.xOriginalInDate.xWebsiteObjectType.xWebsites.xWebsiteSection.xLinkCat.xKeywords.xAbstract.xSpecialty.xIntranet_Type.xSection.xPolicyGroup.xPolicyGroupSub.xPolicyGroupSubSub.xPolicyLocation.xPolicyLocationSub.xPolicyLocationSubSub.xPolicySource.xPolicyType.xPolicyReviewers.xPolicyApprovers" />
          <input type="hidden" name="filter" value="0" />
          <input type="hidden" name="output" value="xml_no_dtd" />
          <input type="hidden" name="access" value="p" />
          <input type="hidden" name="ResultCount" value="10" />
          <input type="hidden" name="num" value="10" />
          <input type="hidden" name="start" value="0" />
          <IMG height="20" type="image" alt="Search" src="/fv/groups/intranet/documents/web_assets/hdr-btn-search.gif" width="21">
  </FORM>
</DIV>
</DIV>
<!-- Global - Header - End -->
<!-- Global - Bread Crumbs / User Information - Start -->
<script type="text/javascript">
var userToken = getCookie("fvUserId");
var user = "";
	if(userToken != null){
			userToken = userToken.replace(/\"/g,"");
	
	$.ajax({
		type: 'GET',
		url: '/getuserinfo/?usertoken=' + userToken,
		data: "data=data",
		success: function(answer) { 			user = answer.replace(/^\s+|\s+$/g,"");
			if(user == ""){
                                window.location="http://intranet.fairview.org:8089/login/?url="+location.href
				
			}else{
				 $(document).ready(function(){
                                       $('#user-log-info').html("Logged in as: < <a href='http://intranet1.fairview.org/people/" +user+ "' >" +user+"</a> >");
				});
			}
		}
	});
	}else{
		$.ajax({
		type: 'GET',
		url: '/getuserinfo/?usertoken=',
		data: "data=data",
		success: function(answer) { 			var user = answer.replace(/^\s+|\s+$/g,"");
			if(user == "internal"){
				
                                window.location="http://intranet.fairview.org:8089/login/?url="+location.href
				
			}else if(user == "external"){
				
				window.location="/login/?url="+location.href
				
			} else if(user == "pass-through"){
				//do not redirect
			}
		}
	});
	}
     function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
x=x.replace(/^\s+|\s+$/g,"");
if (x==c_name)
  {
  return unescape(y);
  }
}
} </script>
<!--googleoff: all -->
<DIV id=user-crumbs>
<DIV id=user-log-info>Logged in as: &lt;
     &gt;</DIV>
<DIV id=user-log-out><A id=log-out href="#" >Log Out</A></DIV>
<DIV id=breadcrumbs><A href="http://intranet.fairview.org/index.htm">Home</A>
  <!--$crumbLabels-->
</DIV>
<div class="login-container">
  <div class="login-popup" id="loginout">
    <div class="titlebar"><img src="/fv/groups/intranet/documents/web_assets/hdr-text-intranet.gif" alt="Intranet" /> <a href="#close" class="close-popup">Close</a></div>
    <div class="loginform">
      <div class="loginform-content">
        <form id="loginout" name="loginout" method="post" action="http://ucm-intranet1.fairview.org/login/authen.jsp" method="post">
        <div class="login-fields">
          <p>
                    <a href="#cancelsession" onclick="javascript:window.location='/logout/?url=/';return false"><img src="/fv/groups/intranet/documents/web_assets/log-pop-closesession.png" width="172" height="41" alt="Close Session"></a>
            </p>             <p>Or, log on as different user:</p>
          <label for="login-username">Username:</label>
          <div class="field-holder">
            <input type="text" id="login-username" name="username" value="">
          </div>
          <label for="login-password">Password:</label>
          <div class="field-holder">
            <input type="password" id="login-password" name="password" value="">
          </div>
          <input type="hidden" name="url" value="" />
          <p><img src="/fv/groups/intranet/documents/web_assets/log-pop-logon.png" width="52" height="20" alt="Logon" onclick="loginout.submit()"></p>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
  $('#log-out').colorbox({
		inline: true,
		href: '#loginout',
		transition: 'none',
		opacity: 0.66
	});
	$('.close-popup').click(function(e) {
		e.preventDefault();
		$.colorbox.close();
	});              </script>
</DIV>
<!--googleon: all -->
<!-- Global - Bread Crumbs / User Information - End -->

<script type="text/javascript">
	consumptionDomain = BaseUrl; //global variable comes from Scripts.js
	sourceFileCounter = 1;
	numberOfSourceFiles = 10;
	var currentServerContext = escape(document.location);
	var sourceFile1 = "INTRANET_HEADER_TOPRIBBON.xml"; //TopRibbon
	var sourceFile2 = "D_037568.xml"; //AboutMenu
	var sourceFile3 = "S_043362.xml"; //ClinicalMenu
	var sourceFile4 = "D_037598.xml"; //BusinessMenu
	var sourceFile5 = "D_037600.xml"; //ApplicationsMenu
	var sourceFile6 = "S_043393.xml"; //ResourcesMenu
	var sourceFile7 = "D_037601.xml"; //LearningMenu
	var sourceFile8 = "D_037602.xml"; //BenefitsMenu
	var sourceFile9 = "D_037603.xml"; //LeadershipMenu
	var sourceFile10 = "D_037604.xml"; //SupplementalMenu

       if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	function nonIE7Browser() {
		while (sourceFileCounter <= numberOfSourceFiles) {	
		//alert(eval("sourceFile" + sourceFileCounter));
                xmlhttp.open("GET","/fv/groups/sitemanager/documents/web_assets/" + eval("sourceFile" + sourceFileCounter),false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		var i = 0;
		var menuID = "";
		var divContent = "";
		var nodeListObj = xmlDoc.firstChild.childNodes;
		while (i < nodeListObj.length) {
                       if ((nodeListObj.item(i).nodeType == Node.ELEMENT_NODE) && (nodeListObj.item(i).nodeName == "wcm:element") && nodeListObj.item(i).hasChildNodes()) {
    var menuID = nodeListObj.item(i).attributes.getNamedItem("name").value;
    var divContent = nodeListObj.item(i).childNodes[0].nodeValue;
    if (!currentServerContext.indexOf("ucmstage") >= 0) {
    divContent = divContent.replace(/'/g, "");
    divContent = divContent.replace(/\[\!--\$wcmUrl\(resource\,/g, "/fv/");
    divContent = divContent.replace(/\)--\]/g, "");
    divContent = divContent.replace(/open\(/g,"open\('");
    divContent = divContent.replace(/\);/g,"'\);");
    divContent = divContent.replace(/,/,"','");
    divContent = divContent.replace(/,/,"','");
    var menuDivID = menuID + sourceFileCounter;
    //alert(menuDivID);
    if (document.getElementById(menuDivID) != null) {
    document.getElementById(menuDivID).innerHTML = divContent.replace(/http:\/\/ucmstage.fairview.org\/[Ii][Nn][Tt][Rr][Aa][Nn][Ee][Tt]/g, consumptionDomain);
    }
    }
    }
    i++;
    }
    sourceFileCounter++;
    }
    }

    function IEBrowsers() {
    while (sourceFileCounter <= numberOfSourceFiles) {	
		//alert(eval("sourceFile" + sourceFileCounter));
                xmlhttp.open("GET","/fv/groups/sitemanager/documents/web_assets/" + eval("sourceFile" + sourceFileCounter),false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		var i = 0;
		var menuID = "";
		var divContent = "";
		var x = xmlDoc.getElementsByTagName("wcm:element");
		//alert("x.length=" + x.length);
		while (i < x.length) {
                       if (xmlDoc.getElementsByTagName("wcm:element")[i].hasChildNodes()) { //ignore blank nodes
				menuID = x[i].attributes.getNamedItem("name").value;
				divContent = x[i].childNodes[0].nodeValue;
				var menuDivID = menuID + sourceFileCounter;
				//alert(menuDivID);
				//alert(divContent);
				if (document.getElementById(menuDivID) != null) {
				  divContent = divContent.replace(/'/g, "");
        divContent = divContent.replace(/\[\!--\$wcmUrl\(resource\,/g, "/fv/");
				  divContent = divContent.replace(/\)--\]/g, "");
        divContent = divContent.replace(/open\(/g,"open\('");
        divContent = divContent.replace(/\);/g,"'\);");
        divContent = divContent.replace(/asp,/,"asp','");
        divContent = divContent.replace(/,status/,"','status");
                 divContent = divContent.replace(/http:\/\/ucmstage.fairview.org\/[Ii][Nn][Tt][Rr][Aa][Nn][Ee][Tt]/g, consumptionDomain);
		  document.getElementById(menuDivID).innerHTML = divContent;
      }
			}
			i++;
		}
		sourceFileCounter++;
    }
	}
	
	// Detect Client Browser type
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	if (!isIE) {
		nonIE7Browser();
	} else {
		IEBrowsers();
	}
</script>
<!--googleon: all -->
<!--//Header-->



      <div id="main-content">
        <DIV id="vertical-flyouts">
          <!--left action panels-pull out to own include file?-->
          <script type="text/javascript">


            function getQuickLinks() {
            $("#quick-links-list").empty()
            var quickLinksList = document.getElementById('quick-links-list');
            var count = 0;
            var quickLinks = new Array();
            for (i = 0; i < userprefs.qlinks.length; i++) {
                      quickLinks[i] = new Array();
                      quickLinks[i].push(userprefs.qlinks[i].qlinkname, userprefs.qlinks[i].qlinkurl);
                  }
                  for (i = 0; i < quickLinks.length; i++) {
                      var title = quickLinks[i][0]
                      if (title != undefined && count < 10) {
                          var a = document.createElement('a');
                          var tn = document.createTextNode(title);
                          var url = quickLinks[i][1]
                          a.setAttribute('href', url);
                          if (url.indexOf("intranet") < 0)
                              a.setAttribute('target', '_blank')
                          a.appendChild(tn);

                          var li = document.createElement('li');
                          li.appendChild(a);
                          quickLinksList.appendChild(li);
                          count++;
                      }
                  }

                  $("#lessLink").hide();
                  $("#moreLink").show();
              }
              function getAllQuickLinks(updatedLinks) {
                                     $("#quick-links-list").empty()
                  var quickLinksList = document.getElementById('quick-links-list');
                  var quickLinks = new Array();
                  for (i = 0; i < userprefs.qlinks.length; i++) {
                      quickLinks[i] = new Array();
                      quickLinks[i].push(userprefs.qlinks[i].qlinkname, userprefs.qlinks[i].qlinkurl);
                  }
                  for (i = 0; i < quickLinks.length; i++) {
                      var title = quickLinks[i][0]
                      if (title != undefined) {
                          var a = document.createElement('a');
                          var tn = document.createTextNode(title);
                          var url = quickLinks[i][1]
                          a.setAttribute('href', url);
                          if (url.indexOf("intranet") < 0)
                              a.setAttribute('target', '_blank')
                          a.appendChild(tn);

                          var li = document.createElement('li');
                          li.appendChild(a);
                          quickLinksList.appendChild(li);
                      }
                  }
                  $("#lessLink").show();
                  $("#moreLink").hide();
              }
          </script>

          <DIV class="vertical-flyout" id="flyout-fast-find">
            <A href="#">
              <IMG height="177"
alt="Fast Find"
src="/fv/groups/intranet/documents/web_assets/lft-fly-btn-fast-find.gif"
width="40">
            </A>
            <DIV class="content-box" id="fast-find-content-box">
              <DIV class="box-title">
                <H5>
                  <A href="#">Fast Find</A>
                </H5>
              </DIV>
              <DIV class="box-container">
                <DIV class="box-content">
                  <FORM id="fast-find-form" name="fast-find-form" action="http://intranet.fairview.org/fastfind/index.htm" method="get">
                    <div class="fast-find-search-for">
                      <LABEL>&nbsp;</LABEL>
                    <label style='text-align:right'>
                      <a href="#" id="tooltip">Help</a>
                    </label>
                                           <label>
                        <input type="checkbox" id="staff" value="true" name="Staff">
                        Employees</label>
                      <label>
                        <input type="checkbox" id="providers" value="true" name="Providers">
                        Providers</label>
                      <label>
                        <input type="checkbox" id="clinics" value="true" name="Clinics">
                        Clinics</label>
                      <!--jhenke1: removing per Cindy and Erika's decision on 8/3/2011
                    <label>
                      <input type="checkbox" id="vendors" value="true" name="Vendors">
                      Vendors</label>
                      -->
                      <label>
                        <input type="checkbox" id="dept" value="true" name="Departments">
                        Dept.</label>


                    </div>
                    <DIV class="fast-find-search-field">
                      <INPUT id="fast-find-search-value" name="ffsearchvalue">
                        <input type="image" id="fast-find-search-btn" value="Go" src="/fv/groups/intranet/documents/web_assets/content-fast-find-btn-go.gif" style="height: 22; line-height: 22; width: 31;" />
                      </DIV>
                    <!-- <DIV class=fast-find-on-call-field>
          <SELECT id=fast-find-on-call-value name=fast-find-on-call-value>
            <OPTION value=location  selected>Location</OPTION>
            <OPTION value=location>Location</OPTION>
            <OPTION  value=location>Location</OPTION>
            <OPTION value=location>Location</OPTION>
            <OPTION value=location>Location</OPTION>
            <OPTION  value=location>Location</OPTION>
          </SELECT>
          <A id=fast-find-on-call-btn href="#"><IMG height=22 alt=Go src="fv/groups/intranet/documents/web_assets/content-fast-find-btn-go.gif" width=31></A> </DIV> -->
                  </FORM>
                </DIV>
              </DIV>
            </DIV>
          </DIV>
          <div class="login-container">
            <div class="login-popup" id="tip-popup">
              <div class="titlebar">
                <a href="#close" class="close-popup">Close</a>
              </div>
              <div class="loginform">
                <div class="loginform-content">
                  <ul style="list-style-type:disc; list-style-position:inside">
                    <li>Please select at least one of the checkboxes before entering your query.</li>
                    <li>Type first name followed by last name when doing full-name searches</li>
                    <li>If you don't find a result using a full name, try typing in a partial name.</li>
                    <li>
                      If you're searching for a resident or fellow, go <a href="http://search.umn.edu/">here</a>.
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
          <script type="text/javascript">
            $('#tooltip').colorbox({
            inline: true,
            href: '#tip-popup',
            transition: 'none',
            opacity: 0.66,
            fixed: true,
            top: 150,
            left: "20%"
            });
            $('.close-popup').click(function(e) {
            e.preventDefault();
            $.colorbox.close();
            });

          </script>
          <DIV class="vertical-flyout" id="flyout-quick-links">
            <A href="#">
              <IMG height="177"
alt="My Quick Links"
src="/fv/groups/intranet/documents/web_assets/lft-fly-btn-quick-links.gif"
width="40">
            </A>
            <DIV class="content-box" id="quick-links-content-box">
              <DIV class="box-title">
                <H5>
                  <A href="#">My Quick Links</A>
                </H5>
              </DIV>
              <DIV class="box-container">
                <DIV class="box-content">
                  <UL id="quick-links-list">
                  </UL>
                  <DIV id="quicklinks-more">
                    <A href="javascript:void(0)" onclick="getAllQuickLinks(); return false" id="moreLink">Show All</A>
                    <A href="javascript:void(0)" onclick="getQuickLinks(); return false" id="lessLink" style="display:none">SHOW Top 10</A>
                  </DIV>
                  <DIV id="quicklinks-edit">
                    <A href="http://intranet1.fairview.org/edit-profile!input.jspa">Edit</A>
                  </DIV>
                </DIV>
              </DIV>
            </DIV>
          </DIV>
          <DIV class="vertical-flyout" id="flyout-recent-pages">
            <A href="#">
              <IMG height="177"
alt="Recent Pages"
src="/fv/groups/intranet/documents/web_assets/lft-fly-btn-pages.gif"
width="40">
            </A>
            <DIV class="content-box" id="recent-pages-content-box">
              <DIV class="box-title">
                <H5>
                  <A href="#">Recent Pages</A>
                </H5>
              </DIV>
              <DIV class="box-container">
                <DIV class="box-content">
                  <UL id="recent-pages-list">
                  </UL>
                </DIV>
              </DIV>
            </DIV>
          </DIV>
          <DIV class="vertical-flyout" id="flyout-recent-updates">
            <A href="#">
              <IMG height="177"
alt="Recent Updates"
src="/fv/groups/intranet/documents/web_assets/lft-fly-btn-updates.gif"
width="40">
            </A>
            <DIV class="content-box" id="recent-updates-content-box">
              <DIV class="box-title">
                <H5>
                  <A href="#">Recent Updates</A>
                </H5>
              </DIV>
              <DIV class="box-container">
                <DIV class="box-content" id="recent-updates">
                  <UL>
                    <LI>
                      <A href="#">Recent updates 1</A>
                      <LI>
                        <A href="#">Recent updates 2</A>
                        <LI>
                          <A href="#">Recent updates 3</A>
                          <LI>
                            <A href="#">Recent updates 4</A>
                            <LI>
                              <A href="#">Recent updates 5</A>
                            </LI>
                          </UL>
                </DIV>
              </DIV>
            </DIV>
          </DIV>
          <!--//end left action panels-->
        </DIV>

        <div id="page-content" style="width: 970px;padding: 30px 0px 0px 30px">
          <center>
<!--//Body-->



                       <div class="title">Fairview Directory: <span class="subjectLabel">In-House Pagers</span></div>
			<div class="fvCrumbTrail">
				<a href="OnCallSearch.asp">UMMC On-Call</a>
			</div>

			<form id="PhoneSearch" action="StaffSearch.asp" method="get">
				<table id="SearchFormTable">
					<tr><th>Last Name:</th>
                                               <td><input type="text" class="Text" name="Last" value="" onfocus="this.select()" /></td>
					</tr>
					<tr><th>First Name:</th>
						<td><input type="text" class="Text" name="First" value="" /></td>
					</tr>
					<tr><th>Operating Unit:</th>
						<td><select name="Entity">
<option value="" selected></option>
<option value="CORP">CORP</option>
<option value="EBEN">EBEN</option>
<option value="EDINA">EDINA</option>
<option value="FLRMC">FLRMC</option>
<option value="FNHS">FNHS</option>
<option value="FRH">FRH</option>
<option value="FSH">FSH</option>
<option value="FVANDOV">FVANDOV</option>
<option value="FVBLAINE">FVBLAINE</option>
<option value="FVBLOOM">FVBLOOM</option>
<option value="FVBROOK">FVBROOK</option>
<option value="FVCHILD">FVCHILD</option>
<option value="FVCOLUM">FVCOLUM</option>
<option value="FVCRYS">FVCRYS</option>
<option value="FVEAGN">FVEAGN</option>
<option value="FVFRID">FVFRID</option>
<option value="FVHIAW">FVHIAW</option>
<option value="FVHIGH">FVHIGH</option>
<option value="FVMG">FVMG</option>
<option value="FVMPLGR">FVMPLGR</option>
<option value="HCMC">HCMC</option>
<option value="HIBBNG">HIBBNG</option>
<option value="HMCARE">HMCARE</option>
<option value="IAM">IAM</option>
<option value="IS">IS</option>
<option value="MPLS">MPLS</option>
<option value="MPLWD">MPLWD</option>
<option value="RBNSDALE">RBNSDALE</option>
<option value="REGIONS">REGIONS</option>
<option value="STLOUIS">STLOUIS</option>
<option value="STPAUL">STPAUL</option>
<option value="UM">UM</option>
<option value="UMACH">UMACH</option>
<option value="UMMC">UMMC</option>
<option value="UMMC-R">UMMC-R</option>
<option value="UMMC-U">UMMC-U</option>
<option value="UMMC-W">UMMC-W</option>
<option value="WHTEBEAR">WHTEBEAR</option></select></td>
					</tr>
					<tr><th>Phone Number:</th>
						<td><input type="text" class="Text" name="Phone" value="" /></td>
					</tr>
					<tr><th>Department Name:</th>
						<td><input type="text" class="Text" name="Department" value="" /></td>
					</tr>
					<tr><td>&nbsp;</td>
                                               <td><input type="Button" class="ButtonRight" value="Clear" onclick="ClearForm(this.form)" />
							<input type="Submit" class="Button" value="Search" />
						</td>
					</tr>
				</table>
			</form>

                       <div class="message">To search the phone directory, enter search criteria in at least one field</div>
			<a id="SearchEngineOnly" href="StaffSearch.asp?ID=2">Next: 2</a>

		<script type="text/javascript">
			function ClearForm(fm) {
				for (var i=0; i<fm.length; i++) {
					if (fm[i].type == "text") fm[i].value = ""
					if (fm[i].type == "select-one") fm[i].selectedIndex = 0
				}
				fm.elements[0].focus()
			}
			function Show(IID){
                               window.open("StaffDetails.asp?IID=" + IID, "staffDetails", "height=300,width=400,resizable,status,toolbar,scrollbars")
			}
			function EntityHelp() {
                                window.open("EntitySearch.asp","EntityPicker","height=200,width=300,scrollbars,resizable,status")
			}
			function SearchTips() {
                                window.open("SearchTips.asp","SearchTips","height=270,width=500,scrollbars,resizable,status")
			}

			var TargetForm = document.getElementById("PhoneSearch"),
				tgtField = TargetForm.elements["Entity"]

			TargetForm.elements["Last"].focus()
		</script>
	</center>
</div>
</div>
    <!--Footer-->
<!--this file assumes you have added the following to the hosting page:
/fv/groups/ssadminview/documents/web_assets/styles.css
/fv/groups/ssadminview/documents/web_assets/styles-iefix.css
/fv/groups/ssadminview/documents/web_assets/fv_jquery_library.js
This file is maintained on the ucmstage.fairview.org server-->
<!--googleoff: all -->
<!-- Global - Footer - Start -->
<DIV id=footer>
<DIV id=footer-navigation><div id="MainLinks1"></div></DIV>
<DIV id=copyright><div id="Copyright1"></div></DIV>
<DIV id=footer-links><div id="ExternalLinks1"></div></DIV>
</DIV>
<!-- Global - Footer - End -->

<script type="text/javascript">
	consumptionDomain = BaseUrl; //global variable comes from Scripts.js
	sourceFileCounter = 1;
	numberOfSourceFiles = 1;
	var currentServerContext = escape(document.location);
	var sourceFile1 = "INTRANET-FOOTER-CONTRIBUTION.xml"; 
       if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	
	
	// Detect Client Browser type
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	if (!isIE) {
		nonIE7Browser();
	} else {
		IEBrowsers();
	}
</script>
<script type="text/javascript">

// hide SLT link if not in SLT group

function removeSLT() {
var snode = document.getElementById("slt");
if ( snode.hasChildNodes() ) {
while ( snode.childNodes.length >= 1 ) {
snode.removeChild( snode.firstChild );
}
}
}

//jhenke1: hide "benefits and services" if a generic employee type
function removeBenefits() {
var benefitsnode = document.getElementById("benefits");
if ( benefitsnode.hasChildNodes() ) {
while ( benefitsnode.childNodes.length >= 1 ) {
benefitsnode.removeChild( benefitsnode.firstChild );
} //end while
}//end if: has childnodes
var quicklinknode = document.getElementById("share-quicklink");
quicklinknode.style.backgroundImage = "none";
//quicklinknode.style.display = "none";
if(quicklinknode.hasChildNodes()){
while (quicklinknode.childNodes.length >=1){
quicklinknode.removeChild(quicklinknode.firstChild);
}//end while

}//end if: has child nodes

}//end function: removeBenefits()

var isleader;
isleader = 0;

//jhenke1: adding isgeneric
var isgeneric;
isgeneric = 0;

for (var key in userprefs.groups) {
if (userprefs.groups.hasOwnProperty(key)) {
var g = userprefs.groups[key];
var i = g.groupid;
if (i == 5 || i == 6) {
isleader = 1;
}
//jhenke1:adding in isgeneric test (generic groupid = 3|7|8|9)
if (i == 7){
isgeneric = 1;
isleader == 0; //generic user types will not be leaders
}//end else if: generic user type
}
}

if (isleader == 0) {
removeSLT();
//uncomment to enable
}
//jhenke1: else if isgeneric user type
if(isgeneric == 1){
removeBenefits();
//uncomment the above to enable
}//end else if: generic user type
</script>
<!--googleon: all -->
<!--//Footer-->



  </div>
</div>
</div>
<script type="text/javascript" src="/fv/groups/ssadminview/documents/web_assets/scripts.js"></script>
</body>
</html>