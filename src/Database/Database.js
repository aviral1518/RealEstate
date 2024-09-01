import realm from './DBSchema';

export function insertData(schema, properties) {
    try {
        let tableForSchema;
        realm.write(() => {
            const objectToUpdate = realm.objects(schema)[0];
            if (objectToUpdate !== undefined) {
                const updatedSchemaProperties = properties;
                tableForSchema = Object.assign(objectToUpdate, updatedSchemaProperties);
            } else {
                tableForSchema = realm.create(schema, properties);
            }
        });
        return tableForSchema;
    } catch (error) {
        console.log('error in inserting db data--->', error);
        return null;
    }
}

export function RetrieveData(schema) {
    try {
        let result = JSON.parse(JSON.stringify(realm.objects(schema)));
        return result;
    } catch (error) {
        console.log('error in fetching db data-->', error);
        return null;
    }
}