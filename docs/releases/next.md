# Bereinigung vorheriger Änderungen; manche Daten wurden nicht angezeigt (Version :VERSION)

## Zusammenfassung der Änderungen

- Ein neues Datenmodell eingeführt, um später Todos mit und ohne Projekt zusammenzufassen in einem Modell und entsprechend zu migrieren.
- Überflüssige Spalten und damit auch Modelle entfernt, um das Schema etwas schlanker zu machen.

## Bekannte Fehler

- [ ] Aktivitäten werden nicht angezeigt
- [ ] Limit für Personen ist zu klein

## Geplante neue Funktionen

- [ ] Numerierte Listen unterstützen
- [ ] Tasks müssen in der Liste direkt editierbar sein, ohne dass der Task geöffnet werden muss
- [ ] Die Suche funktioniert im Moment nicht
- [ ] Hyperlinks erkennen
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

## Detailed changes

### Feature

#### docs

- release documentation [2c6c421](https://github.com/cabcookie/personal-crm/commit/2c6c42113cd58151f02451b5289a17bd2ea2bd31)

#### data

- creating DayPlanTodo to later consolidate todos there [90901dc](https://github.com/cabcookie/personal-crm/commit/90901dcd3d2ba5ad45f8d4e918c08a07b16bee10)
