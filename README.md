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

The first screen the user sees in the 'Login' screen. On this screen they put their desired username and then press the 'login' button to go to next screen. The next screen is the 'Home' screen. This is where the user can chose between starting a new recipe or looking at an already saved one. If the user choses to start a new recipe they will be taken to a 'Camera' screen. On the camera screen they will need to input the name of the their new recipe and click on the 'add ingredient' button. When that button is clickes it will start the barcode scanner, if it is the user's first time it will ask for permission to access the camera.  
