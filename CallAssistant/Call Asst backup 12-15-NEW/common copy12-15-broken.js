var TEXT = 1;
var EMAIL = 2;
var PHONE = 3;
var USERNAME = 4;
var PASSWORD = 5;
var EMPTY_PASSWORD = 6;

$(document).ready(function() {
    
         $('button').click(function() {             
             var last8 = (this.textContent).slice(-8);  
                if ($('#pageTo').val() != '') {
                        $('#pageTo').val($('#pageTo').val()+', (612)'+last8); 
                } else {
                      $('#pageTo').val("(612)"+last8);               
                }
        })    
    
        $("#sendButton").click(function) {
                $('#RecentPages').append( new Option('USA',2) );
                $("#RecentPages").trigger("liszt:updated");
            }     
         
    $('#clearButton').click(function() {
        $('#pageTo').val("");
        $('#subject').val("");
        $('#message').val("");
        $('#from').val("");
        
    })
      
        $('#PagerSearchButton').click(function() {
            var SearchStrings = $('#PagerLastName').val()+'&First='+$('#PagerFirstName').val();
        window.open("https://applications.fairview.org/PhoneDirectory/StaffSearch.asp?Last="+SearchStrings);

    })
    
    $("#menu").accordion({active: false, collapsible: true, heightStyle: "fill"});
    $( ".selector" ).accordion({ event: "mouseover" });

});

        


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
	if (countCharacters() > 500)
	{
		if (confirm('Message greater than 500 characters. Truncate?'))
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

function showHelp(url)
{
	helpwin = window.open(null, 'helpwindow',
			'height=450,width=600,resizable,scrollbars,status');
	helpwin.location = url;
}

    $('#Nascene').click(function() {
         $('#pageTo').val('6128998005')
    })
                        