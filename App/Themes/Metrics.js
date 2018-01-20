import { Dimensions, Platform, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

const basePx = 375
const isIphoneX = Platform.OS === 'ios' && height === 812 && width === 375
const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  onePixel: 1 / PixelRatio.get(),
  statusBarHeight: (Platform.OS === 'ios' ? 20 : 0),
  px2dp: px => (px * width) / basePx,
  platform: Platform.OS,
  isIOS: isIOS,
  isAndroid: isAndroid,
  isIphoneX: isIphoneX
}

export default metrics
