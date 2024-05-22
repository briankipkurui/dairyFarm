import fetch from "unfetch";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}
export const getAllCowsUsers = () =>
    fetch("/api/v1/cattle/users")
        .then(checkStatus);
export const addToProductionUser = production =>
    fetch("/api/v1/production/users", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(production)
    }).then(checkStatus)

export const SearchCattleUsers = query =>
    fetch(`/api/v1/cattle/users/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const getAllFamilyTreeByIdUsers = cattleId =>
    fetch(`/api/v1/births/users/cowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus)

export const SearchCattleByIdsUsers = id =>
    fetch(`/api/v1/cattle/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const getFamilyTreeByIdUsers = cattleId =>
    fetch(`/api/v1/births/users/distinctCowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus);

export const getBreedsUsers = () =>
    fetch("/api/v1/breeds/users", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then(checkStatus);

export const getLivestockUser = () =>
    fetch("/api/v1/livestock/users", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then(checkStatus);

export const addNewCattleUser = cows =>
    fetch("/api/v1/cattle/users", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cows)
        }
    ).then(checkStatus)
export const SearchBreedUsers = query =>
    fetch(`/api/v1/breeds/users/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const SearchLivestockUsers = query =>
    fetch(`/api/v1/livestock/users/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)