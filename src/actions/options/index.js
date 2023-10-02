import {GET_GRADES_SUCCESS,GET_EDUCATION_SUCCESS,GET_COIN_TYPES_SUCCESS} from '@constants';
import {setNotification} from '@actions/notifications';
import {Api} from '@services';

export const getGrades = () => (dispatch, getState) => {
	return Api.get('/grades').then((response) => {
		dispatch({type:GET_GRADES_SUCCESS,data:response.data.grades})
	})
}

export const getEducation = () => (dispatch, getState) => {
	return Api.get('/educations').then((response) => {
		dispatch({type:GET_EDUCATION_SUCCESS,data:response.data.educations})
	})
}

export const getCoinTypes = () => (dispatch, getState) => {
	return Api.get('/cointype').then((response) => {
		dispatch({type:GET_COIN_TYPES_SUCCESS,data:response.data})
	})
}
