/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w1dt21sy9a8njbg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q57adk4u",
    "name": "collection",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6a9mlswk0ogd86e",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w1dt21sy9a8njbg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q57adk4u",
    "name": "collection",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6a9mlswk0ogd86e",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
