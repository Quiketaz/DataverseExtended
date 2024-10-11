/**
 * File: ContosoFieldHelper.js
 * Purpose: Provides JavaScript customizations for the Account form.
 * Date: 2024-10-11
 */

var Contoso = window.Contoso || {};
Contoso.FieldHelper = Contoso.FieldHelper || {}; 

(function () {
    // Define global variables within the Contoso.FieldHelper namespace
    Contoso.FieldHelper.myUniqueId = "_myUniqueId"; 
    Contoso.FieldHelper.currentUserName = ""; 
    Contoso.FieldHelper.message = ""; 

    // Function to initialize global variables (now async)
    this.initializeGlobalVariables = function() {
        return new Promise((resolve, reject) => {
            try {
                Contoso.FieldHelper.currentUserName = Xrm.Utility.getGlobalContext().userSettings.userName;
                Contoso.FieldHelper.message = Contoso.FieldHelper.currentUserName + ": Your JavaScript code in action!";
                resolve();
            } catch (error) {
                console.error("Error initializing global variables:", error);
                Xrm.Utility.alertDialog("An error occurred. Please contact your administrator.");
            }
        });
    }

}).call(Contoso.FieldHelper);