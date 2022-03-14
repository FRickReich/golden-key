# golden-key-mern

Der Goldene Schlüssel ist eine Produktionsrelevante MERN stack applikation auf TypeScript basis, die verwendet werden kann um einen startpunkt für eine komplette MERN applikation zu entwickeln. Sie verfügt über ein Frontend in REACT, ein backend mit EXPESS, geschrieben in TypeScript und eine MongoDB anbindung, außerdem beinhaltet sie eine beispieldatei für den react context hook und einige weitere interessante features die es zu erforschen gilt.

## Tipps

Eine professionelle, produktionsrelevante Applikation hat im normalfall mehrere branches, die für verschiedene versionen der applikation genutzt werden.

das branch main oder master wird ausschließlich für fertige versionen, genutzt, nachdem features überprüft, getestet und gemerged wurden, auf main wird KEINE änderung direkt gepushed oder code comitted, ausschließlich per Pull Request wird hier etwas hinzugefügt.

Um allerdings an dingen zu arbeiten, wie features, oder neue branches zu erstellen um bugs zu fixen oder änderungen vorzuschlagen, gibt es im normalfall das branch "develop", dieses branch sollte sehr früh erstellt werden und in den repository settings als hauptbranch eingestellt werden, so werden alle änderungen erst hier hin gemerged, bevor sie manuell zu main hinzugefügt werden können. Eine gute idee ist es dann auch als branching rule zu verbieten, auf main ohne PR zu comitten.

Bei heroku könnt ihr die produktive und die develop version zeitgleich laufen lassen, dafür erstellt ihr einfach 2 projekte, und setzt die automatischen updates aus einem branch bei der einen version, die ihr zum beispiel "meinprojekt-develop" nennt auf "develop", und bei dem anderen, was eure produktionsversion namens "meinprojekt" ist, auf main. jetzt schreibt ihr euren code, macht änderungen und pusht sie immer zu develop, wodurch ihr eure änderungen dann auf meinprojekt-develop direkt testen könnt, sollte alles funktionieren (NICHT NUR AUF LOCALHOST SONDERN AUCH AUF DER DEVELOP ADRESSE) könnt ihr euren code von develop nach main mergen, und sehr dann die änderungen auf der produktiv version.

## Scripts

Die folgenden scripts sind in der package.json hinterlegt:

| Befehl       | Ausführung                                                                            | Beschreibung |
|--------------|---------------------------------------------------------------------------------------|--------------|
| lint         | eslint src/**                                                                         | Überprüfe alle dateien im ordner /src auf die richtige code convention |
| build:server | tsc ./src/server/**/**.* --outDir ./build/server --esModuleInterop                    | wandle alle typescript dateien im ordner /src/server/ und speichere die javascript dateien im ordner /build/server |
| start:server | nodemon --exec ts-node ./src/server/**.*                                              | Starte nodemon, und führe den typescript compiler an allen dateien im ordner /src/server/ aus wenn änderungen vorgenommen werden |
| build:client | parcel build --dist-dir ./build/client ./src/client/index.html --public-url ./static/ | Nutze parcel um das frontend in minimiertes javascript umzuwandeln |
| start:client | parcel watch --dist-dir ./build/client ./src/client/index.html --public-url ./static/ | nutze parcel um das frontend bei änderungen neu zu starten |
| build        | npm run build:server && npm run build:client                                          | führe die frontend und backend build befehle aus |
| start:dev    | npm run lint && concurrently \"npm run start:server\" \"npm run start:client\"        | starte den linter, dann starte gleichzeitig das frontend und backend |
| start        | node ./build/server/index.js                                                          | starte das backend |

## Dateien und ordner

Die folgende tabelle beinhaltet eine aufstellung aller odner und dateien im projekt.

| /                   | /../                     | /../../           | /../../../       | /../../../../         | /../../../../../ | /../../../../../../ | Beschreibung                                             |
|---------------------|--------------------------|-------------------|------------------|-----------------------|------------------|---------------------|----------------------------------------------------------|
| .parcel-cache       | *`[cache files]`*        |                   |                  |                       |                  |                     | Cache dateien von parcel                                 |
| build               |                          |                   |                  |                       |                  |                     | Ordner in dem das fertige projekt sitzt                  |
|                     | client                   |                   |                  |                       |                  |                     | Ordner in dem das fertige frontend sitzt                 |
|                     |                          | *`[build files]`* |                  |                       |                  |                     | Gebuildete frontend dateien                              |
|                     | server                   |                   |                  |                       |                  |                     | Ordner in dem das fertige backend sitzt                  |
|                     |                          | *`[build files]`* |                  |                       |                  |                     | Gebuildete backend dateien                               |
| node_modules        | *[ module directories ]* |                   |                  |                       |                  |                     | Node module                                              |
| src                 |                          |                   |                  |                       |                  |                     | "source directory" also der ornder, mit dem programmcode |
|                     | client                   |                   |                  |                       |                  |                     | Ordner mit frontend sourcecode                           |
|                     |                          |                   | app              |                       |                  |                     | Ordner mit react applikation                             |
|                     |                          |                   |                  | components            |                  |                     | Ordner mit React Komponenten                             |
|                     |                          |                   |                  |                       | Header           |                     | Ordner mit den dateien des Header komponenten            |
|                     |                          |                   |                  |                       |                  | `Header.tsx`        | Script datei des header komponenten                      |
|                     |                          |                   |                  |                       |                  | `Header.scss`       | Style datei des header komponenten                       |
|                     |                          |                   |                  |                       | Notification     |                     | Ordner mit dateien des Notification komponenten          |
|                     |                          |                   |                  |                       |                  | `Notification.scss` | Script datei des Notification komponenten                |
|                     |                          |                   |                  |                       |                  | `Notification.tsx`  | Style datei des Notification komponenten                 |
|                     |                          |                   |                  | pages                 |                  |                     | Ordner mit React seiten                                  |
|                     |                          |                   |                  |                       | `Dashboard.tsx`  |                     | Script datei der Dashboard seite                         |
|                     |                          |                   |                  |                       | `Home.tsx`       |                     | Script datei der Home seite                              |
|                     |                          |                   |                  |                       | `index.ts`       |                     | verteilerdatei für pages ordner                          |
|                     |                          |                   |                  |                       | `Login.tsx`      |                     | Script datei der login seite                             |
|                     |                          |                   |                  |                       | `NotFound.tsx`   |                     | Script datei der NotFound seite                          |
|                     |                          |                   |                  |                       | `Register.tsx`   |                     | Script datei der Register seite                          |
|                     |                          |                   |                  | `App.scss`            |                  |                     | Style datei der haupt applikations datei                 |
|                     |                          |                   |                  | `App.tsx`             |                  |                     | Haupt applikationsdatei                                  |
|                     |                          |                   |                  | `UserDataProvider.ts` |                  |                     | Context provider für userdaten                           |
|                     |                          |                   | `index.html`     |                       |                  |                     | HTML datei, auf der react läuft                          |
|                     |                          |                   | `index.tsx`      |                       |                  |                     | Datei die react ausführt                                 |
|                     | server                   |                   |                  |                       |                  |                     | Ordner mit backend sourcecode                            |
|                     |                          | controllers       |                  |                       |                  |                     | Ornder mit controllern für backend routen                |
|                     |                          |                   | api              |                       |                  |                     | Ornder für api controller                                |
|                     |                          |                   |                  | `users.ts`            |                  |                     | Datei mit controllern für "users" routen                 |
|                     |                          |                   | `frontend.ts`    |                       |                  |                     | Datei mit controllern für "frontend" routen              |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für controller                            |
|                     |                          | middlewares       |                  |                       |                  |                     | Ordner für backend middleware                            |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für middleware                            |
|                     |                          |                   | `users.ts`       |                       |                  |                     | Middleware für "users" routen                            |
|                     |                          | models            |                  |                       |                  |                     | Ordner für Mongoose modelle                              |
|                     |                          |                   | `User.ts`        |                       |                  |                     | Mongoose model und schema für "User" kollektion          |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für modelle und schemen                   |
|                     |                          | routes            |                  |                       |                  |                     | Ordner mit backend routen                                |
|                     |                          |                   | api              |                       |                  |                     | Ornder für api routen                                    |
|                     |                          |                   |                  | `users.ts`            |                  |                     | Routendatei für "users" pfad                             |
|                     |                          |                   | `frontend.ts`    |                       |                  |                     | Routendatei um das frontend anzubieten                   |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für routen                                |
|                     |                          | utils             |                  |                       |                  |                     | Ordner für kleine hilfescripts                           |
|                     |                          |                   | `accessToken.ts` |                       |                  |                     | Script für die bearbeitung von access_tokens             |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für hilfedateien                          |
|                     |                          |                   | `logger.ts`      |                       |                  |                     | Script für die anbindung eines logger                    |
|                     |                          | validations       |                  |                       |                  |                     | Ordner für user-validationen                             |
|                     |                          |                   | `index.ts`       |                       |                  |                     | Verteilerdatei für validatoren                           |
|                     |                          |                   | `users.ts`       |                       |                  |                     | Validationsscripts für die "users" route                 |
|                     |                          | `index.ts`        |                  |                       |                  |                     | Express backend applikationsdatei                        |
| `.env`              |                          |                   |                  |                       |                  |                     | Datei mit umgebungsvariablen                             |
| `.env.template`     |                          |                   |                  |                       |                  |                     | Vorlage für datei mit umgebungsvariablen                 |
| `.eslintrc.json`    |                          |                   |                  |                       |                  |                     | Einstellungen für den Linter                             |
| `.gitignore`        |                          |                   |                  |                       |                  |                     | Datei zum ignorieren von dateien bei push                |
| `LICENSE`           |                          |                   |                  |                       |                  |                     | Lizenzdatei für das aktuelle projekt                     |
| `package-lock-json` |                          |                   |                  |                       |                  |                     | Cache datei für projekt abhängigkeiten                   |
| `package.json`      |                          |                   |                  |                       |                  |                     | Datei mit projektinformationen und abhängigkeiten        |
| `README.md`         |                          |                   |                  |                       |                  |                     | Diese datei                                              |

## Node Module

Die folgenden module werden in diesem projekt verwendet, unter umständen hat die package json noch weitere abhängigkeiten, hier sind deswegen nur die wichtigsten module aufgelistet.

| DEV | Name                             | Version | Beschreibung |
|-----|----------------------------------|---------|--------------|
|  ✓  | @parcel/transformer-sass         | 2.3.2   | Parcel plugin um sass umwandeln zu können |
|  ✓  | @types/cookie-parser             | 1.4.2   | Typendeklaration für den cookie-parser |
|  ✓  | @types/csurf                     | 1.11.2  | Typendeklaration für csurf |
|  ✓  | @types/express                   | 4.17.13 | Typendeklaration für express |
|  ✓  | @types/express-session           | 1.17.4  | Typendeklaration für express-session |
|  ✓  | @types/node                      | 17.0.21 | Typendeklaration für nodejs standardbibliotheken |
|  ✓  | @types/js-cookie                 | 3.0.1   | Typendeklaration für js-cookie |
|  ✓  | @types/jsonwebtoken              | 8.5.8   | Typendeklaration für jsonwebtoken |
|  ✓  | @types/redis                     | 4.0.11  | Typendeklaration für redis |
|  ✓  | @typescript-eslint/eslint-plugin | 5.14.0  | Typescript plugin für eslint |
|  ✓  | @typescript-eslint/parser        | 5.14.0  | Typescript parser für eslint |
|  ✓  | eslint                           | 8.10.0  | Linter für Backend und Frontend code in Javascript und Typescript |
|  ✓  | nodemon                          | 2.0.15  | Echtzeit änderungen in code direkt hochfahren |
|  ✓  | parcel                           | 2.3.2   | Zum Builden von frontend applikationen ohne konfigurationen |
|  ✓  | ts-node                          | 10.6.0  | Typescript compiler für NodeJS anwendungen |
|  ✓  | typescript                       | 4.6.2   | Typescript modul zum bereitstellen von typescript in nodejs projekten |
|     | concurrently                     | 7.0.0   | Ausführen mehrerer terminal befehle gleichzeitig |
|     | axios                            | 0.26.1  | Bearbeitung von http anfragen |
|     | body-parser                      | 1.19.2  | Parsen des request bodies in express |
|     | cookie-parser                    | 1.4.6   | Parsen von cookies  in express |
|     | cors                             | 2.8.5   | MBibliothek zum nutzen von CORS |
|     | csurf                            | 1.11.0  | Modul zum verhindern von CSRF attacken |
|     | express                          | 4.17.3  | backend server |
|     | express-validator                | 6.14.0  | backend validationen |
|     | js-cookie                        | 3.0.1   | Lesen von cookies in frontend javascript |
|     | jsonwebtoken                     | 8.5.1   | Modul zum bearbeiten von JWT tokens |
|     | log4js                           | 6.4.2   | Loggen von informationen, anstelle des terminals |
|     | mongoose                         | 6.2.4   | Modul zur anbindung von MongoDB |
|     | react                            | 17.0.2  | Erstellen von SPA frontpage applikationen |
|     | react-dom                        | 17.0.2  | Bereistellen der React Dom |
|     | react-router                     | 6.2.2   | Hinzufügen von routen in React |
|     | react-router-dom                 | 6.2.2   | Modul zum bereitstellen der React Router Dom |
|     | sass                             | 1.49.9  | Kompilieren von SASS/SCSS in CSS |

