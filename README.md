# Documentation for Cloud Technologies API

This is the documentation for the assignment about the Cloud Services Development class.
It is about the creation of an API concerning data related to cars. 
The API was built using the Spring Framework.
The frontend was building using the React Framework.

The video presentation can be found here: https://www.youtube.com/watch?v=gwWfgvcjpL8

------

1. [Error Handling](#error-handling)
1. [API Requests](#api-requests)
    1. [User](#user)
    2. [Car](#car)
    3. [Reservation](#reservation)


## Error Handling

All `RuntimeException` that are thrown are caught by the `RestExceptionHandler.java`, which is a `@ControllerAdvice`.
Then API responds with a `400` http status code and the message of the exception is returned in the response body.

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
| **Response**            |                                           |
| String                  | Dealership registered successfully.       |

---

**Create Citizen**

This request is used to register a citizen.

| POST                 | /users/citizens                        |
|----------------------|----------------------------------------|
| **Parameters**       |                                        |
| *RegisterCitizenDto* | <u>Request Body</u>                    |
|                      | The fields of the citizen to register. |
| **Response**         |                                        |
| String               | Citizen registered successfully.       |

---

**Login**

This request is used to login a user.

| POST             | /users/login                                    |
|------------------|-------------------------------------------------|
| **Parameters**   |                                                 |
| *LoginDto*       | <u>Request Body</u>                             |
|                  | The role provided to filter the results         |
| **Response**     |                                                 |
| LoginResponseDto | {afm: String, name: String, isCitizen: Boolean} |

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
| **Response**   |                                   |
| String         | Car created successfully          |

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
| **Response**     |                                                                                                                                                       |
| List\<GetCarDTO> | {id: Long, make: String, model: String, fuel: String<br />engine: Int, seats: Int, price: Double, description: String, total: Int,dealership: String} |

---

**Get Car By  Id**

This request is used to retrieve a car with a specific Id.

| GET            | /cars/ID                                                                                                                                              |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Parameters** |                                                                                                                                                       |
| *ID*           | <u>Path variable</u>                                                                                                                                  |
|                | The identifier of the car to retrieve.                                                                                                                |
| **Response**   |                                                                                                                                                       |
| GetCarDTO      | {id: Long, make: String, model: String, fuel: String<br />engine: Int, seats: Int, price: Double, description: String, total: Int,dealership: String} |

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
| **Response**               |                                        |
| String                     | Car total updated successfully         |


---

**Purchase a Car By Id**

This request is used to reduce a car 's total field by one with a specific Id.

| POST           | /cars/ID/buy                           |
|----------------|----------------------------------------|
| **Parameters** |                                        |
| *ID*           | <u>Path variable</u>                   |
|                | The identifier of the car to retrieve. |
| **Response**   |                                        |
| String         | Car bought!                            |


---

**Reserve a Car By Id**

This request is used to reserve with a specific Id.

| POST                   | /cars/ID/buy                                                                        |
|------------------------|-------------------------------------------------------------------------------------|
| **Parameters**         |                                                                                     |
| *ID*                   | <u>Path variable</u>                                                                |
|                        | The identifier of the car to retrieve.                                              |
| *CreateReservationDTO* | <u>Request Body</u>                                                                 |
|                        | {citizenAfm: String, reservationDate: LocalDateTime, reservationTimeInMinutes: Int} |
| **Response**           |                                                                                     |
| String                 | Car reserved!                                                                       |


---

## Reservation

This collection contains all the requests regarding a reservation.

**Get reservations**

This request is used to retrieve reservations.

| GET                      | /reservations                                                                                              |
|--------------------------|------------------------------------------------------------------------------------------------------------|
| **Parameters**           |                                                                                                            |
| *carId*                  | <u>Request parameter</u>                                                                                   |
|                          | The identifier of the car to retrieve reservations.                                                        |
| **Response**             |                                                                                                            |
| List\<GetReservationDTO> | {id: Long, citizenAfm: String, carId: Long, reservationDate: LocalDateTime, reservationTimeInMinutes: Int} |


---

**Get Reservations by Citizen Afm**

This request is used to retrieve all reservations with a specific citizen afm.

| GET                          | /citizens/citizenAfm                                                                                                               |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Parameters**               |                                                                                                                                    |
| *citizenAfm*                 | <u>Path variable</u>                                                                                                               |
|                              | The identifier of the citizen to retrieve reservations.                                                                            |
| **Response**                 |                                                                                                                                    |
| List\<ReservationCitizenDto> | {dealershipName: String, make: String, model: String, fuel: String, reservationDate: LocalDateTime, reservationTimeInMinutes: Int} |

