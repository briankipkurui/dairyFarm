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
