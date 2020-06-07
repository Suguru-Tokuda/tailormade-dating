const SET_RACE_IDS = 'SET_RACE_IDS';
const SET_GENDER = 'SET_GENDER';
const SET_ETHNICITY_PREF_IDS = 'SET_ETHNICITY_PREF_IDS';
const SET_GENDER_TO_LOOK_FOR = 'SET_GENDER_TO_LOOK_FOR';
const SET_FIRST_NAME = 'SET_FIRST_NAME';
const SET_DESCRIPTIONS = 'SET_DESCRIPTIONS';
const SET_DATE_OF_BIRTH = 'SET_DATE_OF_BIRTH';
const SET_HEIGHT = 'SET_HEIGHT';
const SET_BODY_TYPE_ID = 'SET_BODY_TYPE_ID';
const SET_PHYSICAL_APPEARANCE_IDS = 'SET_PHYSICAL_APPEARANCE_IDS';

export function setRaceIDs(raceIDs) {
    return { type: SET_RACE_IDS, value: raceIDs };
}

export function setGender(gender) {
    return { type: SET_GENDER, value: gender };
}

export function setEthnicityPrefIDs(raceIDs) {
    return { type: SET_ETHNICITY_PREF_IDS, value: raceIDs };
}

export function setGenderToLookFor(gender) {
    return { type: SET_GENDER_TO_LOOK_FOR, value: gender };
}

export function setFirstName(firstName) {
    return { type: SET_FIRST_NAME, value: firstName };
}

export function setDescriptions(descriptions) {
    return { type: SET_DESCRIPTIONS, value: descriptions };
}

export function setDateOfBirth(dateOfBirth) {
    return { type: SET_DATE_OF_BIRTH, value: dateOfBirth };
}

export function setHeight(height) {
    return { type: SET_HEIGHT, value: height };
}

export function setBodTypeID(bodyTypeID) {
    return { type: SET_BODY_TYPE_ID, value: bodyTypeID };
}

export function setPhysicalAppearanceIDs(physicalAppearanceIDs) {
    return { type: SET_PHYSICAL_APPEARANCE_IDS, value: physicalAppearanceIDs };
}