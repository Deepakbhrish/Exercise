sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.Element", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
			    oRouter.getRoute("RouteElement").attachPatternMatched(this._onObjectMatched, this);
               

            },
            _onObjectMatched: function (oEvent) {
               


                var oArgument = oEvent.getParameter("arguments");
                var oElement = oArgument.ID;
                // alert(oElement)
                this._bindView("/PersonalInformation" + oElement);
                


               
            },
        //      /**
        //  * Binds the view to the object path.
        //  * @function
        //  * @param {string} sObjectPath path to the object to be bound
        //  * @private
        //  */

            _bindView : function (sObjectPath) {
              debugger;
              //var oViewModel = this.getModel("objectView");
  
              this.getView().bindElement({
                  path: sObjectPath,
                  // events: {
                  //     change: this._onBindingChange.bind(this),
                  //     dataRequested: function () {
                  //       //  oViewModel.setProperty("/busy", true);
                  //     },
                  //     dataReceived: function () {
                  //       //  oViewModel.setProperty("/busy", false);
                  //     }
                  // }
              });
            },
          //   _onBindingChange : function () {
          //     var oView = this.getView(),
          //         // oViewModel = this.getModel("objectView"),
          //         oElementBinding = oView.getElementBinding();
  
          //     // No data for the binding
          //     if (!oElementBinding.getBoundContext()) {
          //         this.getRouter().getTargets().display("objectNotFound");
          //         return;
          //     }
  
          //     var oResourceBundle = this.getResourceBundle();
          //        // oObject = oView.getBindingContext().getObject(),
          //        // sObjectId = oObject.employeeId,
          //        // sObjectName = oObject.EmployeePersonalInfo;
  
          //         // oViewModel.setProperty("/busy", false);
          //         // oViewModel.setProperty("/shareSendEmailSubject",
          //         //     oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
          //         // oViewModel.setProperty("/shareSendEmailMessage",
          //         //     oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
          // }
        });
    });
