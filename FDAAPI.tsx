import React from 'react';
import axios from 'axios';

class FDAAPI
{
	static kCalServing = 0;
	static itemName = "No Item";
	static status = "No Barcode";
}

//Downloads a .json from the FDA with the given barcode information; calls helper parseJson()
FDAAPI.parseBarcode = function(FDC_ID)
{
	this.status = "Error: Still Fetching Data";
	axios.post
	(
		'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cut3y5UH1MWJYdvRtN3gz74DT1YOxRvprPLWCdA1',
		{query: FDC_ID, dataType: ["Branded"], sortBy: "fdcId", sortOrder: "desc"}
	)
	.then(function(response)
	{
		FDAAPI.parseJson(response.data);
	})
	.catch(function(error)
	{
		this.status = "Error: Bad Read"
		alert(error.message);
	});
}

//Parses Json from the FDA for calorie/serving count & item name
FDAAPI.parseJson = function(data)
{
	for(let i = 0; i < data.foods[0].foodNutrients.length; i++)
		if(data.foods[0].foodNutrients[i].nutrientName == "Energy")
			this.kCalServing = data.foods[0].foodNutrients[i].value;
		
	if(this.kCalServing == 0)
		throw("Error: No Calorie Data Found");
	
	this.itemName = data.foods[0].description;
	this.status = "Query Complete";
}

//Returns the number of calories in a given number of servings
FDAAPI.getCalories = function(servings)
{
	console.log(this.itemName + ", " + this.kCalServing);
	
	var message = "";
	
	if(this.status == "Query Complete")
		message = (this.kCalServing*servings) + "kCal";
	else
		message =this.status;
	
	return message;
}

//Returns the item name
FDAAPI.getItemName = function()
{
	var message = "";
	
	if(this.status == "Query Complete")
		message = this.itemName;
	else
		message =this.status;
	
	return message;
}

//Clears the kCal & name fields in preperation for new incoming data
FDAAPI.clear = function()
{
	this.kCalServing = 0;
	this.itemName = "No Item";
	this.status = "No Barcode";
}

module.exports = {
	functions: FDAAPI
};