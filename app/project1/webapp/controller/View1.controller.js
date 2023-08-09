sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {

            },

            showdata: function(){
                var  move = this.getOwnerComponent().getRouter();
                move.navTo("Routetabel")
            },
            click: function(oEvent){
                var oContext = oEvent.getSource().getBindingContext().getObject();
                //  alert(oContext.ID)



                 var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteElement", {
                     "ID": oContext.ID
                 });
            },


        });
    });
