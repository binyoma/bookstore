export const BookSchema={
    name:"BookSchema",
    properties:{
        Id:"objectId",
        Author:"string",
        Category:"string",
        Title:"string"
    },
    primaryKey:"Id"
}