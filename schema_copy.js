const { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema } = require("graphql");
const knex = require("./db/knex");

const BookInput = new GraphQLInputObjectType({
    name: "BookInput",
    description: "This is Book Input",
    fields: () => {
        return {
            title: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            subtitle: {
                type: GraphQLString
            },
            author: {
                type: GraphQLString
            },
            website: {
                type: GraphQLString
            },
            rating: {
                type: GraphQLFloat
            }
        }
    }
})

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
            },
            description: {
                type: GraphQLString,
                resolve(book) {
                    return book.description
                }
            },
            subtitle: {
                type: GraphQLString,
                resolve(book) {
                    return book.subtitle
                }
            },
            author: {
                type: GraphQLString,
                resolve(book) {
                    return book.author
                }
            },
            website: {
                type: GraphQLString,
                resolve(book) {
                    return book.website
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

const query = new GraphQLObjectType({
    name: "RootQuery",
    description: "This is Root Query",
    fields: () => {
        return {
            book: {
                type: new GraphQLList(Book),
                resolve(root, args) {
                    return knex.from('book').select("*");
                }
            },
            bookByID: {
                type: Book,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, args) {
                    return knex.from('book').select('*').where('id', args.id).first();
                }
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "This is Mutation",
    fields: () => {
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
                    subtitle: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    website: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    rating: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    }
                },
                resolve(root, args) {
                    const bookData = {
                        title: args.title,
                        description: args.description,
                        subtitle: args.subtitle,
                        author: args.author,
                        website: args.website,
                        rating: args.rating
                    };
                    return knex('book').insert(bookData, '*')
                        .then(data => {
                            return data[0];
                        }).catch(err => {
                            console.log(err);
                        })
                }
            },
            updateBook: {
                type: Book,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    input: {
                        type: new GraphQLNonNull(BookInput)
                    }
                },
                resolve(root, args) {
                    return knex('book').where('id', args.id).update(args.input, '*').then(data => {
                        return data[0];
                    }).catch(err => {
                        console.log(err);
                    })

                }
            },
            deleteBook: {
                type: GraphQLString,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, args) {
                    return knex('book').where('id', args.id).del().then(() => {
                        return "Book Deleted";
                    }).catch(err => {
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

module.exports = schema;