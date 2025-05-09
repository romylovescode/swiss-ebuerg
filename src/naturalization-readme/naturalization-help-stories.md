```
Ich als Entwickler möchte mit Frontend anfangen. Ein Project habe ich schon in vscode erstellt, dabei folgende gemacht:
- ich verwende Angular 19 und Angular Material als Framework und Jest für tests
- ich habe schon die ersten Codes mit Feature JWT implementiert.
- ich benutze gerne vorher Mock-Data bevor Backend überhaupt implementiert ist, Ziel ist es, unabhängig wie möglich Frontend zu implementieren.
Was soll ich nächstes implementieren?
```

Basierend auf deinem aktuellen Stand und dem Ziel, möglichst unabhängig vom Backend zu entwickeln, könntest du folgende nächste Schritte umsetzen:

1. **Auth- und Routing-Flow fertigstellen:**

   - Implementiere die Anmelde- und Registrierungsseiten mit Angular Material.
   - Erstelle Routing-Guards, die basierend auf dem JWT bzw. dem Mock-User-Status den Zugriff auf geschützte Routen kontrollieren.

2. **Mock-Service für User-Daten:**

   - Entwickle einen Mock-Service, der simulierterweise Benutzerinformationen, Authentifizierungsstatus sowie Fehlerfälle (z. B. ungültige Logins) bereitstellt.
   - Teste diesen Service mit Jest, um sicherzustellen, dass die Interaktionen und Zustandsänderungen (Loading, Fehler, Erfolg) korrekt funktionieren.

3. **Globale Fehler- und Benachrichtigungs-Komponenten:**

   - Erstelle ein Toast- oder Snackbar-System (z. B. unter Verwendung von Angular Material), um globale Benachrichtigungen wie Login-Erfolge oder Fehlermeldungen anzuzeigen.

4. **State Management aufbauen:**

   - Implementiere ein zentrales State-Management (zum Beispiel mit NgRx oder mittels Services), um den Authentifizierungsstatus und andere zentrale User-Daten im gesamten Frontend zu verwalten.

5. **Grundlegende Layout- und Navigationskomponenten:**

   - Erstelle ein responsives Layout mit einer Navigation (Sidebar oder Topbar) sowie Footer, welche sich dynamisch an den Authentifizierungsstatus anpasst.
   - Arbeite auch an einer einfachen mobilen Ansicht (Responsive Design).

6. **Unit- und Integrationstests erweitern:**
   - Schreibe Tests (mit Jest) für deine Komponenten, Services und Guards, um mindestens die Kernfunktionen (Login, Routing, Mock-Datenfluss) abzusichern.

Diese Schritte ermöglichen es dir, ein funktionierendes Frontend-Gerüst zu erstellen – mit realitätsnahen Mock-Daten –, das als solide Basis für die spätere Integration eines echten Backends dient. So kannst du den Benutzerfluss und die UI/UX weiter verfeinern, bevor die Backend-Implementierung startet.
