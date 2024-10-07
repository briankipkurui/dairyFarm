import fetch from 'unfetch';

const checkStatus = (response: any) => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error: any = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllCows = () =>
    fetch("/api/v1/cattle")
        .then(checkStatus);

export const addNewCattle = (cows: any) =>
    fetch("/api/v1/cattle", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cows)
        }
    ).then(checkStatus)

export const updateCattle = (cattle: any) =>
    fetch(`/api/v1/cattle/${cattle.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cattle)
    }).then(checkStatus)


export const SearchCattle = (query: any) =>
    fetch(`/api/v1/cattle/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)


export const SearchCattleById = (id: any) =>
    fetch(`/api/v1/cattle/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)


export const addBreeds = (breed: any) =>
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


export const updateBreeds = (breed: any) =>
    fetch(`/api/v1/breeds/${breed.breedId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(breed)
    }).then(checkStatus)


export const deleteBreed = (breedId: any) =>
    fetch(`/api/v1/breeds/${breedId}`, {
        method: 'DELETE'
    }).then(checkStatus);


export const SearchBreed = (query: any) =>
    fetch(`/api/v1/breeds/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)


export const SearchBreedById = (id: any) =>
    fetch(`/api/v1/breeds/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const addLivestock = (livestock: any) =>
    fetch("/api/v1/livestock", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(livestock)
    }).then(checkStatus)

export const getLivestock = () =>
    fetch("/api/v1/livestock", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then(checkStatus);


export const deteleLiveStock = (liveStockId: any) =>
    fetch(`/api/v1/livestock/${liveStockId}`, {
        method: 'DELETE'
    }).then(checkStatus)


export const updateLivestock = (livestock: any) =>
    fetch(`/api/v1/livestock/${livestock.livestockId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(livestock)
    }).then(checkStatus)

export const SearchLivestock = (query: any) =>
    fetch(`/api/v1/livestock/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const SearchLiveStockById = (id: any) =>
    fetch(`/api/v1/livestock/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)


export const addBirths = (births: any) =>
    fetch("/api/v1/births", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(births)
    }).then(checkStatus)

export const getFamilyTreeById = (cattleId: any) =>
    fetch(`/api/v1/births/distinctCowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus);

export const getAllFamilyTreeById = (cattleId: any) =>
    fetch(`/api/v1/births/cowDescendants/${cattleId}`, {
        method: 'GET'
    }).then(checkStatus);


export const getAllProduction = () =>
    fetch("/api/v1/production", {
        method: 'GET'
    }).then(checkStatus);

export const addToProduction = (production: any) =>
    fetch("/api/v1/production", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(production)
    }).then(checkStatus)


export const getAllFeedsTypes = () =>
    fetch("/api/v1/feedsTypes", {
        method: 'GET'
    }).then(checkStatus);

export const addFeedsTypes = (feedTypes: any) =>
    fetch("/api/v1/feedsTypes", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(feedTypes)
    }).then(checkStatus)

export const SearchFeedsTypes = (query: any) =>
    fetch(`/api/v1/feedsTypes/search?query=${query}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(checkStatus)

export const addFeedingFormula = (feedingFormula: any) =>
    fetch(`/api/v1/feedingFormulas/${feedingFormula.livestockTypeId}/${feedingFormula.feedsTypesId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(feedingFormula)
        }
    ).then(checkStatus)

export const getAllFeedingFormulas = () =>
    fetch("/api/v1/feedingFormulas", {
        method: 'GET'
    }).then(checkStatus);

export const searchFeedingFormulas = (query: any) =>
    fetch(`/api/v1/feedingFormulas/search?query=${query}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    ).then(checkStatus)


export const addFeedingRecords = (feedingRecords: any) =>
    fetch(`/api/v1/feedingRecords/${feedingRecords.feedingFormulaId}/${feedingRecords.cattleId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(feedingRecords)
        }
    ).then(checkStatus)


export const getAllFeedingRecords = () =>
    fetch("/api/v1/feedingRecords", {
        method: 'GET'
    }).then(checkStatus);





















