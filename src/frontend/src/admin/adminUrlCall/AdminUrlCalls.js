import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllCows = () =>
    fetch("/api/v1/cattle")
        .then(checkStatus);

export const addNewCattle = cows =>
    fetch("/api/v1/cattle", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cows)
        }
    ).then(checkStatus)


export const getAllProduction = () =>
    fetch("/api/v1/production", {
        method: 'GET'
    }).then(checkStatus);

export const addToProduction = production =>
    fetch("/api/v1/production", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(production)
    }).then(checkStatus)

export const SearchCattle = query =>
    fetch(`/api/v1/cattle/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const addBirths = births =>
    fetch("/api/v1/births", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(births)
    }).then(checkStatus)

export const getFamilyTreeById = cattleId =>
    fetch(`/api/v1/births/distinctCowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus);

export const getAllFamilyTreeById = cattleId =>
    fetch(`/api/v1/births/cowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus);

export const addBreeds = breed =>
    fetch("/api/v1/breeds", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(breed)
    }).then(checkStatus)

export const getBreeds = () =>
    fetch("/api/v1/breeds", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then(checkStatus);
export const updateBreeds = breed =>
    fetch("/api/v1/breeds", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(breed)
    }).then(checkStatus)

export const deleteBreed = breedId =>
    fetch(`api/v1/breeds/${breedId}`, {
        method: 'DELETE'
    }).then(checkStatus);

export const SearchBreed = query =>
    fetch(`/api/v1/breeds/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)
