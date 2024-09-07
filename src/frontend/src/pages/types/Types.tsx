

export interface Cattle {
    cattleId: number
    name: string
    sex: string
    serialNumber: string
    dateOfBirth: string
    breeds: Breeds
    livestock: Livestock
    dateDewormed: any
    dateServed: any
}


export interface Breeds {
    breedId: number
    name: string
}

export interface Livestock {
    livestockId: number
    name: string
}