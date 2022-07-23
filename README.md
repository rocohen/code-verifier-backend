# code-verifier-backend
Node Express project - backend
##  Endpoints

## `/api/katas`

Method **GET**  - gets all katas.

Method **POST** - passing request body with "name", "description", "level", "author" params : creates a new kata.

## `/api/katas?id=id`

Method **GET**  - passing query param id: gets a single kata.

Method **PUT** - should pass query param id and request body with the desired params to be updated. Updates a  kata.

Method **DELETE** - should pass query param id to delete a single kata.

## `/api/katas?level=level`

 Method **GET** - passing query param level filters katas by level. Available query params are "Easy", "Medium" and "Hard".

## `/api/katas?sort=valoration`
 Method **GET** - passing literal query param valoration filters best to least rated katas.

## `/api/katas?sort=chances`
 Method **GET** - passing literal query param chances filters user chances solving katas in "asc" order.

## `/api/katas/:id`
 Method **PUT** -  should pass request param id of a kata and request body valoration with a number from 1 to 5 to rate a kata.


**Extra**: There are two json files - users and katas - for testing enpoints in extra folder.
