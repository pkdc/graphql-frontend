https://david-01f-profile.netlify.app/

The objective of this project is to learn the query language graphQL by creating your own profile page. It will be provided,
by the platform, a graphQL endpoint that is connected to the database. So you can query this endpoint to obtain the information you desire.
Note that for security reasons some tables are private and some are public, you will only be provided with certain content.

Your profile must have at least 3 sections of content at your choice, for example:

Basic user identification
XP amount
level
grades
audits
skills
Beside those sections it will have a mandatory section for the generation of statistic graphs.

Instructions
You will have to create a profile UI where you can see your own school information. This information/data is present on the graphQL endpoint, where you will have to query it.

The UI design is up to you. However, have in mind the principles of a good UI.
The UI will have a statistic section where you can generate graphs to see more about your journey and achievements on the school. This graphs must be done using SVG. You will have to do at least two different statistic graphs for the data given.

Using SVG you can create several types of graphs including interactive graphs and animated graph. It will be up to you to decide what type of graphs you are going to do.

Here are some possible combinations for the creation of the graphs:

XP earned in a time period (progress over time)
Levels over time
XP earned by project
Audit ratio
Projects PASS and FAIL ratio
Piscine (JS/Go) stats
PASS and FAIL ratio
Attempts for each exercise
Any other information you desire to display is welcome and will be noted.

Hosting
Besides the creation of your own profile you will have to host it! There are several places where you can host your profile,
for example: github-pages, netlify and so on. You are free to choose the hosting place.

Usage
To test your queries you can access the GraphQL IDE on https://learn.01founders.co/graphiql/ or create your own GraphiQL Docs. This will give you a bigger picture of the tables, attributes and all the types of queries that you can do.

Here are the list of tables that you are allowed to query (it will be only provided the columns present on the tables):

User table:

This table will have information about the user

id	login
1	person1
2	person2
3	person3
Transactions table:

This table will give you access to XP and audits ratio

id	type	amount	objectId	userId	createdAt	path
1	xp	234	42	1	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
2	xp	1700	2	2	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
3	xp	175	64	3	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
Progress table:

id	userId	objectId	grade	createdAt	updatedAt	path
1	1	3001	1	2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/piscine-go/quest-01
2	2	198	0	2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/piscine-go/quest-01
3	3	177	1	2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/piscine-go/quest-01
Results table:

Both progress and result table will give you the student progression

id	objectId	userId	grade	progressId	type	createdAt	updatedAt	path
1	3	1	0	58		2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
2	23	1	0	58		2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
3	41	6	1	58		2021-07-26T13:04:02.301092+00:00	2021-07-26T13:04:02.301092+00:00	/madere/div-01/graphql
Object table:

This table will give you information about all objects (exercises/projects)

id	name	type	childrenAttrs
1	0	exercise	{}
2	0	project	{}
3	1	exercise	{}
Examples:

Lets take for instance the table user and try to query it:

{
  query {
      user {
          id
      }
  }
}
This simple query will return an array with the ids of the users. Imagine if you wanted the login, you could just add this attribute to the query like so:

{
  query {
      user {
          id
          login
      }
  }
}
You can try to curl the API endpoint to see the result given by the server:

curl "https://learn.01founders.co/api/graphql-engine/v1/graphql" --data '{"query":"{user{id login}}"}'
Here is another example of a query using the table user:

{
  query {
    user(where: { id: { _eq: 6 }}) {
      id
      login
    }
  }
}
Note that for this query the introduction of variables (arguments) is required, so it will return just one user, the user that has the id equal to 6.

You can see the result using curl:

curl "https://learn.01founders.co/api/graphql-engine/v1/graphql" --data '{"query":"{user(where:{id:{_eq:6}}){id login}}"}'
In graphQL the usage of arguments can be specified in the schema of the API. Like said above you can visit the docs for the graphQL endpoint, https://learn.01founders.co/graphiql

Example of nesting, using the result and user table :

{
  result {
    id
    user {
      id
      login
    }
  }
}
For this example we ask for the results id and users that are associated to the result, requesting the users logins and ids.

You must use all the types of querying present above (normal, nested and using arguments), do not forget that you can use the types together or separately.
