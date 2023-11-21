/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a9mlswk0ogd86e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "frhbi2c5",
    "name": "short_name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a9mlswk0ogd86e")

  // remove
  collection.schema.removeField("frhbi2c5")

  return dao.saveCollection(collection)
})
