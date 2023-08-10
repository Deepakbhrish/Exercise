sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, History, formatter,MessageToast,Filter, FilterOperator, MessageBox) {
    "use strict";

    return BaseController.extend("project2.controller.Object", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            // Model used to manipulate control states. The chosen values make sure,
            // detail page shows busy indication immediately so there is no break in
            // between the busy indication for loading the view's meta data
            var oViewModel = new JSONModel({
                    busy : true,
                    delay : 0
                });
            this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
            this.setModel(oViewModel, "objectView");
        },
        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */


        /**
         * Event handler  for navigating back.
         * It there is a history entry we go one step back in the browser history
         * If not, it will replace the current entry of the browser history with the worklist route.
         * @public
         */
        onNavBack : function() {
            var sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                // eslint-disable-next-line fiori-custom/sap-no-history-manipulation
                history.go(-1);
            } else {
                this.getRouter().navTo("worklist", {}, true);
            }
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Binds the view to the object path.
         * @function
         * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
         * @private
         */
        _onObjectMatched : function (oEvent) {
            // this.getView().byId("isNew").setState(false);
            var sObjectId =  oEvent.getParameter("arguments").objectId;
            this._bindView("/PersonalInformation" + sObjectId);
            
        },
        bindLeaveRequestTable: function()

        {

            var leavereqTable = this.getView().byId("leavereqTable");
            var leavereqItems = this.getView().byId("leavereqItems").clone();
            var employeeId = this.getView().byId("_IDGenTitle1").getText();
            var ID = [new Filter("linkEmployee_ID", FilterOperator.EQ, employeeId)];
            leavereqTable.bindAggregation("items",{path:"/FamilyInformation",template:leavereqItems, 
            filters:ID});
        },

        /**
         * Binds the view to the object path.
         * @function
         * @param {string} sObjectPath path to the object to be bound
         * @private
         */
        _bindView : function (sObjectPath) {
            var oViewModel = this.getModel("objectView");

            this.getView().bindElement({
                path: sObjectPath,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function () {
                        oViewModel.setProperty("/busy", true);
                    },
                    dataReceived: function () {
                        oViewModel.setProperty("/busy", false);
                    }
                }
            });
            this.bindLeaveRequestTable();
        },
        onNewEmployee: function(oEvent)

        {
             if(oEvent.getParameter("state"))
            {
                this.getView().byId("empid").setValue();
                this.getView().byId("firstnameId").setValue();
                this.getView().byId("lnameid").setValue();
                this.getView().byId("emailid").setValue();
                this.getView().byId("phoneid").setValue();
            }
            else
            this.getView().byId("empId").setEnabled(false);
        },
        onDeleteEmployee: function(oEvent)
        {
            debugger;
            var oModel = this.getView().getModel();
            oModel.setUseBatch(false);
            var ID = this.getView().byId("empid").getValue();

            oModel.remove("/PersonalInformation('"+ID+"')", {               
                success: function(data) {                  
                    MessageBox.information("Employee Deleted");
                },
                error: function(oError) {   
                }
            });
        },

        onSaveEmployees: function(oEvent)
        {
            debugger;
            var oModel = this.getView().getModel();
            var empChanges = {};
            // var selObject = this.getView().byId("SimpleFormChange354").getBindingContext().getObject();
            // empChanges.employeeId = selObject.employeeId;

            var ID = this.getView().byId("empid").getValue();
            var FirstName = this.getView().byId("firstnameId").getValue();
            var LastName = this.getView().byId("lnameid").getValue();
            var Email = this.getView().byId("emailid").getValue();
            var Phone = this.getView().byId("phoneid").getValue();
            empChanges.ID = ID;
            empChanges.FirstName = FirstName;
            empChanges.LastName = LastName;
            empChanges.Email = Email;
            empChanges.Phone = Phone;

            var isNew = this.getView().byId("isNew").getState();
            if(isNew){
                oModel.create("/PersonalInformation", empChanges, {

                    success: function(data, response){
                        MessageToast.show("Data Created")
                    },
                    error: function(oError){

                    }
                })
            }else{
                oModel.update("/PersonalInformation('"+empChanges.ID+"')", empChanges, {                
                    success: function (data,response) {                                         
                        sap.m.MessageToast.show("Changes saved");                    
                    },
                    error: function (oError) {   
                                   
                    }
                }); 

            }

            
        },

        _onBindingChange : function () {
            var oView = this.getView(),
                oViewModel = this.getModel("objectView"),
                oElementBinding = oView.getElementBinding();

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("objectNotFound");
                return;
            }

            var oResourceBundle = this.getResourceBundle(),
                oObject = oView.getBindingContext().getObject(),
                sObjectId = oObject.ID,
                sObjectName = oObject.PersonalInformation;

                oViewModel.setProperty("/busy", false);
                oViewModel.setProperty("/shareSendEmailSubject",
                    oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
                oViewModel.setProperty("/shareSendEmailMessage",
                    oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
        }
    });

});
