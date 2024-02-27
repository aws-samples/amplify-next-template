# Editieren wird einfacher (Version :VERSION)

## Neue Funktionen und Änderungen

- Es wird nun besser visualisiert, ob Einträge gespeichert sind oder noch nicht.
- Mit der Tastatur kann man nun zwischen den App Sektionen wechseln:
  - Today's Tasks mit `Control+T`
  - Meetings mit `Control+M`
  - Commitments mit `Control+C`
  - Suche mit `Control+K`
- Der Titel der aktuellen Seite wird nun bestimmt durch die aktuelle Sektion (z.B. Today's Tasks) und dem aktuell ausgewählten Eintrag. Bearbeite ich zum Beispiel gerade das Meeting: "Lukas/Wilfried Vorbereitung ACME", dann wäre der Titel der Seite: "Impulso - Lukas/Wilfried Vorbereitung ACME - Meeting"
- Die Editierfelder für neue Tagespläne und Aufgaben sind optimiert worden. In beiden Fällen wird die Eingabe mit der Enter-Taste bestätigt und gespeichert.
- Für alle Aktivitäten (Notizen in Projekten und Meetings) gibt es nun einen Markdown-fähigen Editor. Er versteht Shortcuts wie `#`, `##`, `-`, `>`, `[]` und wandelt diese in Überschriften, Listen, Blockzitate und Aufgaben um.
- Neue Projekte können jetzt auch in der Tagesübersicht erstellt werden.

Todos:

- [x] Besser visualisieren, ob ein ein Eintrag gespeichert ist cabcookie/personal-crm#8
- [x] Tastaturbefehle einführen cabcookie/personal-crm#4
- [x] Aktuelle Seite soll den Titel der Website bestimmen
- [x] Markdown-fähiger Editor cabcookie/personal-crm#6
- [x] Das Erstellen von neuen Projekten soll auch im DayPlan möglich sein

## Bekannte Fehler

- [ ] Beim Erstellen einer neuen Notiz in einem Meeting, verschwindet die Notiz zunächst. Erst beim Refreshen der Seite kehrt sie zurück

## Zukünftige Releases

- [ ] Tasks müssen in der Liste direkt editierbar sein, ohne dass der Task geöffnet werden muss
- [ ] Beim Scrollen soll der Titel im Header übernommen werden
- [ ] DayProjectTask und NonProjectTask überführen in Task
- [ ] Sicherstellen, dass die Daten durch das neue Release automatisch überführt werden
- [ ] Auf dem iPhone soll es nicht den Header geben, sondern das Logo am unteren Rand des Bildschirms
- [ ] Die Schriftgrößen für das iPhone anpassen

## Detailed changes

### Feature

#### control

- switch between app sections and open search bar with control keys [683a8c4](https://github.com/cabcookie/personal-crm/commit/683a8c4e8651b3acde8d58dabbe6a20c56eedfa0)

#### ui

- show state of persisting changes [1f019c0](https://github.com/cabcookie/personal-crm/commit/1f019c05cc844cbd28bf3235c9d91d063f6f0061)
- title of page is defined by section and selected record [2af2fa6](https://github.com/cabcookie/personal-crm/commit/2af2fa68d5466c162eb266c00ccc52a342d20d15)
- markdown editor (Slate) for any Activity notes [d4a95c2](https://github.com/cabcookie/personal-crm/commit/d4a95c274dd4c38aabab9611ce3bb7b395cafdc5)

### Bug Fixes

#### ui

- optimized visualization of forms for creating tasks and day plans [847cb1d](https://github.com/cabcookie/personal-crm/commit/847cb1d77eb285f87bff90ca51ceef62c128047e)

#### data

- better typing for serialize function [3780f31](https://github.com/cabcookie/personal-crm/commit/3780f318bfba3c66fc61207b844fd9ddaf8ea734)
- typing issues with transforming notes to MD and backwards [e025fd2](https://github.com/cabcookie/personal-crm/commit/e025fd23487bdd02c96c3df6186a0065093b3f92)

### Miscellaneous

#### ci

- add update of next.md [ed3f70e](https://github.com/cabcookie/personal-crm/commit/ed3f70e45ac2fe79c97d31b1f24ee3ba00c1e23f)
- moving next.md update to post-commit [60a547d](https://github.com/cabcookie/personal-crm/commit/60a547d3d9e33275a2736febe179f044f2eeff09)
- commits appended now [d5435b6](https://github.com/cabcookie/personal-crm/commit/d5435b60723d15df9447d155b435463035e01d5b)
- update release template and give release a name [cd77ca9](https://github.com/cabcookie/personal-crm/commit/cd77ca9bc7aff99e92da822ea6ca9ce88b782905)

#### import

- add additional sandbox environment and branch [e7af7bc](https://github.com/cabcookie/personal-crm/commit/e7af7bc7d44ab4670d78d8265620608e8856c43e)
