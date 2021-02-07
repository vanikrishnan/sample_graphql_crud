const { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema } = require("graphql");
const knex = require("./db/knex");

const Book = new GraphQLObjectType({
    name: 'Book',
    description: "This is a  Book",
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(book) {
                    return book.id
                }
            },
            title: {
                type: GraphQLString,
                resolve(book) {
                    return book.title
                }
            }, description: {
                type: GraphQLString,
                resolve(book) {
                    return book.description
                }
            },
            rating: {
                type: GraphQLFloat,
                resolve(book) {
                    return book.rating
                }
            }
        }
    }
});

// const BookInput = new GraphQLObjectType({
//     name:"BookInput",
//     description:"This is Book Input",
//     fields:()=> {
//         return {
//             title: {
//                 type: GraphQLString
//             },
//             description: {
//                 type: GraphQLString
//             },
//             rating: {
//                 type: GraphQLFloat
//             }
//         }
//     }
// })

const query = new GraphQLObjectType({
    name:"RootQuery",
    description:"This is Root Query",
    fields:()=> {
        return {
            book : {
                type: new GraphQLList(Book),
                resolve(root,args) {
                    console.log("in persons resolve", knex);
                    return knex.from('books').select("*");
                    // knex.from('books').select('*').then(data=>{
                    //     console.log(data);
                    //     return data;
                    // }).catch(err=>{
                    //     console.log(err)
                    // })
                }
            },
            bookByID: {
                type: Book,
                args: {
                    id: {
                        type:GraphQLInt
                    }
                },
                resolve(root, args) {
                    console.log("in persons resolve", knex);
                    return knex.from('books').select('*').where('id',args.id).first();
                }
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name:"Mutation",
    description:"This is Mutation",
    fields:() => {
        return {
            addBook: {
                type: Book,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    rating: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    }
                },
                resolve(root, args) {
                    return knex('books').insert({
                        title: args.title,description:args.description,rating:args.rating
                    },'*')
                    .then(data=>{
                        console.log(data);
                        return data[0];
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            },
            // updateBook: {
            //     type: Book, 
            //     args: {
            //         id: {
            //             type: GraphQLInt
            //         },
            //         input: {
            //             type: BookInput
            //         }
            //     },
            //     resolve(root,args) {
            //         return knex('books').where('id',args.id).update(args.updatedBookData, '*');
            //     }
            // },
            deleteBook: {
                type: GraphQLString,
                args: {
                    id: {
                        type:GraphQLInt
                    }
                },
                resolve(root,args) {
                    return knex('books').where('id',args.id).del().then(()=>{
                        return "Book Deleted";
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
});

module.exports=schema;