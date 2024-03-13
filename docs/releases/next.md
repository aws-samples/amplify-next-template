# Bug-Fixing für das Editieren (Version :VERSION)

## Änderungen

### User Interface Dokumentation

Für eine robustere Oberfläche, haben wir [StoryBook](https://storybook.js.org/) mit aufgenommen. StoryBook hilft UI Komponenten zu dokumentieren und zu testen.

Folgende UI Komponenten sind bisher in der Dokumentation aufgenommen und entsprechend überarbeitet, dass sie unabhängig von ihrer Umgebung funktionieren:

- `SearchBar.tsx`
- `Logo.tsx`
- `ProfilePicture.tsx`
- `ContextSwitcher.tsx`
- `MainNavigationSection.tsx`
- `NavigationMenu.tsx`
- `Header.tsx`

## Todos für dieses Release

- [ ] List Items verschwinden durch speichern und wieder editieren
- [ ] Numerierte Listen unterstützen
- [ ] Beim Erstellen einer neuen Notiz in einem Meeting, verschwindet die Notiz zunächst. Erst beim Refreshen der Seite kehrt sie zurück
- [ ] Das Editierfeld wird nicht geleert, nach dem Speichern
- [ ] Tasks müssen in der Liste direkt editierbar sein, ohne dass der Task geöffnet werden muss

- [ ] Todos und Vereinbarungen aus Meetings hervorheben
- [ ] Die Suche funktioniert im Moment nicht
- [ ] Seite /tasks/:id gibt keine Indikation, ob die Änderungen gespeichert sind
- [ ] Auf der DayPlan Seite, wenn ich eine Aufgabe abschließe, gehen für alle Tasks die Projekte verloren
- [ ] Hyperlinks erkennen
- [ ] Die Schriftgrößen für das iPhone anpassen

## Bekannte Fehler

## Geplante neue Funktionen

- [ ] Bei Task Detailseite auch die Meetings anzeigen
- [ ] Projektliste und Detailseite
- [ ] Personenliste und Detailseite
- [ ] Account-Liste und Detailseite
- [ ] Projekte sollen abgeschlossen werden können
- [ ] Kontexte mit Tastaturkombinationen wechseln (^+W, ^+H, ^+P)
- [ ] Tastaturbefehle anzeigen, wenn die "Control" Taste gedrückt ist
- [ ] Integration von Bildern in Notizen ermöglichen
- [ ] Über Pagination nachdenken, damit sich die Ladezeiten optimieren
- [ ] Beim Scrollen soll der Titel im Header übernommen werden
- [ ] DayProjectTask und NonProjectTask überführen in Task
- [ ] Sicherstellen, dass die Daten durch das neue Release automatisch überführt werden
- [ ] Auf dem iPhone soll es nicht den Header geben, sondern das Logo am unteren Rand des Bildschirms
- [ ] Planung eines Cycles unterstützen
- [ ] eine Inbox einführen
- [ ] [Cloudscape Design System](https://cloudscape.design) evaluieren

## Detailed changes

### Documentation

#### ui

- introducing UI documentation with StoryBook [68086b7](https://github.com/cabcookie/personal-crm/commit/68086b7382d008900cc10bb82d9beeac5ebb9604)
- added Logo to StoryBook [0e03460](https://github.com/cabcookie/personal-crm/commit/0e0346045cd4b61433ca3cbb8b4f29a419b6d3c7)
- adjusted MainNavigationSection for robustness [2d60d18](https://github.com/cabcookie/personal-crm/commit/2d60d18f7d066e353235e0b618d6968299178884)
- reduce margin between icon and label [78dc5f2](https://github.com/cabcookie/personal-crm/commit/78dc5f29ba87c25060819e8f9215b74a6c46280c)
- adjusted ContextSwitcher for robustness (incl. new AppContext provider) [53a83da](https://github.com/cabcookie/personal-crm/commit/53a83da2d59cf5c66c5033e24b1dae643bb2b9fb)
- adjusted MainNavigationSection for robustness [2d60d18](https://github.com/cabcookie/personal-crm/commit/2d60d18f7d066e353235e0b618d6968299178884)
- adding NavigationMenu for robustness [2f24b8e](https://github.com/cabcookie/personal-crm/commit/2f24b8e5c5c517ad2b78e93bb47fab0eee14b773)

#### release

- creating tasks for the release [c4c335a](https://github.com/cabcookie/personal-crm/commit/c4c335ad33b90dced88f628fd532752ef8d4ca2d)

### Bug Fixes

#### ui

- remove semilicon at the end of each page [e20740c](https://github.com/cabcookie/personal-crm/commit/e20740c5c814fdc948974500676976171b77d663)

### Miscellaneous

- reduce margin between icon and label [78dc5f2](https://github.com/cabcookie/personal-crm/commit/78dc5f29ba87c25060819e8f9215b74a6c46280c)

#### dependencies

- upgrade to Storybook 8 [e4520e3](https://github.com/cabcookie/personal-crm/commit/e4520e3d33a9fe5133b3fcef14e37fdf2495847d)
- upgrade deps [3b750cf](https://github.com/cabcookie/personal-crm/commit/3b750cf6bcd4e8ca370ba01cee6561e9c8ddb0b1)
