const { GraphQLServer } = require("graphql-yoga")

let Links = [{
    id: "link-0",
    url: "www.dummy.com",
    description: "Fully"
}]
let idCount = Links.length;

const resolvers = {
    Query: {
        info: () => "my api",
        feed: () => Links,

    },
    Link: {
        id: parent => parent.id,
        description: parent => parent.description,
        url: parent => parent.url

    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            Links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const index = Links.findIndex(link => link.id == args.id)
            Links[index] = {
                ...Links[index],
                url: args.url,
                description: args.description
            }
            return Links[index]
        },
        deleteLink: (parent, id) => {
            Links = Links.filter(val => val.id = id)
            return id
        }
    }
}

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers
})

server.start(() => console.log("server is running on http://localhost:4000"))