```graphql
type Node {
    id: ID
    parent: ID # [NULLABLE]
    isItem: Boolean
}
```

```graphql
type User {
    id: ID
    name: String
    email: String
    phone: String
}
```

```graphql
type Permissions {
    userId : User
    nodeId: Node  
}
```

Facility
```yaml
id : ref Node
picture: Image
```

Category
```yaml
id : ref Node
picture: Image
```

Item
```yaml
id : ref Node
picture : Image
price : float
description : string
created : ref user
quantity : int
```

RelatedItems 
```yaml
itemId : ref item
related : array of 
  - item: ref item
  - frequency: int
```

InventoryActivity
```yaml
itemId : ref Item
userId : ref User
quantity : int
currentDate : Date
status : enum {add, remove}
```

ItemActivity
```yaml
itemId : ref Item
userId : ref User
quantity : int
currentDate : Date
cancelled : bool
activity :
  - status : enum {buy, rent}
  - issueDate : Date
  - issued : bool
  - dueDate : Date [optional]
```