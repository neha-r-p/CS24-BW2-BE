# BE

deployed URL: https://cs24-bw-ts.herokuapp.com/

#ENDPOINTS:

## GET ROOMS
* GET: /rooms

##GET ROOM BY ID (where ID is room_id)
* GET: /rooms/:id

##GET ROOM BY COORDINATES
* POST: /room/coord
* JSON body: `{ "coordinates": "(x,y)" }`

##CREATE ROOM
* POST: /rooms
* JSON body: Exactly what is sent from the lambda server
```
{
  "room_id": 59,
  "title": "room",
  "description": "hello",
  "coordinates": "(60,63)",
  "elevation": 0,
  "terrain": "NORMAL",
  "players": [],
  "items": [],
  "exits": [
    "n",
	"e"
  ],
  "cooldown": 15.0,
  "errors": [],
  "messages": []
}
```

##UPDATE ROOM (where ID is room_id)
* PUT: /rooms/:id
* JSON body: Whole room in the format of our BE (I know, sorry!)
```
{
  "id": 1,
  "title": "room that exists",
  "room_id": 22,
  "description": "unlucky",
  "coordinates": "(60,60)",
  "cooldown": 15,
  "exits": "[\"n\",\"s\",\"e\"]",
  "n": -1,
  "s": -1,
  "e": 10,
  "w": null
}
```


