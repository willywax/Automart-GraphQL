import express from "express";
import bodyParser from "body-parser";
import graphQLHTTP from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';


export const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/automart',graphQLHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`Server running at port ${port}`);
}) 
