"use strict";
var DisasterGroup;
(function (DisasterGroup) {
    DisasterGroup["Geophysical"] = "Geophysical";
    DisasterGroup["Meteorological"] = "Meteorological";
    DisasterGroup["Climatological"] = "Climatological";
    DisasterGroup["Hydrological"] = "Hydrological";
})(DisasterGroup || (DisasterGroup = {}));
var DisasterType;
(function (DisasterType) {
    DisasterType["Storm"] = "Storm";
    DisasterType["Wildfire"] = "Wildfire";
    DisasterType["ExtremeTemperature"] = "Extreme Temperature";
    DisasterType["Tornado"] = "Tornado";
    DisasterType["VolcanicEruption"] = "Volcanic Eruption";
    DisasterType["Flood"] = "Flood";
    DisasterType["Earthquake"] = "Earthquake";
    DisasterType["Landslide"] = "Landslide";
})(DisasterType || (DisasterType = {}));
var EmergencyUnit;
(function (EmergencyUnit) {
    EmergencyUnit["Police"] = "Police Dept";
    EmergencyUnit["Paramedics"] = "Health Assistance";
    EmergencyUnit["Firefighters"] = "Firefighters";
    EmergencyUnit["Government"] = "FEMA - Government";
    EmergencyUnit["RedCross"] = "Red Cross";
    EmergencyUnit["Residents"] = "Local Residents";
})(EmergencyUnit || (EmergencyUnit = {}));
class Disasters {
    constructor() {
        this.loadDisasterList();
        this.loadDisasterResponse();
    }
    loadDisasterList() {
        const dstrClima = {
            disasterGroup: DisasterGroup.Climatological,
            disasterTypes: [DisasterType.Wildfire]
        };
        const dstrGeo = {
            disasterGroup: DisasterGroup.Geophysical,
            disasterTypes: [DisasterType.Earthquake, DisasterType.VolcanicEruption]
        };
        const dstrMet = {
            disasterGroup: DisasterGroup.Meteorological,
            disasterTypes: [DisasterType.ExtremeTemperature, DisasterType.Storm, DisasterType.Tornado]
        };
        const dstrHydro = {
            disasterGroup: DisasterGroup.Hydrological,
            disasterTypes: [DisasterType.Flood]
        };
        Disasters.disasters.push(dstrClima, dstrGeo, dstrMet, dstrHydro);
    }
    loadDisasterResponse() {
        const basicUnitsResponse = [EmergencyUnit.Firefighters,
            EmergencyUnit.RedCross,
            EmergencyUnit.Residents,
            EmergencyUnit.Police];
        const respClimatological = {
            disasterGroup: DisasterGroup.Climatological,
            disasterTypes: [{ type: DisasterType.Wildfire,
                    emergencyUnits: basicUnitsResponse
                }]
        };
        const respGeophysical = {
            disasterGroup: DisasterGroup.Geophysical,
            disasterTypes: [{ type: DisasterType.Earthquake,
                    emergencyUnits: basicUnitsResponse.concat(EmergencyUnit.Paramedics)
                },
                { type: DisasterType.VolcanicEruption,
                    emergencyUnits: basicUnitsResponse.concat(EmergencyUnit.Paramedics, EmergencyUnit.Government)
                }]
        };
        const respMeteorological = {
            disasterGroup: DisasterGroup.Meteorological,
            disasterTypes: [{ type: DisasterType.ExtremeTemperature,
                    emergencyUnits: [EmergencyUnit.Residents, EmergencyUnit.Paramedics, EmergencyUnit.Firefighters]
                },
                { type: DisasterType.Storm,
                    emergencyUnits: basicUnitsResponse.concat(EmergencyUnit.Government)
                },
                { type: DisasterType.Tornado,
                    emergencyUnits: [EmergencyUnit.Firefighters, EmergencyUnit.RedCross, EmergencyUnit.Residents]
                }]
        };
        const respHydrological = {
            disasterGroup: DisasterGroup.Hydrological,
            disasterTypes: [{ type: DisasterType.Flood,
                    emergencyUnits: basicUnitsResponse
                }]
        };
        Disasters.disasterResponse = [respClimatological, respGeophysical, respMeteorological, respHydrological];
    }
}
Disasters.DisasterGroupDescriptions = {
    [DisasterGroup.Climatological]: "Hazard caused by atmospheric processes from climate variability.",
    [DisasterGroup.Geophysical]: "Hazard origitinating from solid earth.",
    [DisasterGroup.Meteorological]: "Hazard caused by extreme weather and atmospheric conditions.",
    [DisasterGroup.Hydrological]: "Hazard caused by movement, distrubution or ocurrence of surface freshwater and saltwater."
};
Disasters.DisasterTypeLabels = {
    [DisasterType.Earthquake]: "Earthquake",
    [DisasterType.Flood]: "Flood",
    [DisasterType.VolcanicEruption]: "Volcanic Eruption",
    [DisasterType.Tornado]: "Tornado",
    [DisasterType.ExtremeTemperature]: "Extreme Temperature (Heat or Cold Wave)",
    [DisasterType.Wildfire]: "Wild Fire",
    [DisasterType.Storm]: "Tropical Storm",
    [DisasterType.Landslide]: "Landslide - Avalanche"
};
Disasters.disasters = [];
Disasters.disasterResponse = [];
class DisasterReactionPlan extends Disasters {
    constructor() {
        super();
    }
    static getInstance() {
        if (DisasterReactionPlan.instance) {
            return this.instance;
        }
        this.instance = new DisasterReactionPlan();
        return this.instance;
    }
    getDisastersByGroup(filterBy) {
        var _a;
        this.disasterOfGroup = (_a = Disasters.disasters.find((group) => group.disasterGroup == filterBy)) === null || _a === void 0 ? void 0 : _a.disasterTypes;
        if (this.disasterOfGroup) {
            return this.disasterOfGroup;
        }
        throw new Error("List of disasters are empty, restart the app to load all values correctly.");
    }
    alertAssistanceUnits(disasterType) {
        return true;
    }
    reportDamages(damages) {
        this.damageReport = damages;
        return true;
    }
    printReport() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        let report;
        report = `Disaster Date: ${Utils.formatDate((_a = this.damageReport) === null || _a === void 0 ? void 0 : _a.dateTimeHappened)}\n` +
            `City of ${(_b = this.damageReport) === null || _b === void 0 ? void 0 : _b.city}, ${(_c = this.damageReport) === null || _c === void 0 ? void 0 : _c.state}\n` +
            `----------\n` +
            `Disaster: ${(_d = this.damageReport) === null || _d === void 0 ? void 0 : _d.disasterInfo.disasterType}\n` +
            `Duration: ${Utils.formatDurationHMS((_f = (_e = this.damageReport) === null || _e === void 0 ? void 0 : _e.disasterInfo.durationInSecs) !== null && _f !== void 0 ? _f : 0)}\n` +
            `Basic services availability: \n   Telecommunications: ${((_g = this.damageReport) === null || _g === void 0 ? void 0 : _g.disasterInfo.servicesAvailable.communications) ? 'Yes' : 'No'} `
            + `\n   Electricity: ${((_h = this.damageReport) === null || _h === void 0 ? void 0 : _h.disasterInfo.servicesAvailable.electricity) ? 'Yes' : 'No'} `
            + `\n   Transportation: ${((_j = this.damageReport) === null || _j === void 0 ? void 0 : _j.disasterInfo.servicesAvailable.transportation) ? 'Yes' : 'No'} `
            + `\n   Water: ${((_k = this.damageReport) === null || _k === void 0 ? void 0 : _k.disasterInfo.servicesAvailable.water) ? 'Yes' : 'No'} \n` +
            `Food Supply needed: ${((_l = this.damageReport) === null || _l === void 0 ? void 0 : _l.disasterInfo.foodNeeded) ? 'Yes' : 'No'}\n` +
            `Injuries Reported: ${(_m = this.damageReport) === null || _m === void 0 ? void 0 : _m.disasterInfo.injuriesToll.toLocaleString()}\n` +
            `Casualties Reported: ${(_o = this.damageReport) === null || _o === void 0 ? void 0 : _o.disasterInfo.casualtiesToll.toLocaleString()}\n` +
            `----------\n` +
            `Total Individuals Affected: ${(_p = this.damageReport) === null || _p === void 0 ? void 0 : _p.totalAffectedIndividuals.toLocaleString()}\n` +
            `Total Properties Affected: ${(_q = this.damageReport) === null || _q === void 0 ? void 0 : _q.totalAffectedProperties.toLocaleString()}\n` +
            `Total Refuggees: ${(_r = this.damageReport) === null || _r === void 0 ? void 0 : _r.totalRefuggees.toLocaleString()}\n` +
            `----------\n` +
            `Date reported: ${Utils.formatDate((_s = this.damageReport) === null || _s === void 0 ? void 0 : _s.dateReported)}\n` +
            `Reported by: ${(_t = this.damageReport) === null || _t === void 0 ? void 0 : _t.reportedBy} from unit: ${(_u = this.damageReport) === null || _u === void 0 ? void 0 : _u.reportedByEmergencyUnit}\n`;
        return report;
    }
}
class Utils {
    static formatDate(date) {
        return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
    }
    static fnGetRandomIntBetweenTwoVals(min = 0, max = Number.MAX_SAFE_INTEGER) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
    }
    ;
    static formatDurationHMS(durationInSeconds) {
        if (durationInSeconds >= 3600) {
            return new Date(durationInSeconds * 1000).toISOString().slice(11, 19) + ' hh:mm:ss';
        }
        return new Date(durationInSeconds * 1000).toISOString().slice(14, 19) + +' mm:ss';
    }
}
class EmergencyUnits {
    broadcastAlertByDisaster(disaster) {
        let alerted = false;
        let unitsToAlert = [];
        const unitsForCurrentDisaster = (Disasters.disasterResponse.find((val) => val.disasterGroup == disaster[0]).disasterTypes)
            .find((val) => val.type == disaster[1]).emergencyUnits;
        let broadcastMsgs = [];
        for (let dstrUnits of unitsForCurrentDisaster) {
            broadcastMsgs.push(`\nCALLING (888) 765-${Utils.fnGetRandomIntBetweenTwoVals().toString().substring(0, 4)}...\n${dstrUnits} contacted.\n`);
        }
        if (Array.isArray(unitsToAlert) && unitsToAlert.length > 0) {
            for (let unit in unitsToAlert) {
                console.info(unit);
            }
            alerted = true;
        }
        alerted = true;
        if (alerted) {
            console.info(`%cALERTING EMERGENCY UNITS FOR: ${disaster[0]} => ${disaster[1]}`, 'color:red; font-weight: bold;');
            console.info(...broadcastMsgs);
            return [alerted, '\nHelp is on the way!'];
        }
        throw new Error('There is an error in disaster identification, please restart system.');
    }
    alertUnit(unit) {
        console.info(`EMERGENCY UNIT ${unit} has been alerted.`);
    }
}
const date = (date = new Date()) => {
    return Utils.formatDate(date);
};
let disasterResearch = DisasterReactionPlan.getInstance();
disasterResearch.alertAssistanceUnits(DisasterType.Flood);
let objReportDamages = {
    dateTimeHappened: new Date('2019-02-09 04:35'),
    city: 'Buffalo',
    state: 'New York',
    disasterInfo: {
        disasterType: DisasterType.Flood,
        durationInSecs: 19692,
        servicesAvailable: {
            electricity: false,
            water: false,
            communications: false,
            transportation: true
        },
        foodNeeded: true,
        casualtiesToll: 14,
        injuriesToll: 1238
    },
    totalAffectedIndividuals: 1252,
    totalAffectedProperties: 149,
    totalRefuggees: 7921,
    dateReported: new Date('2021-02-09 04:59'),
    reportedBy: 'Mayor John Doe',
    reportedByEmergencyUnit: EmergencyUnit.Police
};
disasterResearch.reportDamages(objReportDamages);
console.info('%cWAC - Weather Assistance Commission', 'color:#21384d; font-size:17px; text-decoration: underline; font-weight: bold;');
console.info(`Today is: ${date()}.`);
let alertUnits = new EmergencyUnits();
let alertResponse = alertUnits.broadcastAlertByDisaster([DisasterGroup.Meteorological, DisasterType.Storm]);
console.info(alertResponse[1]);
console.info('%c\n PRINTING REPORT... ', 'background-color: black; color: white; font-weight: bold;');
console.info('%c' + disasterResearch.printReport(), 'color: blue');
console.info('\n%cTHANK YOU!', 'font-weight: bold');
//# sourceMappingURL=weather.js.map