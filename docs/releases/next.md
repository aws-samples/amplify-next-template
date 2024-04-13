# Backend updaten (Version :VERSION)

## Zusammenfassung der Änderungen

Im [Issue #2443 im Amplify Backend repo](https://github.com/aws-amplify/amplify-category-api/issues/2443) habe ich einen Fehler gemeldet, dass einzelne Datensätze zwar in der DynamoDB Tabelle zu sehen sind, aber die GraphQl Abfragen diese nicht ausspucken. Mir wurde geraten, das Amplify Backend auf eine neue Version zu updaten.

## Detailed changes

### Bug Fixes

#### deps

- trying to fix the AppSync resolvers with a backend update [89fd19d](https://github.com/cabcookie/personal-crm/commit/89fd19d4683ab9b76d89892a8b89857e3371013f)
