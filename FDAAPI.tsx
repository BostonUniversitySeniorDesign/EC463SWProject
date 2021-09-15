import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import axios from 'axios';

class FDAAPI
{
	static calories = "No Barcode";
	static data = "No Data";
}

FDAAPI.parseBarcode = function(FDC_ID)
{
	this.calories = "Error: Still Fetching Data";
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
		alert(error.message);
	});
}

FDAAPI.parseJson = function(data)
{
	console.log(data);
	this.data = "data";
	this.calories = "kCal";
}

FDAAPI.getCalories = function()
{
	const cal = this.calories;
	this.calories = "No Barcode";
	this.data = "No Data";
	return cal;
}

module.exports = {
	functions: FDAAPI
};