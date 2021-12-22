import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../assets/fonts/selection.json';
import { Dimensions } from 'react-native'

export const Icon = createIconSetFromIcoMoon(icoMoonConfig);

export const w = Dimensions.get('window').width
export const h = Dimensions.get('window').height
export const width = (h / w) > 1.6 ? w : 500
export const height = (h / w) > 1.6 ? h : 900
export const isTablet = (h / w) > 1.6

export const monthFullNames = ['january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december']

export const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']


export const fontFamily = 'EuclidCircularA-Light'
export const fontFamilyBold = 'EuclidCircularA-SemiBold'


export const AMPM = (time) => {
    var shours = new Date(time).getHours()
    var sminutes = new Date(time).getMinutes()
    var sampm = shours >= 12 ? 'PM' : 'AM'
    shours = shours % 12
    shours = shours ? shours : 12  // the hour '0' should be '12'
    return `${shours + ':' + `${("0" + sminutes).slice(-2)}` + ' ' + sampm}`
}

