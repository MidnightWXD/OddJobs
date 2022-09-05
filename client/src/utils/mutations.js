import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($input: createUserInput!) {
        createUser(input: $input) {
            token
            user {
                _id
                email
                name
                postCode
            }
        }
    }
`;


export const CREATE_POSTING = gql`
    mutation createPosting($input: createPostingInput!) {
        createPosting(input: $input) {
            _id
            owner {
                _id
            }
            cost
            title
            description
            image
            createdAt
            workerNumber
        }
    }
`;

export const CREATE_RATING = gql`
    mutation createRating($input: RatingInput!) {
        createRating(input: $input) {
            _id
            stars
            comment
            createdAt
            byUser {
                _id
            }
            forUser {
                _id
            }
        }
    }
`;

export const REMOVE_POSTING = gql`
    mutation RemovePosting($id: ID!) {
        removePosting(id: $id) {
            _id
            cost
            title
            description
        }
    }
`;

export const UPDATE_POSTING = gql`
    mutation UpdatePosting($id: ID!, $input: PostingInput!) {
        updatePosting(id: $id, input: $input) {
            _id
            owner {
                _id
            }
            cost
            title
            description
            image
            status
            season
            
        }
    }
`;

export const APPLY_FOR_JOB = gql`
    mutation applyForJob($id: ID!) {
        applyForJob(id: $id) {
            _id
            applications {
            _id
            }
            cost
            title
            description
        }
    }
`;

export const REMOVE_APPLICATION = gql`
    mutation removeApplication($id: ID!) {
        removeApplication(id: $id) {
            _id
            applications {
            _id
            }
            cost
            title
            description
        }
    }
`; 
