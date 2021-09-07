import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

class FDAAPI{}

FDAAPI.getCalories = function(FDC_ID)
{
	return 250;
}

module.exports = {
	functions: FDAAPI
};