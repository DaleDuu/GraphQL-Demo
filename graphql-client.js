var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// define schema
var schema = buildSchema(`
    type User {
        account: String!
        email: String
        id: ID!
        name: String
        password: String!
    }

    type Company {
        accountExpire: String
        accountRemainingDays: Int
        address: String
        description: String
        emailDomain: String
        id: ID!
        industry: Int
        logo: String
        name: String!
    }

    type Industry {
        description: String
        enabled: Boolean
        id: ID!
        name: String
    }

    type Query {
        user(id:Int!):User
        users:[User]
        company(id:Int!):Company
        companies:[Company]
    }

    type Mutation {
        addUser(account:String!,email:String,name:String,password:String!):User
        addCompany(
          accountExpire: String,
          accountRemainingDays: Int,
          address: String,
          description: String,
          emailDomain: String,
          industry: Int,
          logo: String,
          name: String!):User
    }
`);

// mock data
var users = [
    {
      account: 'Dale1993',
      email: 'ying.du@seedlinktech.com',
      id: 0,
      name: 'DaleDu',
      password: 'SeedlinkTech'
    },
    {
      account: 'Renee1993',
      email: 'renee@seedlinktech.com',
      id: 1,
      name: 'Renee',
      password: 'SeedlinkTech'
    },
];

var companies = [
  {
    accountExpire: '2031-09-11',
    accountRemainingDays: 4973,
    address: ' Si Dieu n\'avait fait la femme, il n\'aurait pas fait la fleur ',
    description: ' Si Dieu n\'avait fait la femme, il n\'aurait pas fait la fleur ',
    emailDomain: 'seedlinktech.com rcxue.com',
    id: 0,
    industry: 3,
    logo: 'https://file-demo.slaius.com/39924c0bf47f45e98161db95c1ff3b59',
    name: 'Seedlink'
  },
  {
    accountExpire: '2031-09-11',
    accountRemainingDays: 4973,
    address: ' software design and delivery ',
    description: ' software design and delivery ',
    emailDomain: 'thoughtworks.com',
    id: 1,
    industry: 4,
    logo: 'https://file-demo.slaius.com/39924c0bf47f45e98161db95c1ff3b59',
    name: 'ThoughtWorks'
  }
]

var industries = [
  {
    description: 'industry.software_services.name.description',
    enabled: true,
    id: 1,
    name: 'industry.software_services.name'
  },
  {
    description: 'industry.capital_goods.name.description',
    enabled: true,
    id: 2,
    name: 'industry.capital_goods.name'
  },
  {
    description: 'industry.energy.name.description',
    enabled: true,
    id: 3,
    name: 'industry.energy.name'
  },
  {
    description: 'industry.real_estate.name.description',
    enabled: true,
    id: 4,
    name: 'industry.real_estate.name'
  }
]

// define resolver
var root= {

    // query resolver
    user: ({id}) => {
      return users.find(user => user.id === id);
    },

    users: () => {
      return users;
    },

    company: ({id}) => {
      // const company = companies.find(company => company.id === id);
      // console.log(company);
      // company.industry = industries.find(industry => industry.id === company.industry);
      // console.log(company);
      return companies.find(company => company.id === id);
    },

    companies: () => {
      // return companies.map(company => {
      //     company.industry = industries.find(industry => industry.id === company.industry);
      // });
      return companies;
    },

    industry: ({id}) => {
      return industries.find(industry => industry.id === id);
    },

    industries: () => {
      return industries;
    },

    // mutation resolver
    addUser: ({account,email,name,password}) => {
        var user = {
            account:account,
            email:email,
            name:name,
            password:password,
            id: users.length
        };
        users.push(user);
        return user;
    },

    addCompany: ({accountExpire, accountRemainingDays, address, description, emailDomain, industry, logo, name}) => {
      var company = {
          accountExpire: accountExpire,
          accountRemainingDays: accountRemainingDays,
          address: address,
          description: description,
          emailDomain: emailDomain,
          id: companies.length,
          industry: industry,
          logo: logo,
          name: name
      }
      companies.push(company);
      return company;
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enabled GraphiQL
}));


app.listen(4000, () => console.log('Please enter this url in browser：localhost:4000/graphql'));
