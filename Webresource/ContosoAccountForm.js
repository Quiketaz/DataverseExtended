/**
 * File: ContosoAccountForm.js
 * Purpose: Provides JavaScript customizations for the Account form.
 * Dependencies: FieldHelper.js (provides initializeGlobalVariables, message, myUniqueId)
 * Date: 2024-10-11
 */

var Contoso = window.Contoso || {};
Contoso.Account = Contoso.Account || {};

(function () {

    // Function to handle the form OnLoad event
    this.formOnLoad = async (executionContext) => {
        try {
            var formContext = executionContext.getFormContext();
            
            // Initialize global variables (assuming this is asynchronous)
            await Contoso.FieldHelper.initializeGlobalVariables(); 

            // Display a temporary form notification 
            formContext.ui.setFormNotification(Contoso.FieldHelper.message, "INFO", Contoso.FieldHelper.myUniqueId);
            setTimeout(function () {
                formContext.ui.clearFormNotification(Contoso.FieldHelper.myUniqueId);
            }, 5000);

        } catch (error) {
            console.error("Error in formOnLoad:", error);
            Xrm.Utility.alertDialog("An error occurred during form load. Please contact your administrator with the following details: " + error.message); 
        }
    }

    // Function to handle the attribute OnChange event
    this.attributeOnChange = async function (executionContext) { // Use async here if any logic within requires it
        try {
            var formContext = executionContext.getFormContext();
            var accountName = formContext.getAttribute("name").getValue();

            // Configuration object for default values
            var accountDefaults = {
                "contoso": {  // Example: If account name contains "contoso"
                    websiteurl: "https://www.contoso.com",
                    telephone1: "425-555-0100",
                    description: "Website URL, Phone and Description set using custom script."
                },
                "adventureworks": { // Example: If account name contains "adventureworks"
                    websiteurl: "https://www.adventureworks.com",
                    telephone1: "800-555-0101",
                    description: "Default values for Adventure Works."
                }
                // Add more account name patterns and defaults as needed
            };

            // Check if the account name matches any configured patterns
            for (var key in accountDefaults) { 
                if (accountName.toLowerCase().includes(key)) { // Use includes() for better readability
                    var defaults = accountDefaults[key];
                    formContext.getAttribute("websiteurl").setValue(defaults.websiteurl);
                    formContext.getAttribute("telephone1").setValue(defaults.telephone1);
                    formContext.getAttribute("description").setValue(defaults.description);
                    break; 
                }
            }
        } catch (error) {
            console.error("Error in attributeOnChange:", error);
            Xrm.Utility.alertDialog("An error occurred during attribute change. Please contact your administrator with the following details: " + error.message);
        }
    }

    // Function to handle the form OnSave event
    this.formOnSave = function (executionContext) { 
        try {
            // Use formContext for consistency
            var formContext = executionContext.getFormContext();
            formContext.ui.setFormNotification("Record saved.", "INFO", "saveNotificationId"); 
            setTimeout(function () {
                formContext.ui.clearFormNotification("saveNotificationId");
            }, 5000);
        } catch (error) {
            console.error("Error in formOnSave:", error);
            // More specific error message, but still acknowledge save success
            Xrm.Utility.alertDialog("An error occurred during form save, but the record was likely saved. Please contact your administrator with the following details: " + error.message); 
        }
    }
}).call(Contoso.Account);