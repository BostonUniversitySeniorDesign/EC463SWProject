# EC463SWProject

This project is an app that allows a user to make and save recipes by scanning the items barcode, chosing the serving sizes, and saving them with their desired recipe name. 


Before the app is ran, it needs:


Installation for the barcode scanner:

expo install expo-barcode-scanner 

Installation for the navigation screens:

npm install @react-navigation/native @react-navigation/native-stack 

Installation for axios:

npm install axios

Once those packages are installed, the app can be launched. 

When the app is launched, the first screen the user sees in the 'Login' screen. On this screen they put their desired username and then press the 'login' button to go to next screen. The next screen is the 'Home' screen. This is where the user can chose between starting a new recipe or looking at an already saved one. If the user choses to start a new recipe they will be taken to a 'Camera' screen. On the camera screen they will need to input the name of the their new recipe and click on the 'add ingredient' button. When that button is clicked it will start the barcode scanner, if it is the user's first time it will ask for permission to access the camera. First the user must scan their item's barcode, then enter the number of servings they want, then press the 'go' button to add the ingredient to their recipe. To add more ingredients the user needs to press the 'Scan again?' button and repreat the process. Once they have added everything they wanted,the user will press the 'Upload Recipe' button and the recipe will be created. To view their saved recipes they will need to go to the 'Home' screen and click on the 'Saved Recipe'. On the ‘Saved Recipes’  screen, they will need to input the name of the recipe they are looking for. After putting in the name, they should click on the ‘Find Recipe’ button and then the ‘Load Recipe’ button. If the recipe does not exist, there will be an error message when the ‘Load Recipe’ button is pressed and if it does exist the recipe name, number of calories, and ingredients will be shown.  
