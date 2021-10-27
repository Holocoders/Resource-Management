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

type Item {
    id: Node!
    name: String
    picture: Image
    price: Float!
    description: String
    created: User!
    quantity: Int!
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
    currentDate: Date!
    status: InventoryActivity!
}

enum ItemActivity {
    BUY
    RENT
}

type ItemHistory {
    itemId: Item!
    userId: User!
    quantity: Int!
    currentDate: Date!
    cancelled: Boolean! # default false
    issued: Boolean
    status: ItemActivity!
    issueDate: Date
    dueDate: Date
}

```