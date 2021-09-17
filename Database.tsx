import React from 'react';
import {db} from './src/config';
import firebase from 'firebase';

class Database
{
	static username = "Default";
	static recipeName = "Default";
	static recipe = "";
	static totalkCal = 0;
}

Database.login = function(username)
{
	this.username = username;
}

Database.logout = function()
{
	this.username = "Default";
}

Database.addRecipe = function(recipeName)
{
	if(this.username == "Default")
		throw("Error: not logged in");
	
	this.recipeName = recipeName;
	this.recipe = recipeName + ":\n";
}

Database.addIngredient = function(name, kCals)
{
	if(this.username == "Default")
		throw("Error: not logged in");
	if(this.recipeName == "Default")
		throw("Error: no working recipe");
	
	this.recipe += name + "\n\t" + kCals + "\n";
	this.totalkCal += kCals;
}

Database.uploadRecipe = function()
{
	this.recipe += "Total:\n\t" +this.totalkCal;
	
	db.ref('recipes/' + this.username + this.recipeName).set({recipe: this.recipe});
	
	this.recipeName = "Default";
	this.recipe = "";
	this.totalkCal = 0;
}

Database.readRecipe = function(recipeName)
{
	/*
	db.ref('recipes/' + this.username + this.recipeName)
	.once('value')
	.then(snapshot =>{
		return snapshot.val().recipe;
	});*/
	
	
	this.recipe = "Error: Still Loading Recipe";
	db.ref('recipes/' + this.username + recipeName).get().then((snapshot) => {
		if(!snapshot.exists())
			this.recipe = "Error: Invalid Recipe";
		else
			this.recipe = snapshot.val().recipe;
	});
}

Database.getRecipe() = function()
{
	return recipe;
}

module.exports = {
	functions: Database
};