import axios from "axios";

export default {

    testapi: () => {
        console.log("In API.js > testing api call");
        return axios.get("/api/testquery");
    },

    getUsers: function() {
        console.log("in api.js");
        return axios.get("/api/allusers");
    },

    // getBook: function(id) {
    //     return axios.get("/api/books/" + id);
    // },

    // deleteBook: function(id) {
    //     return axios.delete("/api/books/" + id);
    // },

    // saveBook: function(bookData) {
    //     return axios.post("/api/books", bookData);
    // }

};
