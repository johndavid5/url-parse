var GBDebug = 0;

/**
* Uses a finite-state machine to parse a url into host, port, and protocol...
*
* @returns a JSON object that looks something like this:
*     { host: "cnn.com", port: "80", protocol: "http" }
*/
var urlParse = function(url){

	let output = { host: "", port : "", protocol : "" };

	let sWho = "parse_url";

	url = "" + url;

	if( GBDebug ){ console.log(`${sWho}(): url = "{$url}"...\n`); }

	const IN_PROTOCOL = "IN_PROTOCOL";
	const IN_HOST = "IN_HOST";        
	const IN_PORT = "IN_PORT";

	let state = "";;

	// Make crude guess on what state to begin in...
    // (a real finite-state machine always begins in START 
    //  or something like that...but we can skip to
	//  the first state based on how the string begins...)
	if( url.includes(":\/\/") > 0 ){
		state = IN_PROTOCOL; 
	}
	else {
		state = IN_HOST; 
	}

	let i_length = url.length;
	let c="";

	for( let i=0; i < i_length; i++ ){

		c = url[i]
		if( GBDebug ){ console.log("\n" + sWho + ": c[" + i + "] = '" + c + "'..."); }

		if( GBDebug ){ console.log(`${sWho}(): ${i}: BEFORE: state = "${state}"`); } 
		if( GBDebug ){ console.log(sWho + "(): " + i + ": BEFORE: output = ", output ); }


		if( state == IN_PROTOCOL ){
			if( c == ":" ){
				state = IN_HOST;
			}
			else {
				output.protocol += "" + c;    
			}
		}
		else if( state == IN_HOST ){
			if( c == ":" ){
				state = IN_PORT;
			}
			else{
				if( c != "\/" ){
					output.host += "" + c;
				}
			}
		}
		else if( state == IN_PORT ){
              output.port += "" + c;
		}

		if( GBDebug ){ console.log(`${sWho}(): ${i}: AFTER: state = "${state}"`); } 
		if( GBDebug ){ console.log(sWho + "(): " + i + ": AFTER: output = ", output ); }

     }/* for( let i=0; i < i_length; i++ ) */

	if( GBDebug ){ console.log(`\n${sWho}(): FINALEMENT: state = "${state}"`); } 
	if( GBDebug ){ console.log(sWho + "(): FINALEMENT: output = ", output ); }


	return output;
     
};/* urlParse() */


// Only need module.exports for node,
// browser gets function through windows
// object... 
(typeof module !== 'undefined') &&
(module.exports = urlParse);
