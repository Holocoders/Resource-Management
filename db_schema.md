```graphql
scalar Date
scalar Image

type Node {
    id: ID!
    parent: ID
    isItem: Boolean!
}

type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    password: String!
}

type Permissions {
    userId: User!
    nodeId: Node!
}

type Facility {
    id: Node!
    name: String
    picture: Image
}

type Category {
    id: Node!
    name: String
    picture: Image
}

enum AllowedItemActivity {
    BUY
    RENT
}

type Item {
    id: Node!
    name: String
    picture: Image
    price: Float!
    description: String
    createdBy: User!
    quantity: Int!
    allowedActivity: AllowedItemActivity
}

type ItemFrequency {
    item: Item!
    frequency: Int!
}

type RelatedItems {
    itemId: Item!
    related: [ItemFrequency]
}

enum InventoryActivity {
    ADD
    REMOVE
}

type InventoryHistory {
    itemId: Item!
    userId: User!
    quantity: Int!
    activityDate: Date!
    activityType: InventoryActivity!
}

enum ItemActivity {
    BUY
    RENT
}

type ItemHistory {
    itemId: Item!
    userId: User!
    quantity: Int!
    activityDate: Date!
    cancelled: Boolean! # default false
    issued: Boolean
    activityType: ItemActivity!
    issueDate: Date
    dueDate: Date
}

```