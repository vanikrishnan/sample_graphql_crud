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
            authorId: {
                type: GraphQLInt
            },
            website: {
                type: GraphQLString
            },
            rating: {
                type: GraphQLFloat
            }
        }
    }
});

const LocationInput = new GraphQLInputObjectType({
    name:"LocationInput",
    description:"This is Location Input",
    fields: () => {
        return {
            country: {
                type: GraphQLString
            },
            state: {
                type: GraphQLString
            }
        }
    }
});

const AuthorInput = new GraphQLInputObjectType({
    name: "AuthorInput",
    description: "This is Book Input",
    fields: () => {
        return {
            name: {
                type: GraphQLString
            }
        }
    }
});

const Author = new GraphQLObjectType({
    name: 'Author',
    description: 'This is Author',
    fields:() => {
        return {
            id: {
                type: GraphQLInt,
                resolve(author) {
                    return author.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(author) {
                    return author.name;
                }
            },
            book: {
                type: new GraphQLList(Book),
                resolve(author) {
                    return knex.from('book').select('*').where('authorId', author.id);
                }
            }
        }
    }
});

const Location = new GraphQLObjectType({
    name: 'Location',
    description: 'This is Location',
    fields:() => {
        return {
            id: {
                type: GraphQLInt,
                resolve(location) {
                    return location.id;
                }
            },
            country: {
                type: GraphQLString,
                resolve(location) {
                    return location.country;
                }
            },
            state: {
                type: GraphQLString,
                resolve(location) {
                    return location.state;
                }
            },
            city: {
                type: GraphQLString,
                resolve(location) {
                    return location.city;
                }
            }
        }
    }
});

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
            authorId: {
                type: GraphQLString,
                resolve(book) {
                    return book.authorId
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
            },
            author: {
                type: Author,
                resolve(book) {
                    return knex.from('author').select('*').where('id', book.authorId).first();
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
            author: {
                type: new GraphQLList(Author),
                resolve(root, args) {
                    return knex.from('author').select("*");
                }
            },
            locationSearch: {
                type: new GraphQLList(Location),
                args: {
                    input: {
                       type: new GraphQLNonNull(LocationInput)
                    }
                },
                resolve(root, args) {
                    let whereObj = args.input;
                    let selectCriteria = '*'
                    return knex.from('location').where(whereObj).select('*').then(data => {
                        return data;
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            locationSearchByCountryAndState: {
                type: new GraphQLList(Location),
                args: {
                    input: {
                       type: new GraphQLNonNull(LocationInput)
                    }
                },
                resolve(root, args) {
                    let whereObj = args.input;
                    let selectCriteria = '*'
                    if (whereObj.country)
                    selectCriteria = 'state'
                    if (whereObj.country && whereObj.state) 
                    selectCriteria = 'city';
                    return knex.from('location').where(whereObj).select(selectCriteria).then(data => {
                        return data;
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            authorByID: {
                type: Author,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, args) {
                    return knex.from('author').select('*').where('id', args.id).first();
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
            },
            searchTerm: {
                type: new GraphQLList(Author),
                args: {
                    term: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return knex('book').join('author', 'book.authorId', '=', 'author.id').select('*').where('author.name', 'like', `%${args.term}%`)
                    .then(data =>{
                        return data;
                    }).catch(err=>{
                        console.log(err);
                    })
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
                    authorId: {
                        type: new GraphQLNonNull(GraphQLInt)
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
                        authorId: args.authorId,
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
            },
            addAuthor: {
                type: Author,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, args) {
                    const authorData = {
                        name: args.name,
                    };
                    return knex('author').insert(authorData, '*')
                        .then(data => {
                            return data[0];
                        }).catch(err => {
                            console.log(err);
                        })
                }
            },
            updateAuthor: {
                type: Author,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    input: {
                        type: new GraphQLNonNull(AuthorInput)
                    }
                },
                resolve(root, args) {
                    return knex('author').where('id', args.id).update(args.input, '*').then(data => {
                        return data[0];
                    }).catch(err => {
                        console.log(err);
                    })

                }
            },
            deleteAuthor: {
                type: GraphQLString,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, args) {
                    return knex('author').where('id', args.id).del().then(() => {
                        return "Author Deleted";
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