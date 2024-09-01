import Realm from 'realm';

// current location schema
class currentLocationData extends Realm.Object {}
currentLocationData.schema = {
    name: 'currentLocation',
    properties: {
        lat: 'double',
        lng: 'double',
    },
};

export default new Realm({
    schema: [
        currentLocationData.schema,
    ],
    schemaVersion: 2,
});