import {Dispatch} from "redux";
import {learningProcessAPI} from "./learning-process-api";

export const initialLearningProcessState = {
    status: "idle",
    // grade: 1,
    // error: ""
};

export const learningProcessReducer = (state:initialLearningProcessStateType = initialLearningProcessState, action: LearningProcessReducerActionsType): initialLearningProcessStateType => {
    switch (action.type) {
        // case "learningProcessReducer/SET-GRADE":
        //     return {...state, grade: action.grade};
        default:
            return state
    }
};

//action
const setGradeAC = (grade: number) => ({type: "learningProcessReducer/SET-GRADE", grade} as const);

//thunk
export const setGradeTC = (data: DataLearningProcessType) => (dispatch: ThunkDispatch) => {
    learningProcessAPI.setGrade(data)
        .then(res => {
            // dispatch(setStatusAC('succeeded'));
        })
        .catch(error => {
            if (!error.response) {
                return "some error";
            }

            // dispatch(setNewPasswordErrorAC(error.response.data.error));
        })
        .finally(() => {
            // dispatch(setStatusAC('succeeded'));
        })
};


//type
type initialLearningProcessStateType = typeof initialLearningProcessState;
export type DataLearningProcessType = {
    grade: number | undefined
    card_id: string | undefined
}
export type ThunkDispatch = Dispatch<LearningProcessReducerActionsType>
export type setGradeACType = ReturnType<typeof setGradeAC>


export type ResponseLearningProcessType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}

export type LearningProcessReducerActionsType = setGradeACType
