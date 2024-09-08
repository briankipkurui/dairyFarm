

export type Cattle ={
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


export type Breeds ={
    breedId: number
    name: string
}

export type Livestock ={
    livestockId: number
    name: string
}