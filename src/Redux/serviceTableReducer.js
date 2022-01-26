const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_SERVICES = "SET_SERVICES";

let initialState = {
  serviceList: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false
}

const servicePageReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.currentPage
      }

    case SET_TOTAL_COUNT:
      return {
        ...state, totalCount: action.totalCount
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      }

    case SET_SERVICES:
      return {
        ...state,
        serviceList: [...action.servicePage.servicePage],
        currentPage: action.servicePage.currentPage
      }
    default:
      return state;
  }
}

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount: totalCount })
export const toggleIsFetching = (isFetchingValue) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetchingValue })
export const setServices = (servicePage) => ({ type: SET_SERVICES, servicePage })

export default servicePageReducer;
