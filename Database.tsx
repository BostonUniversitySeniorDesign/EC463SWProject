import React from 'react';
import {db} from './src/config';

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
	if(username == "Default")
		throw("Error: not logged in");
	
	this.recipeName = recipeName;
	this.recipe = recipeName + ":\n";
}

Database.addIngredient = function(name, kCals)
{
	if(username == "Default")
		throw("Error: not logged in");
	if(recipeName == "Default")
		throw("Error: no working recipe");
	
	this.recipe += name + "\n\t" + kCals + "\n";
	this.totalkCal += kCals;
}

Database.uploadRecipe = function()
{
	this.recipe += "Total:\n\t" + totalkCal;
	
	set(ref(db, 'recipes/' + this.username + this.recipeName),
	{
		recipe: this.recipe;
	});
	
	this.recipeName = "Default";
	this.recipe = "";
	this.totalkCal = 0;
}

Database.readRecipe = function(recipeName)
{
	db.ref(db, 'recipes/' + this.username + this.recipeName)
	.once('value')
	.then(snapshot =>{
		return snapshot.val();
	});
}


module.exports = {
	functions: Database
};