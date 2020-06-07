const userRegistrationData = {
    ethnicityIDs: [],
    gender: '',
    ethnicityPrefIDs: [],
    genderToLookFor: '',
    firstName: '',
    description: '',
    dateOfBirth: '',
    height: 0,
    bodyTypeID: 0,
    physicalAppearanceIDs: [],
};

export default function UserRegistration(state = userRegistrationData, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_RACE_IDS':
            newState.ethnicityIDs = action.value;
            break;
        case 'SET_GENDER':
            newState.gender = action.value;
            break;
        case 'SET_ETHNICITY_PREF_IDS':
            console.log('here');
            newState.ethnicityPrefIDs = action.value;
            break;
        case 'SET_GENDER_TO_LOOK_FOR':
            newState.genderToLookFor = action.value;
            break;
        case 'SET_FIRST_NAME':
            newState.firstName = action.value;
            break;
        case 'SET_DESCRIPTION':
            newState.description = action.value;
            break;
        case 'SET_DATE_OF_BIRTH':
            newState.dateOfBirth = action.value;
            break;
        case 'SET_HEIGHT':
            newState.height = action.value;
            break;
        case 'SET_BODY_TYPE_ID':
            newState.bodyTypeID = action.value;
            break;
        case 'SET_PHYSICAL_APPEARANCE_IDS':
            newState.physicalAppearanceIDs = action.value;
            break;
        default:
            break;
    }
    return newState;
}