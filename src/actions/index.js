import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        console.log("About to fetch posts...");
        await dispatch(fetchPosts()); // await makes sure that we have fetched all posts before proceeding 
        console.log("Fetched posts!");
        const userIds = _.uniq(_.map(getState().posts, "userId"));
        userIds.forEach(id => dispatch(fetchPosts(id)));
    };
};

export const fetchPosts = () => {

    return async (dispatch) => {
        const response = await jsonPlaceholder.get("/posts");

        dispatch({type: "FETCH_POSTS", payload: response.data});
    };
};

export const fetchUser = (id) => {

    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({type: "FETCH_USER", payload: response.data});
    };
};

// Memoization
// export const fetchUser = (id) => {

//     return (dispatch) => {
//         _fetchUser(id, dispatch);
//     };
// };

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: "FETCH_USER", payload: response.data});
// });


