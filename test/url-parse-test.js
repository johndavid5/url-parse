var expect = require('chai').expect;
var urlParse = require('../urlParse'); 

describe('validate urlParse() test', 

	function(){

	var test_cases = [
			{
				url: "",
				expected_output: { host: "", port: "", protocol: ""}
			},
			{
				url: "http://cnn.com",
				expected_output: { host: "cnn.com", port: "", protocol: "http" }
			},
			{
				url: "http://cnn.com:80",
				expected_output: { host: "cnn.com", port: "80", protocol: "http" }
			},
			{
				url: "https://cnn.com",
				expected_output: { host: "cnn.com", port: "", protocol: "https" }
			},
			{
				url: "https://cnn.com:80",
				expected_output: { host: "cnn.com", port: "80", protocol: "https" }
			},
			{
				url: "://cnn.com",
				expected_output: { host: "cnn.com", port: "", protocol: "" }
			},
			{
				url: "cnn.com",
				expected_output: { host: "cnn.com", port: "", protocol: "" }
			},
			{
				url: "cnn.com:80",
				expected_output: { host: "cnn.com", port: "80", protocol: "" }
			}
		];
	
		// DRY = Do not Repeat Yourself...
		test_cases.forEach(function(test_case, index){

			it("case #" + (index+1) + ": urlParse(" + "\"" + test_case.url + "\" )\n" + 
					"...should return " + JSON.stringify(test_case.expected_output),
					function(){
						expect( urlParse(test_case.url) ).to.deep.equal(test_case.expected_output);
					});

			});

});
