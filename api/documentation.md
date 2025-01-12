# Documentation for Cloud Technologies API

This is the documentation for semester work about the cloud services development class. It is about the creation of an API concerning data related to cars. The API was built using the Spring Framework.

------

## Api Response

All responses from the server are being encapsulated within the ApiResponse container object.
It consists of three fields: `data`, `errors` and `status`.

The `data` field contains the requested data.
The `errors` field contains any possible errors occurred during a request. When `errors` is empty the request was successful.
The `status` field contains the HTTP status code converted to String.

Example:

```json
{
    "data" : "Some data",
    "errors" : null,
    "status" : "OK"
}
```



## Contents

1. [User](#user)
2. [Car](#car)
3. [Venue](#venue)

## Api Requests

## User

This collection contains all the requests regarding a user.

**Create Dealership**

This request is used to register a dealership.

| POST                    | /users/dealerships                        |
|-------------------------|-------------------------------------------|
| **Parameters**          |                                           |
| *RegisterDealershipDto* | <u>Request Body</u>                       |
|                         | The fields of the dealership to register. |
| **Responses**           |                                           |
| String                  | Dealership registered successfully.       |

| [:book: Contents](#contents) |

---

**Create Citizen**

This request is used to register a citizen.

| POST                 | /users/citizens                        |
|----------------------|----------------------------------------|
| **Parameters**       |                                        |
| *RegisterCitizenDto* | <u>Request Body</u>                    |
|                      | The fields of the citizen to register. |
| **Responses**        |                                        |
| String               | Citizen registered successfully.       |

| [:book: Contents](#contents) |

---

**Login**

This request is used to login a user.

| POST             | /users/login                                    |
|------------------|-------------------------------------------------|
| **Parameters**   |                                                 |
| *LoginDto*       | <u>Request Body</u>                             |
|                  | The role provided to filter the results         |
| **Responses**    |                                                 |
| LoginResponseDto | {afm: String, name: String, isCitizen: Boolean} |

| [:book: Contents](#contents) |

---

## Car

This collection contains all the requests regarding a car.

**Create Car**

This request is used to create a car.

| POST           | /cars                             |
|----------------|-----------------------------------|
| **Parameters** |                                   |
| *CreateCarDTO* | <u>Request Body</u>               |
|                | {email: String, password: String} |
| **Responses**  |                                   |
| String         | Car created successfully          |

| [:book: Contents](#contents) |

---

**Get Cars**

This request is used to retrieve all cars with or without filters.

| GET              | /cars                                                                                                                                                 |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Parameters**   |                                                                                                                                                       |
| *make*           | <u>Request parameter</u>                                                                                                                              |
|                  | The make of the car                                                                                                                                   |
| *model*          | <u>Request parameter</u>                                                                                                                              |
|                  | The model of the car                                                                                                                                  |
| *fuel*           | <u>Request parameter</u>                                                                                                                              |
|                  | The fuel type of the car                                                                                                                              |
| *engine*         | <u>Request parameter</u>                                                                                                                              |
|                  | The engine of the car in cc                                                                                                                           |
| *seats*          | <u>Request parameter</u>                                                                                                                              |
|                  | The number of seats of the car                                                                                                                        |
| *price*          | <u>Request parameter</u>                                                                                                                              |
|                  | The price of the car                                                                                                                                  |
| *dealershipAfm*  | <u>Request parameter</u>                                                                                                                              |
|                  | The dealership of the car                                                                                                                             |
| **Responses**    |                                                                                                                                                       |
| List\<GetCarDTO> | {id: Long, make: String, model: String, fuel: String<br />engine: Int, seats: Int, price: Double, description: String, total: Int,dealership: String} |

| [:book: Contents](#contents) |

---

**Get Car By  Id**

This request is used to retrieve a car with a specific Id.

| GET            | /cars/ID                                                                                                                                              |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Parameters** |                                                                                                                                                       |
| *ID*           | <u>Path variable</u>                                                                                                                                  |
|                | The identifier of the car to retrieve.                                                                                                                |
| **Responses**  |                                                                                                                                                       |
| GetCarDTO      | {id: Long, make: String, model: String, fuel: String<br />engine: Int, seats: Int, price: Double, description: String, total: Int,dealership: String} |

| [:book: Contents](#contents) |

---

**Update Car total By Id**

This request is used to update a cars total field with a specific Id.

| PUT                        | /cars/ID/total                         |
|----------------------------|----------------------------------------|
| **Parameters**             |                                        |
| *ID*                       | <u>Path variable</u>                   |
|                            | The identifier of the car to retrieve. |
| *UpdateCarTotalRequestDto* | <u>Request Body</u>                    |
|                            | {total: Int, dealership: String}       |
| **Responses**              |                                        |
| String                     | Car total updated successfully         |

| [:book: Contents](#contents) |

---

**Purchase a Car By Id**

This request is used to reduce a car 's total field by one with a specific Id.

| POST           | /cars/ID/buy                           |
|----------------|----------------------------------------|
| **Parameters** |                                        |
| *ID*           | <u>Path variable</u>                   |
|                | The identifier of the car to retrieve. |
| **Responses**  |                                        |
| String         | Car bought!                            |

| [:book: Contents](#contents) |

---

**Reserve a Car By Id**

This request is used to reserve with a specific Id.

| POST                   | /cars/ID/buy                                                                           |
|------------------------|----------------------------------------------------------------------------------------|
| **Parameters**         |                                                                                        |
| *ID*                   | <u>Path variable</u>                                                                   |
|                        | The identifier of the car to retrieve.                                                 |
| *CreateReservationDTO* | <u>Request Body</u>                                                                    |
|                        | {citizenAfm: String, reservationDate: LocalDateTime, reservationTimeInMinutes: Int}    |
| **Responses**          |                                                                                        |
| String                 | Car reserved!                                                                          |

| [:book: Contents](#contents) |

---

## Venue

This collection contains all the requests regarding a venue.

**Get venue**

This request is used to retrieve a venue by the provided identifier.

| GET            | /api/venue/{ID}                            |
| -------------- | ------------------------------------------ |
| **Parameters** |                                            |
| *ID*           | <u>Path variable</u>                       |
|                | The identifier of the venue to retrieve.   |
| **Responses**  |                                            |
| VenueDTO       | {id: Int, title: String, address: String}  |

| [:book: Contents](#contents) | [:earth_africa: Venue](#venue) |

---

**Get Venues**

This request is used to retrieve all venues.

| GET             | /api/venues                                |
| --------------- | ------------------------------------------ |
| **Parameters**  |                                            |
| *page*          | <u>Request parameter</u>                   |
|                 | The index of the page to return. Optional  |
| *size*          | <u>Request parameter</u>                   |
|                 | The size of the page. Optional             |
| **Responses**   |                                            |
| Page\<VenueDTO\>| {id: Int, title: String, address: String}  |

| [:book: Contents](#contents) | [:earth_africa: Venue](#venue) |

---
**Get Productions By Venue Id**

This request is used to retrieve all productions located in the given venue.

| GET             | /api/venues/ID/productions                 |
| --------------- | ------------------------------------------ |
| **Parameters**  |                                            |
| *ID*            | <u>Path variable</u>                       |
|                 | The identifier of the venue to retrieve.   |
| *page*          | <u>Request parameter</u>                   |
|                 | The index of the page to return. Optional  |
| *size*          | <u>Request parameter</u>                   |
|                 | The size of the page. Optional             |
| **Responses**   |                                            |
| Page\<ProductionDTO\> | {productionId: Int, title: String, url: String, producer: String<br />mediaURL: String, duration: String, description: String, role: String} |

| [:book: Contents](#contents) | [:earth_africa: Venue](#venue) |
