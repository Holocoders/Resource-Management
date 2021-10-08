# Schema

## Category

Every resource in our portal is a category. A category can be an item or a facility with multiple sub-category and items
within it.
Ex:

- EE-Lab is category, it can have sub-categories such as boards, components.
- Boards can have items such as arduino or other nested sub-categories.

```json
id: String,
name: String,
description: String,
parent: ref Category [default null],
isItem: bool [default false]
```

## Item

Item is a terminal entity of the category hierarchy.

```json
id: String,
canSell: bool,
canBorrow: bool,
createdBy: User,
quantity: int,
price: float,
supplier?: ref Supplier,
flexibleSale: bool
```

## Sell

```json
id: String,
itemId: int,
bookingQuantity: int,
bookingDate: Date,
sellDate: Date,
quantity: int,
price: float,
to: User,

```

## Rent

```json
id: String,
itemId: int,
bookingDate: Date,
takeDate: Date,
returnDate: Date,
bookingQuantity: int,
to: User,
price: float,
rentDate: Date,
quantity: int,


```

## Eg:

library:

## User

```json
id: String,
name: String,
phone: String,
email: String,
address: String,
facility?: ref Facility
```

## Supplier

```json
id: String,
name: String,
organisation: String,
phone: String,
email: String,
address: String
```

## Features

- Buy, Sell, Borrow, Book, Store
- Allow pre-ordering
- Suggest images while adding categories or items.
- Role planned:
    1. Super Admin Can add and remove admins.
    2. Admin Can add facilities and groups for which they are admin. There can be multiple admins for each facility.
    3. Others Can only view all the items.
