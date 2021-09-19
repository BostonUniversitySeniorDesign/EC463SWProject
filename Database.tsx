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

//Rudimentary login function; simply using a username
Database.login = function(username)
{
	this.username = username;
}

//And a Rudimentary logout function
Database.logout = function()
{
	this.username = "Default";
}

//Takes a recipe name and starts a new recipe string
Database.addRecipe = function(recipeName)
{
	if(this.username == "Default")
		throw("Error: not logged in");
	
	this.recipeName = recipeName;
	this.recipe = recipeName + ":\n";
}

//Concatenates ingredient data to the recipe string
Database.addIngredient = function(name, kCals)
{
	if(this.username == "Default")
		throw("Error: not logged in");
	if(this.recipeName == "Default")
		throw("Error: no working recipe");
	
	this.recipe += name + "\n\t" + kCals + "\n";
	this.totalkCal += Number(kCals);
}

//Finishes off the recipe total calorie count and uploads it to firebase
Database.uploadRecipe = function()
{
	this.recipe += "Total:\n\t" +this.totalkCal;
	
	db.ref('recipes/' + this.username + this.recipeName).set({recipe: this.recipe});
	
	this.recipeName = "Default";
	this.recipe = "";
	this.totalkCal = 0;
}

//Downloads recipe Json from firebase and extracts the recipe string
Database.readRecipe = function(recipeName)
{
	this.recipe = "Error: Still Loading Recipe";
	db.ref('recipes/' + this.username + recipeName).get().then((snapshot) => {
		if(!snapshot.exists())
			this.recipe = "Error: Invalid Recipe";
		else
			this.recipe = snapshot.val().recipe;
	});
}

//Returns the current state of the recipe, either while being built or
//after being downloaded and parsed from firebase
Database.getRecipe = function()
{
	return this.recipe;
}

module.exports = {
	functions: Database
};