// Lets practice with an exercise:
// There is a Weather Administration that have a Commision for studying natural disasters,
// they have a classification for this work that says:
//  - You have a weather system, in there you manage some kind of events (storms, wild fires, Extreme Temperature, tornados, volcanic eruption, floods and earthquakes)
//  - These disasters are classified in: Geophysical, Meteorological and Climatological
//  - You need to get a response for these disasters in case any occur, to alert a set of corresponding authority to go to the assistance of those affected.
//  - Lastly, you need to get information about the disaster and store a report for these values (people affected, city, state, date and time, etc.)
//  -- You can mock the values and use at least 1 use case for each classification set.
//  -- You need to print a report with the information resulted in values obtained from the disaster.


/*
    CYCLE FOR DISASTER ASSISTANCE
    1. When a disaster is detected, do a research to stablish a plan for help the affected areas.
    2. Notify all involved assitance units needed for inmediate response
        - Police
        - Paramedics
        - Firefighters
        - Government
        - Red Cross
        - Local residents (volunteers)
    3. Get a report of all damages: total individuals, properties and refuggees by location (city, state).
*/
console.info("%c weather.ts", style);
enum DisasterGroup {
    Geophysical = "Geophysical",
    Meteorological = "Meteorological",
    Climatological = "Climatological",
    Hydrological = "Hydrological"
}

enum DisasterType {
    Storm = "Storm",
    Wildfire = "Wildfire",
    ExtremeTemperature = "Extreme Temperature",
    Tornado = "Tornado",
    VolcanicEruption = "Volcanic Eruption",
    Flood = "Flood",
    Earthquake = "Earthquake",
    Landslide = "Landslide"
}

enum EmergencyUnit {
    Police = "Police Dept",
    Paramedics = "Health Assistance",
    Firefighters = "Firefighters",
    Government = "FEMA - Government",
    RedCross = "Red Cross",
    Residents = "Local Residents"
}

type DisastersList = { 
    disasterGroup: DisasterGroup;
    disasterTypes: DisasterType[];
}

type Reports = {
    dateReported: Date;
    reportedBy: string;
    reportedByEmergencyUnit: EmergencyUnit;
}

type Damages = {
    dateTimeHappened: Date;
    city: string;
    state: string;
    disasterInfo: { 
        disasterType: DisasterType,
        durationInSecs: number,
        servicesAvailable: {
            electricity: boolean,
            water: boolean,
            communications: boolean,
            transportation: boolean
        },
        foodNeeded: boolean,
        casualtiesToll: number,
        injuriesToll: number
    };
    totalAffectedIndividuals: number;
    totalAffectedProperties: number;
    totalRefuggees: number;
}

type DisasterResponse = {
    disasterGroup: DisasterGroup, 
    disasterTypes: { type: DisasterType, 
                        emergencyUnits: EmergencyUnit[]
                    }[]
}

//#region HELPER METHODS AND OTHERS
abstract class Disasters {
    // USING index properties you can iterate values contained in enum and get a value from a property contained in it and match the description from there.
    static DisasterGroupDescriptions: { [key in DisasterGroup]: string} = {
        [DisasterGroup.Climatological]: "Hazard caused by atmospheric processes from climate variability.",
        [DisasterGroup.Geophysical]: "Hazard origitinating from solid earth.",
        [DisasterGroup.Meteorological]: "Hazard caused by extreme weather and atmospheric conditions.",
        [DisasterGroup.Hydrological]: "Hazard caused by movement, distrubution or ocurrence of surface freshwater and saltwater."
    }

    static DisasterTypeLabels: { [key in DisasterType]: string} = {
        [DisasterType.Earthquake]: "Earthquake",
        [DisasterType.Flood]: "Flood",
        [DisasterType.VolcanicEruption]: "Volcanic Eruption",
        [DisasterType.Tornado]: "Tornado",
        [DisasterType.ExtremeTemperature]: "Extreme Temperature (Heat or Cold Wave)",
        [DisasterType.Wildfire]: "Wild Fire",
        [DisasterType.Storm]: "Tropical Storm",
        [DisasterType.Landslide]: "Landslide - Avalanche"
    }

    static disasters: DisastersList[] = [];

    static disasterResponse: DisasterResponse[] = [];

    constructor(){
        this.loadDisasterList();
        this.loadDisasterResponse();
    }

    abstract getDisastersByGroup(filterBy: DisasterGroup): void;
    loadDisasterList(){
        const dstrClima: DisastersList = {
            disasterGroup: DisasterGroup.Climatological,
            disasterTypes: [DisasterType.Wildfire]
        };
        const dstrGeo: DisastersList = {
            disasterGroup: DisasterGroup.Geophysical,
            disasterTypes: [DisasterType.Earthquake, DisasterType.VolcanicEruption]
        };
        const dstrMet: DisastersList = {
            disasterGroup: DisasterGroup.Meteorological,
            disasterTypes: [DisasterType.ExtremeTemperature, DisasterType. Storm, DisasterType.Tornado]
        };
        const dstrHydro: DisastersList ={
            disasterGroup: DisasterGroup.Hydrological,
            disasterTypes: [DisasterType.Flood]
        };
        Disasters.disasters.push(dstrClima, dstrGeo, dstrMet, dstrHydro);
    }
    loadDisasterResponse(){
        const basicUnitsResponse = [EmergencyUnit.Firefighters, 
                                    EmergencyUnit.RedCross, 
                                    EmergencyUnit.Residents, 
                                    EmergencyUnit.Police];
        const respClimatological: DisasterResponse = {
            disasterGroup: DisasterGroup.Climatological, 
            disasterTypes: [{ type: DisasterType.Wildfire, 
                              emergencyUnits: basicUnitsResponse 
                            }]
        };
        const respGeophysical: DisasterResponse = {
            disasterGroup: DisasterGroup.Geophysical, 
            disasterTypes: [{ type: DisasterType.Earthquake, 
                                emergencyUnits: basicUnitsResponse.concat(EmergencyUnit.Paramedics)
                            }, 
                            { type: DisasterType.VolcanicEruption, 
                                emergencyUnits: basicUnitsResponse.concat(EmergencyUnit.Paramedics, EmergencyUnit.Government)
                            }]
        };
        const respMeteorological= {
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
        const respHydrological= {
            disasterGroup: DisasterGroup.Hydrological, 
            disasterTypes: [{ type: DisasterType.Flood, 
                              emergencyUnits: basicUnitsResponse 
                            }]
        };
        Disasters.disasterResponse = [respClimatological, respGeophysical, respMeteorological, respHydrological];
    }
}

interface AssistancePlan {
    // Starts the assistance process, depending on the type of disaster (by group) and depending on the magnitude, activates emergency assistance by entity (police, doctors, etc.)
    alertAssistanceUnits(disasterType: DisasterType): boolean;
    reportDamages(damages: Damages & Reports): boolean;
}

class DisasterReactionPlan extends Disasters implements AssistancePlan {
    private static instance: DisasterReactionPlan;
    disasterOfGroup?: DisasterType[];
    damageReport?: Damages & Reports;
    private constructor(){
        super();
    }

    static getInstance(){
        if (DisasterReactionPlan.instance){
            return this.instance;
        } 
        this.instance = new DisasterReactionPlan();
        return this.instance;
    }

    getDisastersByGroup(filterBy: DisasterGroup) {
        this.disasterOfGroup = Disasters.disasters.find((group) => group.disasterGroup == filterBy )?.disasterTypes;
        if(this.disasterOfGroup){
            return this.disasterOfGroup;
        }
        throw new Error("List of disasters are empty, restart the app to load all values correctly.");
    }

    alertAssistanceUnits(disasterType: DisasterType) {
        return true;
    }
    reportDamages(damages: Damages & Reports) {
        this.damageReport = damages;
        return true;
    }

    printReport(){
        let report: string;
        report = `Disaster Date: ${Utils.formatDate(this.damageReport?.dateTimeHappened!)}\n` +
                 `City of ${this.damageReport?.city}, ${this.damageReport?.state}\n` +
                 `----------\n` + 
                 `Disaster: ${this.damageReport?.disasterInfo.disasterType}\n` +
                 `Duration: ${Utils.formatDurationHMS(this.damageReport?.disasterInfo.durationInSecs ?? 0)}\n` +
                 `Basic services availability: \n   Telecommunications: ${this.damageReport?.disasterInfo.servicesAvailable.communications ? 'Yes': 'No'} `
                                             +`\n   Electricity: ${this.damageReport?.disasterInfo.servicesAvailable.electricity ? 'Yes': 'No'} `
                                             +`\n   Transportation: ${this.damageReport?.disasterInfo.servicesAvailable.transportation ? 'Yes': 'No'} `
                                             +`\n   Water: ${this.damageReport?.disasterInfo.servicesAvailable.water ? 'Yes': 'No'} \n` +
                `Food Supply needed: ${this.damageReport?.disasterInfo.foodNeeded ? 'Yes': 'No'}\n` +
                `Injuries Reported: ${this.damageReport?.disasterInfo.injuriesToll.toLocaleString()}\n` +
                `Casualties Reported: ${this.damageReport?.disasterInfo.casualtiesToll.toLocaleString()}\n` +
                `----------\n` + 
                `Total Individuals Affected: ${this.damageReport?.totalAffectedIndividuals.toLocaleString()}\n` +
                `Total Properties Affected: ${this.damageReport?.totalAffectedProperties.toLocaleString()}\n` +
                `Total Refuggees: ${this.damageReport?.totalRefuggees.toLocaleString()}\n`+
                `----------\n` + 
                `Date reported: ${Utils.formatDate(this.damageReport?.dateReported!)}\n` +
                `Reported by: ${this.damageReport?.reportedBy} from unit: ${this.damageReport?.reportedByEmergencyUnit}\n`;
        return report;
    }
}

class Utils {
    static formatDate(date: Date): string
    {
        return [date.getMonth()+1, date.getDate(), date.getFullYear()].join('/');
    }
    static fnGetRandomIntBetweenTwoVals(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number { 
        return Math.floor(Math.random() * (Math.floor(max)-Math.ceil(min)) + min);
    };
    static formatDurationHMS(durationInSeconds: number){
        if(durationInSeconds >= 3600){
            return new Date(durationInSeconds*1000).toISOString().slice(11,19) + ' hh:mm:ss';
        }
        return new Date(durationInSeconds*1000).toISOString().slice(14,19) + + ' mm:ss';
    }
}

class EmergencyUnits {

    broadcastAlertByDisaster(disaster: [DisasterGroup, DisasterType]): [boolean, string]{
        let alerted = false;
        let unitsToAlert: EmergencyUnit[] = [];
        const unitsForCurrentDisaster = (Disasters.disasterResponse.find((val) => val.disasterGroup == disaster[0])!.disasterTypes)
                                                                            .find((val) => val.type == disaster[1])!.emergencyUnits;
        let broadcastMsgs: string[] = [];
        for (let dstrUnits of unitsForCurrentDisaster)
        {
            broadcastMsgs.push(`\nCALLING (888) 765-${Utils.fnGetRandomIntBetweenTwoVals().toString().substring(0,4)}...\n${dstrUnits} contacted.\n`);
        }
        // NOT IN USE, LEFT HERE TO TEST LINTERN CONFIGS (ESLINT)
        if(Array.isArray(unitsToAlert) && unitsToAlert.length > 0){
            for(let unit in unitsToAlert)
            {
                console.info(unit);
                //this.alertUnit(unit);
            }
            alerted = true;
        }
        alerted = true;

        if(alerted){
            console.info(`%cALERTING EMERGENCY UNITS FOR: ${disaster[0]} => ${disaster[1]}`, 'color:red; font-weight: bold;');
            console.info(...broadcastMsgs);
            return [alerted, '\nHelp is on the way!']
        }
        throw new Error('There is an error in disaster identification, please restart system.');
    }

    alertUnit(unit: EmergencyUnit){
        console.info(`EMERGENCY UNIT ${unit} has been alerted.`);
    }
}
//#endregion


//#region SETTING AND GETTING VALUES
const date = (date = new Date()) => { 
    return Utils.formatDate(date); 
}
// INITIALIZE PROCESS
let disasterResearch = DisasterReactionPlan.getInstance();

// RESEARCH FOR DISASTER AFTER GETTING ALERTED

// ALERT ALL EMERGENCY UNITS
disasterResearch.alertAssistanceUnits(DisasterType.Flood);

// REPORT DAMAGES:
let objReportDamages: Damages & Reports = 
{
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
//#endregion


//#region OUTPUT DATA
console.info('%cWAC - Weather Assistance Commission', 'color:#21384d; font-size:17px; text-decoration: underline; font-weight: bold;');
console.info(`Today is: ${date()}.`);
//BROADCAST ALERT FOR DISASTER TYPE
let alertUnits = new EmergencyUnits();
let alertResponse = alertUnits.broadcastAlertByDisaster([DisasterGroup.Meteorological, DisasterType.Storm]);
console.info(alertResponse[1]);
// PRINT REPORT: 
console.info('%c\n PRINTING REPORT... ', 'background-color: black; color: white; font-weight: bold;');
console.info('%c'+disasterResearch.printReport(), 'color: blue');
//#endregion
console.info('\n%cTHANK YOU!', 'font-weight: bold');
// FINISH


/*
FACTS: 
Remember, this is a simple practice, not a real world escenario.
In a functional app, better approach would be:
- Define a DS based on data required.
- Build db tables to store data.
- Extract information via Stored procedures (+ or views, functions, etc.)
- Connect app via RESTful API (with URI for each object required)
- Separate concerns in multiple layer project (depending on complexity of the project or scope)
- If scope is a wide use app with multiple use cases, would consider a hexagonal arquitecture or a more simple repository pattern.
- For reports is a better practice to use: SSRS, Tableau, Power BI, others.

In my case, i just was trying to build a lot of classes, interfaces, union types, types, index properties, 
static props and methods, abstract classed, inherit from them, extends interfaces, etc.

In my other practices, ill be using better practices, stay tune!

*/
