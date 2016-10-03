var TEXT = 1;
var EMAIL = 2;
var PHONE = 3;
var USERNAME = 4;
var PASSWORD = 5;
var EMPTY_PASSWORD = 6;

$(document).ready(function () {
    


         $('button.phone').click(function () {     //regular button click function
             
             var last8 = (this.textContent).slice(-8);  
             
             if (pageNames == '') {
              pageNames = (this.textContent).slice(0, -8);
             } else {
              pageNames = pageNames + " " + (this.textContent).slice(0, -8);
             }
                          if ($('#pageTo').val() != '') {
                $('#pageTo').val($('#pageTo').val()+', (612)'+last8); 

             } else {
                      $('#pageTo').val("(612)"+last8);    
             }
        })    
 
         
         
         
         
   $(".allGroup").click(function(){                 //group button click function
   var $parent = $(this).closest('.groupContainer');  //The parent div
   $parent.find(".phone").trigger('click');  //This simulates each button click
});      
         
    
    
    
    $('#clearButton').click(function() {   
     $("#sendmessage")[0].reset();   //empty the form
        pageNames = '';                 //clear out the pageNames global variable
    })
      

//function addRecentPages() {
//  $('#recentPages').append($("<option></option>").attr("value","test").text($('#pageTo').val()));
  //          alert("Submit button clicked!");
//    var replaceRecentPageText = $('<option></option>').attr("value", "option value").text();
  //      $('#recentPages').empty().append(replaceRecentPageText);
//return true;
//}    
    

    
        $('#PagerSearchButton').click(function () {    //button on a Fairview computer
            var SearchStrings = $('#PagerLastName').val()+'&First='+$('#PagerFirstName').val();
        window.open("https://amcomweb.fairview.org/smartweb/pages/directory/PersonSearchResults.jsf");
            
            // old search functionality
//window.open("http://applications.fairview.org/PhoneDirectory/StaffSearch.asp?Last="+SearchStrings);
            
    })

                $('#PagerSearchButton2').click(function () {   //button on an off campus computer
            var SearchStrings = $('#PagerLastName').val()+'&First='+$('#PagerFirstName').val();
        window.open("http://chafey.github.io/cornerstoneDemo/");

    })
      
    //Rad Paging buttons            
            $('#protocolQuestion').click(function () {
            $('#message').focus().val('').val("Question about an imaging test you have requested. Please call at your convenience.");
        })
                                     
            $('#urgentResult').click(function () {
            $('#message').focus().val('').val("Urgent finding on an imaging test you have requested. Please call ASAP.");
        })
            $('#nonUrgentResult').click(function () {
            $('#message').focus().val('').val("Important (but not urgent) finding on an imaging test you have requested. Please call at your earliest convenience.");
        })            
            
      // Priority buttons
        $('#highPriority').click(function () {
            $('#subject').val("High Priority");
        })   
   
        $('#modPriority').click(function () {
            $('#subject').val("Moderate Priority");
        })          

        $('#lowPriority').click(function () {
            $('#subject').val("Low Priority");
        })          
        
        $('#sixOneTwo').click(function () {
            $('#pageTo').val("612899").focus();
        })        
        
    // IR Tech buttons

            $('#IRconsent').click(function () {
            $('#message').focus().val('').val("Patient ready for consent.");
        })  

            $('#IRready').click(function () {
            $('#message').focus().val('').val("Patient prepped and ready.");
        })              

            $('#IRdelay').click(function () {
            $('#message').focus().val('').val("Case delayed.");
        })          
            
   // Rad Tech buttons
        $('#callPager').click(function () {
            $('#pageTo').val("6128998982");
              pageNames = 'Rad Call Pager';
        })            
        
            $('#traumaRed').click(function () {
            $('#message').focus().val('').val("Trauma CT in process. Please come to CT now.");
        })                    

            $('#strokeCode').click(function () {
            $('#message').focus().val('').val("Stroke CT in process. Please come to CT.");
        })                        
        
            $('#protocolMRI').click(function () {
            $('#message').focus().val('').val("Please protocol an MRI on patient ");
        })                                    

            $('#callMRI').click(function () {
            $('#message').focus().val('').val("Please call MRI, 273-6829.");
        })  
            
            $('#statMRI').click(function () {
            $('#message').focus().val('').val("STAT MRI ready to read on PACS.");
        })                                    
            
            $('#protocolCT').click(function () {
            $('#message').focus().val('').val("Please protocol a CT on patient ");
        })                                    

            $('#callCT').click(function () {
            $('#message').focus().val('').val("Please call CT, 273-7432.");
        })  
            
            $('#statCT').click(function () {
            $('#message').focus().val('').val("STAT CT ready to read on PACS.");
        }) 
            
            $('#protocolPedsMRI').click(function () {
            $('#message').focus().val('').val("Please protocol a Peds MRI on patient ");
        })                                    

            $('#callPedsMRI').click(function () {
            $('#message').focus().val('').val("Please call MRI 273-3346.");
        })  
            
            $('#statPedsMRI').click(function () {
            $('#message').focus().val('').val("STAT Peds MRI ready to read on PACS.");
        })     
            
            $('#protocolPedsCT').click(function () {
            $('#message').focus().val('').val("Please protocol a Peds CT on patient ");
        })                                    

            $('#callPedsCT').click(function () {
            $('#message').focus().val('').val("Please call CT, 273-5527.");
        })  
            
            $('#statPedsCT').click(function () {
            $('#message').focus().val('').val("STAT CT ready to read on PACS.");
        }) 
                                      

            $('#callPedsUS').click(function () {
            $('#message').focus().val('').val("Please call Amplatz US, 273-4317.");
        })  
            
            $('#statPedsUS').click(function () {
            $('#message').focus().val('').val("STAT Peds US ready to read on PACS.");
        })             
            
            //initialize Accordion menus        
    $("#menu").accordion({active: false, collapsible: true, heightStyle: "fill"});
    $( ".selector" ).accordion({ event: "mouseover" });
    
    

});      // end of Document ready function

        


//  In general, email addresses may also be pager numbers, so
//  just allow these regardless.  A phone number is pretty
//  tight (exactly 10 digits plus punctuation), so this will
//  not produce many false-positives.
//


function checkPhone(inputItem)
{
	len = 0;
	for(i = 0; i < inputItem.value.length; i++)
	{
		c = inputItem.value.charAt(i);
		checkval = parseInt(c);
		if(c != '-' && c != '.' && c != '(' && c != ')' &&
		   isNaN(checkval))
		{
			return false;
		}
		if(!isNaN(checkval))
			len++;
	}
	if(len == 10)
		return true;
	return false;
}

function valPhone(inputItem, errmsg)
{
	if(checkPhone(inputItem))
		return true;
	if(errmsg)
		alert(errmsg);
	inputItem.focus;
	return false;
}

function valForm(form)
{
	if(form == null || form.elements == null)
		return true;
	if (form.gw_pin.value)
	{
		var nn_re = / *, */g;

		var gw_scrub = form.gw_pin.value.replace(nn_re, ",");
		gw_scrub = form.gw_pin.value.replace(/,,/g, ",");
		gws = gw_scrub.split(",");
		for (i = 0;  i < gws.length;  i++)
		{
			var v = gws[i];
			v = v.replace(/[^\d]/g, "");
			if (v >= 4161990000 && v <= 4161999999)
			{
				if (window.showModalDialog)
					window.showModalDialog('canada.html',
						window,
			'dialogHeight:275px;dialogWidth:300px; help:no');
				else
					alert(
"Beginning April 14, 2006 you will be unable to send messages to pagers with numbers in the range 416-199-0000 up to 416-199-9999 from this website. Please begin using http://www.pagenet.ca/send-a-message.html immediately for numbers within this range. Thank you!");
				break;
			}
		}
	}
	for (i = 0; i < elements.length; i++)
	{
		if(elements[i].onchange != null && !elements[i].onchange())
			return false;
	}
	if (countCharacters() > 240)
	{
		if (confirm('Message greater than 240 characters. Truncate?'))
		{
			var s, l;

			for (tries = 0;tries<100&&countCharacters()>500;tries++)
			{
				s = document.sendmessage.mesg_to_send;
				l = s.value.length;
				if (l > 0)
					document.sendmessage.mesg_to_send.value
						= s.value.substr(0, l - 1);
			}
			return tries < 100;
		}
		return false;
	}
	return true;

}

function countCharacters()
{
	var cnt = 0;

	if(document == null ||
	   document.sendmessage == null ||
	   document.sendmessage.count == null)
		return 0;
	if(document.sendmessage.subject_string != null)
		cnt += document.sendmessage.subject_string.value.length;
	if(document.sendmessage.mesg_to_send != null)
		cnt += document.sendmessage.mesg_to_send.value.length;
	if(document.sendmessage.from_string != null)
		cnt += document.sendmessage.from_string.value.length;
	if(document.sendmessage.resp_a_string != null)
		cnt += document.sendmessage.resp_a_string.value.length;
	if(document.sendmessage.resp_b_string != null)
		cnt += document.sendmessage.resp_b_string.value.length;
	if(document.sendmessage.resp_c_string != null)
		cnt += document.sendmessage.resp_c_string.value.length;
	if(document.sendmessage.resp_d_string != null)
		cnt += document.sendmessage.resp_d_string.value.length;
	if(document.sendmessage.resp_e_string != null)
		cnt += document.sendmessage.resp_e_string.value.length;
	if(document.sendmessage.resp_f_string != null)
		cnt += document.sendmessage.resp_f_string.value.length;
	return document.sendmessage.count.value = cnt;
}