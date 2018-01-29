# GraphQL Demo

![](http://www.zhaiqianfeng.com/uploads/content/share/graphql.png)

> Why is GitHub using GraphQL?

> GitHub is moving to GraphQL for v4 of our API because it offers significantly more flexibility for our integrators. The ability to define precisely the data you want—and only the data you want—is a powerful advantage over the REST API v3 endpoints.

> GraphQL is a new way to think about building and querying APIs. Rather than construct several REST requests to fetch data that you’re interested in, you can often make a single call to fetch the information you need.

### Schemas & Types
* [Schemas & Types](https://toddmotto.com/react-create-class-versus-component/#syntax-differences)

### GraphQL Client

* How to start ?
```
node graphql-client.js
Open http://localhost:4000/
```

* Client Query

```graphql
{
  user(id:1) {
    name
 		email
    account
    password
    id
  }
  users {
    name
 		email
    account
    password
    id
  }
  companies {
    accountExpire
    accountRemainingDays
    address
    description
    emailDomain
    id
    industry
    logo
    name
  }
}
```

* Client Mutation

```graphql
mutation{
  addUser(
    account: "demo",
    email: "demo@gmail.com",
    id: 10,
    name: "demo",
    password: "demo1234",
  ){
    account
    email
    id
    name
    password
  }
  addCompany(
    accountExpire: "2031-09-11",
    accountRemainingDays: 4973,
    address: "software design and delivery",
    description: "software design and delivery",
    emailDomain: "google.com",
    id: 10,
    industry: 4,
    logo: "https://file-demo.slaius.com/39924c0bf47f45e98161db95c1ff3b59",
    name: "Google"
  ){
    accountExpire
    accountRemainingDays
    address
    description
    emailDomain
    id
    industry
    logo
    name
  }
}
```


### GraphQL Server

* How to start ?
```
node graphql-server.js
```
