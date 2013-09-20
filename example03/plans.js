//
//  ParkExample.js
//  Tangle
//
//  Created by Bret Victor on 3/10/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//

window.addEvent('domready', function () {

    new Tangle(document.getElementById("parkExample"), {

        initialize: function () {
            this.primaryVisit = 25;
            this.monthlyCost = 250;
            this.estimatedCost = 3025;
            this.numberVisits = 1;
            //
            this.planCost = 0.40;
            this.planCost_weight = 0.5;
            this.planCoverage = 0.01;
            this.planCoverage_weight = 0.1;
            this.docpref = 0.86;
            this.docpref_weight = 0.2;
            this.docNetwork = 0.76;
            this.docNetwork_weight = 0.2;
            //
            this.parkCount = 278;
            this.oldAdmission = 12;
            this.registeredVehicleCount = 28e6;  // http://www.yesforstateparks.com/get-the-facts/fact-sheets/general-fact-sheet
            this.taxpayerCount = 13657632;  // http://trac.syr.edu/tracirs/findings/aboutTP/states/California/counties/06000/06000main.html
            this.oldVisitorCount = 75e6;  // http://parks.ca.gov/pages/712/files/budget%20fact%20sheet%20w-graphics%20-%2001-14-08.pdf
            this.oldBudget = 400e6; // this is not really correct, it ignores revenue, but I couldn't find any revenue data
            this.oldClosedParkCount = 150;

            this.percentOfAdmissionConvertedToRevenue = 0.1;  // total BS, couldn't find real data, just trying to make the numbers work
            this.percentInStateVistors = 85;
            this.percentVehicleOwners = 95;

            this.tax = 18;
            this.percentCompliance = 100;
            this.isTaxPerVehicle = true;
            this.newAdmission = 0;
            this.newAdmissionAppliesToEveryone = false;
        },
        
        update: function () {

            //var monthlyCost = 250;
            this.estimatedCost = (this.monthlyCost * 12) + (this.primaryVisit * this.numberVisits);
            //
            this.total_score = this.planCost*this.planCost_weight + this.planCoverage*this.planCoverage_weight + this.docpref*this.docpref_weight + this.docNetwork*this.docNetwork_weight;
            this.total_weight = this.planCost_weight + this.planCoverage_weight + this.docpref_weight + this.docNetwork_weight;
            //

            var taxCount = this.isTaxPerVehicle ? this.registeredVehicleCount : this.taxpayerCount;
            this.taxCollected = this.tax * this.percentCompliance/100 * taxCount;
            
            var fractionOfVisitorsEligibleForNewAdmission = this.newAdmissionAppliesToEveryone ? 1 :
                (this.percentInStateVistors/100 * (this.isTaxPerVehicle ? (this.percentVehicleOwners/100) : 1));
            var averageAdmission = this.oldAdmission + fractionOfVisitorsEligibleForNewAdmission * (this.newAdmission - this.oldAdmission);

            // fake demand curve
            this.newVisitorCount = this.oldVisitorCount * Math.max(0.2, 1 + 0.5*Math.atan(1 - averageAdmission/this.oldAdmission));
            
            var oldRevenue = this.oldVisitorCount * this.oldAdmission * this.percentOfAdmissionConvertedToRevenue;
            var newRevenue = this.newVisitorCount * averageAdmission * this.percentOfAdmissionConvertedToRevenue;
            
            this.deltaRevenue = newRevenue - oldRevenue;
            this.deltaBudget = this.taxCollected + this.deltaRevenue;
            this.deltaVisitorCount = this.newVisitorCount - this.oldVisitorCount;
            this.relativeVisitorCount = Math.abs(this.deltaVisitorCount / this.oldVisitorCount);

            this.budget = this.oldBudget + this.deltaBudget;
            
            var maintainanceBudget = 600e6;
            var repairBudget = 750e6;
            var maxBudget = 1000e6;
            
            if (this.budget < maintainanceBudget) {
                this.scenarioIndex = 0;
                this.closedParkCount = this.oldClosedParkCount * (maintainanceBudget - this.budget) / (maintainanceBudget - this.oldBudget);
                this.closedParkCount = Math.round(this.closedParkCount);
            }
            else if (this.budget < repairBudget) {
                this.scenarioIndex = 1;
            }
            else if (this.budget < maxBudget) {
                this.scenarioIndex = 2;
                this.restorationTime = Math.round(10 - 9 * (this.budget - repairBudget) / (maxBudget - repairBudget));
            }
            else {
                this.scenarioIndex = 3;
                this.surplus = this.budget - maxBudget;
            }
        },
    });

});