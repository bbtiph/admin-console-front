const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  isFetching: false
}

const usersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          return user.id === action.userId ? { ...user, followed: true } : user;
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          return user.id === action.userId ? { ...user, followed: false } : user;
        })
      }

    case SET_USERS:
      return {
        ...state,
        users: [...action.usersPage.users],
        currentPage: action.usersPage.currentPage
      }

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
    default:
      return state;
  }
}

export const follow = (userId) => ({ type: FOLLOW, userId: userId })
export const unFollow = (userId) => ({ type: UNFOLLOW, userId: userId })
export const setUsers = (users) => ({ type: SET_USERS, usersPage: users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount: totalCount })
export const toggleIsFetching = (isFetchingValue) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetchingValue })

export default usersPageReducer;
