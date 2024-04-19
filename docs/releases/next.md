# Testen von weiteren Backend Updates (Version :VERSION)

## Zusammenfassung der Änderungen

Im [Issue #2443 im Amplify Backend repo](https://github.com/aws-amplify/amplify-category-api/issues/2443) habe ich einen Fehler gemeldet, dass einzelne Datensätze zwar in der DynamoDB Tabelle zu sehen sind, aber die GraphQl Abfragen diese nicht ausspucken. Mir wurde geraten, das Amplify Backend auf eine neue Version zu updaten. Mir wurde außerdem geraten, "Secondary Indexes" einzurichten, um gezielter Datensätze aus DynamoDB abzurufen. Habe festgestellt, dass das etwas komplizierter ist, da ich hierbei auch das Backend auf die letzte Version upgraden müsste. Die neue Version unterstützt aber keine many-to-many Beziehungen mehr und das würde eine größere Veränderung nach sich ziehen, inklusive des Risikos von Datenverlust.

## Detailed changes

### Bug Fixes

#### deps

- trying to fix the AppSync resolvers with a backend update [89fd19d](https://github.com/cabcookie/personal-crm/commit/89fd19d4683ab9b76d89892a8b89857e3371013f)

### Miscellaneous

- added sandbox script [edbd25f](https://github.com/cabcookie/personal-crm/commit/edbd25f8b0c4d03f2cacbb4f51c1782045cedda8)
