# Editieren wird einfacher (Version :VERSION)

## Neue Funktionen und Änderungen

- Es wird nun besser visualisiert, ob Einträge gespeichert sind oder noch nicht.
- Mit der Tastatur kann man nun zwischen den App Sektionen wechseln:
  - Today's Tasks mit `Control+T`
  - Meetings mit `Control+M`
  - Commitments mit `Control+C`
  - Suche mit `Control+K`

Todos:

- [x] Besser visualisieren, ob ein ein Eintrag gespeichert ist cabcookie/personal-crm#8
- [ ] Tastaturbefehle einführen cabcookie/personal-crm#4
- [ ] Markdown-fähiger Editor cabcookie/personal-crm#6
- [ ] Aktuelle Seite soll den Titel der Website bestimmen
- [ ] Beim Scrollen soll der Titel im Header übernommen werden

## Zukünftige Releases

- [ ] DayProjectTask und NonProjectTask überführen in Task
- [ ] Sicherstellen, dass die Daten durch das neue Release automatisch überführt werden
- [ ] Auf dem iPhone soll es nicht den Header geben, sonders das Logo am unteren Rand des Bildschirms
- [ ] Die Schriftgrößen für das iPhone anpassen

## Detailed changes

### Feature

#### ui

- show state of persisting changes [1f019c0](https://github.com/cabcookie/personal-crm/commit/1f019c05cc844cbd28bf3235c9d91d063f6f0061)

### Miscellaneous

#### ci

- add update of next.md [ed3f70e](https://github.com/cabcookie/personal-crm/commit/ed3f70e45ac2fe79c97d31b1f24ee3ba00c1e23f)
- moving next.md update to post-commit [60a547d](https://github.com/cabcookie/personal-crm/commit/60a547d3d9e33275a2736febe179f044f2eeff09)
- commits appended now [d5435b6](https://github.com/cabcookie/personal-crm/commit/d5435b60723d15df9447d155b435463035e01d5b)
- update release template and give release a name [cd77ca9](https://github.com/cabcookie/personal-crm/commit/cd77ca9bc7aff99e92da822ea6ca9ce88b782905)
