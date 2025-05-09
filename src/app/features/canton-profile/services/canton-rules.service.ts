import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Canton, CantonRules } from "../models/canton.model";

@Injectable({
  providedIn: "root",
})
export class CantonRulesService {
  // Liste der Schweizer Kantone mit erweiterten Informationen
  private readonly cantons: Canton[] = [
    {
      id: "1",
      code: "ZH",
      name: "Zürich",
      capital: "Zürich",
      population: 1539275,
      area: 1729,
      languages: ["Deutsch"],
      established: new Date("1351-05-01"),
      cantonalFlag: "https://example.com/flags/zh.png",
    },
    {
      id: "2",
      code: "BE",
      name: "Bern",
      capital: "Bern",
      population: 1039474,
      area: 5959,
      languages: ["Deutsch", "Französisch"],
      established: new Date("1353-03-06"),
      cantonalFlag: "https://example.com/flags/be.png",
    },
    {
      id: "3",
      code: "LU",
      name: "Luzern",
      capital: "Luzern",
      population: 413120,
      area: 1493,
      languages: ["Deutsch"],
      established: new Date("1332-11-07"),
      cantonalFlag: "https://example.com/flags/lu.png",
    },
    {
      id: "4",
      code: "UR",
      name: "Uri",
      capital: "Altdorf",
      population: 36703,
      area: 1077,
      languages: ["Deutsch"],
      established: new Date("1291-08-01"),
      cantonalFlag: "https://example.com/flags/ur.png",
    },
    {
      id: "5",
      code: "SZ",
      name: "Schwyz",
      capital: "Schwyz",
      population: 160480,
      area: 908,
      languages: ["Deutsch"],
      established: new Date("1291-08-01"),
      cantonalFlag: "https://example.com/flags/sz.png",
    },
    {
      id: "6",
      code: "OW",
      name: "Obwalden",
      capital: "Sarnen",
      population: 38108,
      area: 491,
      languages: ["Deutsch"],
      established: new Date("1291-08-01"),
      cantonalFlag: "https://example.com/flags/ow.png",
    },
    {
      id: "7",
      code: "NW",
      name: "Nidwalden",
      capital: "Stans",
      population: 43087,
      area: 276,
      languages: ["Deutsch"],
      established: new Date("1291-08-01"),
      cantonalFlag: "https://example.com/flags/nw.png",
    },
    {
      id: "8",
      code: "GL",
      name: "Glarus",
      capital: "Glarus",
      population: 40590,
      area: 685,
      languages: ["Deutsch"],
      established: new Date("1352-06-04"),
      cantonalFlag: "https://example.com/flags/gl.png",
    },
    {
      id: "9",
      code: "ZG",
      name: "Zug",
      capital: "Zug",
      population: 127642,
      area: 239,
      languages: ["Deutsch"],
      established: new Date("1352-06-27"),
      cantonalFlag: "https://example.com/flags/zg.png",
    },
    {
      id: "10",
      code: "FR",
      name: "Freiburg",
      capital: "Freiburg",
      population: 321783,
      area: 1671,
      languages: ["Französisch", "Deutsch"],
      established: new Date("1481-12-22"),
      cantonalFlag: "https://example.com/flags/fr.png",
    },
    {
      id: "11",
      code: "SO",
      name: "Solothurn",
      capital: "Solothurn",
      population: 275247,
      area: 791,
      languages: ["Deutsch"],
      established: new Date("1481-12-22"),
      cantonalFlag: "https://example.com/flags/so.png",
    },
    {
      id: "12",
      code: "BS",
      name: "Basel-Stadt",
      capital: "Basel",
      population: 201156,
      area: 37,
      languages: ["Deutsch"],
      established: new Date("1501-07-13"),
      cantonalFlag: "https://example.com/flags/bs.png",
    },
    {
      id: "13",
      code: "BL",
      name: "Basel-Landschaft",
      capital: "Liestal",
      population: 291461,
      area: 518,
      languages: ["Deutsch"],
      established: new Date("1833-08-17"),
      cantonalFlag: "https://example.com/flags/bl.png",
    },
    {
      id: "14",
      code: "SH",
      name: "Schaffhausen",
      capital: "Schaffhausen",
      population: 82348,
      area: 298,
      languages: ["Deutsch"],
      established: new Date("1501-08-10"),
      cantonalFlag: "https://example.com/flags/sh.png",
    },
    {
      id: "15",
      code: "AR",
      name: "Appenzell Ausserrhoden",
      capital: "Herisau",
      population: 55234,
      area: 243,
      languages: ["Deutsch"],
      established: new Date("1513-12-17"),
      cantonalFlag: "https://example.com/flags/ar.png",
    },
    {
      id: "16",
      code: "AI",
      name: "Appenzell Innerrhoden",
      capital: "Appenzell",
      population: 16145,
      area: 173,
      languages: ["Deutsch"],
      established: new Date("1513-12-17"),
      cantonalFlag: "https://example.com/flags/ai.png",
    },
    {
      id: "17",
      code: "SG",
      name: "St. Gallen",
      capital: "St. Gallen",
      population: 510734,
      area: 2031,
      languages: ["Deutsch"],
      established: new Date("1803-02-19"),
      cantonalFlag: "https://example.com/flags/sg.png",
    },
    {
      id: "18",
      code: "GR",
      name: "Graubünden",
      capital: "Chur",
      population: 199021,
      area: 7105,
      languages: ["Deutsch", "Italienisch", "Rätoromanisch"],
      established: new Date("1803-02-19"),
      cantonalFlag: "https://example.com/flags/gr.png",
    },
    {
      id: "19",
      code: "AG",
      name: "Aargau",
      capital: "Aarau",
      population: 685845,
      area: 1404,
      languages: ["Deutsch"],
      established: new Date("1803-02-19"),
      cantonalFlag: "https://example.com/flags/ag.png",
    },
    {
      id: "20",
      code: "TG",
      name: "Thurgau",
      capital: "Frauenfeld",
      population: 279547,
      area: 991,
      languages: ["Deutsch"],
      established: new Date("1803-02-19"),
      cantonalFlag: "https://example.com/flags/tg.png",
    },
    {
      id: "21",
      code: "TI",
      name: "Tessin",
      capital: "Bellinzona",
      population: 351491,
      area: 2812,
      languages: ["Italienisch"],
      established: new Date("1803-02-19"),
      cantonalFlag:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Canton_of_Ticino.svg/2048px-Flag_of_Canton_of_Ticino.svg.png",
    },
    {
      id: "22",
      code: "VD",
      name: "Waadt",
      capital: "Lausanne",
      population: 805098,
      area: 3212,
      languages: ["Französisch"],
      established: new Date("1803-02-19"),
      cantonalFlag: "https://example.com/flags/vd.png",
    },
    {
      id: "23",
      code: "VS",
      name: "Wallis",
      capital: "Sitten",
      population: 345525,
      area: 5224,
      languages: ["Deutsch", "Französisch"],
      established: new Date("1815-08-04"),
      cantonalFlag: "https://example.com/flags/vs.png",
    },
    {
      id: "24",
      code: "NE",
      name: "Neuenburg",
      capital: "Neuenburg",
      population: 176850,
      area: 802,
      languages: ["Französisch"],
      established: new Date("1815-05-19"),
      cantonalFlag: "https://example.com/flags/ne.png",
    },
    {
      id: "25",
      code: "GE",
      name: "Genf",
      capital: "Genf",
      population: 504128,
      area: 282,
      languages: ["Französisch"],
      established: new Date("1815-05-19"),
      cantonalFlag: "https://example.com/flags/ge.png",
    },
    {
      id: "26",
      code: "JU",
      name: "Jura",
      capital: "Delsberg",
      population: 73584,
      area: 838,
      languages: ["Französisch"],
      established: new Date("1979-01-01"),
      cantonalFlag: "https://example.com/flags/ju.png",
    },
  ];

  // Mock-Datenbank für kantonsspezifische Regeln
  private readonly cantonRulesMap: Record<string, CantonRules> = {
    ZH: {
      residenceRequirement: "2 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Deutsch)",
      additionalRequirements:
        "Integration in Gemeinschaft nachweisen, Grundkenntnisse über Schweizer Lebensverhältnisse",
      naturalizedPersonsCount: 3458,
      localAuthority: "Gemeindeamt des Kantons Zürich",
      specificRules: [
        {
          id: "zh-rule-1",
          title: "Einbürgerungstest",
          description:
            "Schriftlicher Test über lokale Gegebenheiten und Schweizer Politik ist obligatorisch",
          effectiveDate: new Date("2018-01-01"),
          category: "Allgemein",
        },
        {
          id: "zh-rule-2",
          title: "Gebührenordnung",
          description:
            "Staffelung der Gebühren nach Aufwand, zwischen CHF 1'500 und CHF 3'000",
          effectiveDate: new Date("2020-03-15"),
          category: "Finanziell",
        },
      ],
    },
    BE: {
      residenceRequirement: "2 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement:
        "B1 mündlich, A2 schriftlich (Deutsch oder Französisch)",
      additionalRequirements:
        "Teilnahme am sozialen und wirtschaftlichen Leben",
      naturalizedPersonsCount: 2140,
      localAuthority: "Amt für Migration und Personenstand",
      specificRules: [
        {
          id: "be-rule-1",
          title: "Zweisprachigkeit",
          description:
            "In zweisprachigen Gemeinden kann die Einbürgerung in Deutsch oder Französisch durchgeführt werden",
          effectiveDate: new Date("2017-06-01"),
          category: "Sprache",
        },
        {
          id: "be-rule-2",
          title: "Gemeindeautonomie",
          description: "Gemeinden können zusätzliche Anforderungen stellen",
          effectiveDate: new Date("2019-01-01"),
          category: "Verfahren",
        },
      ],
    },
    LU: {
      residenceRequirement: "3 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Deutsch)",
      additionalRequirements:
        "Grundkenntnisse der geografischen, historischen, politischen und gesellschaftlichen Verhältnisse",
      naturalizedPersonsCount: 876,
      localAuthority: "Justiz- und Sicherheitsdepartement",
      specificRules: [
        {
          id: "lu-rule-1",
          title: "Staatskunde-Nachweis",
          description:
            "Nachweis über besuchte Staatskundekurse oder bestandenen Einbürgerungstest",
          effectiveDate: new Date("2018-01-01"),
          category: "Bildung",
        },
      ],
    },
    ZG: {
      residenceRequirement: "5 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 in Deutsch",
      additionalRequirements:
        "Finanzielle Unabhängigkeit, keine Steuerausstände",
      naturalizedPersonsCount: 542,
      localAuthority: "Direktion des Innern",
      specificRules: [
        {
          id: "zg-rule-1",
          title: "Finanznachweis",
          description:
            "Nachweis über finanzielle Stabilität und Unabhängigkeit von Sozialhilfe in den letzten 5 Jahren",
          effectiveDate: new Date("2018-01-01"),
          category: "Finanziell",
        },
        {
          id: "zg-rule-2",
          title: "Strafregisterauszug",
          description:
            "Einreichung eines aktuellen Strafregisterauszugs aus allen Ländern, in denen der Antragsteller gelebt hat",
          effectiveDate: new Date("2019-07-01"),
          category: "Dokumente",
        },
      ],
    },
    GR: {
      residenceRequirement:
        "2 Jahre in derselben Gemeinde, 10 Jahre in der Schweiz",
      languageRequirement:
        "B1 in einer der Kantonssprachen (Deutsch, Italienisch oder Rätoromanisch)",
      additionalRequirements:
        "Integration in lokale Gemeinschaft, Kenntnisse der lokalen Kultur",
      naturalizedPersonsCount: 325,
      localAuthority: "Amt für Migration und Zivilrecht",
      specificRules: [
        {
          id: "gr-rule-1",
          title: "Mehrsprachige Einbürgerung",
          description:
            "Einbürgerungstest kann in einer der drei Kantonssprachen abgelegt werden",
          effectiveDate: new Date("2018-04-15"),
          category: "Sprache",
        },
        {
          id: "gr-rule-2",
          title: "Regionale Besonderheiten",
          description:
            "Berücksichtigung der unterschiedlichen kulturellen Traditionen in den Regionen",
          effectiveDate: new Date("2018-01-01"),
          category: "Kultur",
        },
      ],
    },
    TI: {
      residenceRequirement: "5 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Italienisch)",
      additionalRequirements:
        "Integration in lokale Gemeinschaft, Kenntnisse der Schweizer und Tessiner Kultur",
      naturalizedPersonsCount: 689,
      localAuthority: "Sezione della popolazione",
      specificRules: [
        {
          id: "ti-rule-1",
          title: "Sprachnachweis",
          description:
            "Obligatorischer Italienisch-Sprachtest für alle Bewerber",
          effectiveDate: new Date("2019-01-01"),
          category: "Sprache",
        },
      ],
    },
    GE: {
      residenceRequirement: "2 Jahre im Kanton, 10 Jahre in der Schweiz",
      languageRequirement: "B1 mündlich, A2 schriftlich (Französisch)",
      additionalRequirements:
        "Integration in die lokale Gesellschaft, Respektierung der Genfer Werte",
      naturalizedPersonsCount: 1892,
      localAuthority: "Office cantonal de la population et des migrations",
      specificRules: [
        {
          id: "ge-rule-1",
          title: "Beschleunigte Einbürgerung für internationale Mitarbeiter",
          description:
            "Sonderverfahren für Mitarbeiter internationaler Organisationen",
          effectiveDate: new Date("2020-01-01"),
          category: "Verfahren",
        },
        {
          id: "ge-rule-2",
          title: "Genfer Werte",
          description:
            "Bekenntnis zu den Grundwerten wie Laizität und internationaler Öffnung",
          effectiveDate: new Date("2018-06-01"),
          category: "Werte",
        },
      ],
    },
  };

  constructor() {}

  // Gibt alle Kantone zurück
  getCantons(): Observable<Canton[]> {
    return of(this.cantons).pipe(delay(300));
  }

  // Gibt einen bestimmten Kanton zurück
  getCantonByCode(code: string): Observable<Canton | undefined> {
    const canton = this.cantons.find((c) => c.code === code);
    return of(canton).pipe(delay(200));
  }

  // Lädt die Regeln für einen spezifischen Kanton
  getCantonRules(cantonCode: string): Observable<CantonRules> {
    // Mock einer API-Anfrage mit einer Verzögerung
    return of(
      this.cantonRulesMap[cantonCode] || {
        residenceRequirement: "10 Jahre in der Schweiz",
        languageRequirement: "Kenntnisse einer Landessprache",
        additionalRequirements: "Integration, Respektierung der Rechtsordnung",
      },
    ).pipe(
      delay(800), // Simuliert Netzwerkverzögerung
    );
  }

  // Lädt alle Daten zu einem Kanton (Kombination aus Kanton und Regeln)
  getCantonDetails(cantonCode: string): Observable<Canton & CantonRules> {
    const canton = this.cantons.find((c) => c.code === cantonCode);
    const rules = this.cantonRulesMap[cantonCode] || {
      residenceRequirement: "10 Jahre in der Schweiz",
      languageRequirement: "Kenntnisse einer Landessprache",
      additionalRequirements: "Integration, Respektierung der Rechtsordnung",
    };

    if (!canton) {
      return of({
        code: cantonCode,
        name: "Unbekannter Kanton",
        ...rules,
      } as Canton & CantonRules).pipe(delay(1000));
    }

    return of({
      ...canton,
      ...rules,
    }).pipe(delay(1000));
  }

  // Update-Funktion für Kantonsregeln (Mock)
  updateCantonRules(
    cantonCode: string,
    updatedRules: Partial<CantonRules>,
  ): Observable<CantonRules> {
    if (this.cantonRulesMap[cantonCode]) {
      this.cantonRulesMap[cantonCode] = {
        ...this.cantonRulesMap[cantonCode],
        ...updatedRules,
      };
    } else {
      this.cantonRulesMap[cantonCode] = {
        residenceRequirement: "10 Jahre in der Schweiz",
        languageRequirement: "Kenntnisse einer Landessprache",
        additionalRequirements: "Integration, Respektierung der Rechtsordnung",
        ...updatedRules,
      };
    }

    return of(this.cantonRulesMap[cantonCode]).pipe(delay(1200));
  }
}
