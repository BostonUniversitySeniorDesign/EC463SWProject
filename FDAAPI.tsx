import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import axios from 'axios';

class FDAAPI{}

FDAAPI.getCalories = function(FDC_ID)
{
	axios.post
	(
		'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cut3y5UH1MWJYdvRtN3gz74DT1YOxRvprPLWCdA1',
		{query: FDC_ID, dataType: ["Branded"], sortBy: "fdcId", sortOrder: "desc"}
	)
	.then(function(response)
	{
		console.log(response.data);
		return 'Calories';
	})
	.catch(function(error)
	{
		alert(error.message);
	});
	
	
	return 'Error';
}

module.exports = {
	functions: FDAAPI
};