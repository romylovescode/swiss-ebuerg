Um Code-Beispiele zu erhalten, die nicht als "öffentlicher Code" blockiert werden, solltest du deine Anfragen spezifischer und individueller gestalten. Hier sind einige Strategien:

### Tipps für effektive Code-Anfragen:

1. **Stelle spezifische, projektbezogene Anfragen:**

   - "Wie kann ich in meiner Schweizer Einbürgerungs-App einen Aufenthaltsstatusbereich mit speziellen Schweizer Kantonsoptionen implementieren?"

2. **Beschreibe individuelle Anforderungen:**

   - "Ich brauche eine Angular Material Card-Komponente, die den Einbürgerungsfortschritt mit kantonsspezifischen Regeln visualisiert."

3. **Zeige eigenen Code-Anfang:**

   - Teile deinen bisherigen Ansatz und frage nach Ergänzungen oder Verbesserungen.

4. **Stelle Teilfragen:**
   - Statt nach einer kompletten Komponente zu fragen, frage nach einzelnen Aspekten wie dem Service, dem HTML-Template oder dem Styling.

### Beispiel für eine umformulierte Anfrage:

"Für meine Schweizer Einbürgerungs-App entwickle ich eine Profilkomponente. Ich habe folgendes Grundgerüst erstellt und würde gerne wissen, wie ich einen Kanton-Selector mit den 26 Schweizer Kantonen einbauen kann, der bei der Auswahl automatisch die kantonsspezifischen Einbürgerungsregeln lädt. Hier ist mein bisheriger Code-Ansatz:

```typescript
@Component({
  selector: "app-einbuergerung-profile",
  // Template hier
})
export class EinbuergerungProfileComponent {
  cantons = []; // Hier brauche ich die Kantone
  selectedCanton: string;

  // Wie implementiere ich die Methode zum Laden der kantonsspezifischen Regeln?
}
```

Wie würdest du die `loadCantonSpecificRules()`-Methode implementieren und das Dropdown für die Kantonsauswahl gestalten?"

Diese Art von Anfrage ist spezifisch genug und auf dein individuelles Projekt zugeschnitten, was die Chance erhöht, eine nicht blockierte Antwort zu erhalten.
